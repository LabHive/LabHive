<template>
  <div>
    <div class="box">
      <h4>Eigene Kapazität und Auslastung</h4>
      <hr>
      <span v-if="error">{{error}}</span>
      <div ref="svgContainer" class="svgContainer">
        <svg v-if="style" :width="style.width" :height="style.height+50">
          <g v-if="path">
            <path :d="path.totalCapacity" fill="#177867" opacity=".4" stroke="none" />
            <path :d="path.usedCapacity" stroke="white" fill="none" />
          </g>
          <g v-if="circles">
            <circle v-for="(circle, i) in circles" :key="i" r="5" fill="white" stroke="#177867" @mouseover="toggleToolTip(circle)" @mouseout="toggleToolTip(false)" :cx="circle.x" :cy="circle.y" />
          </g>
          <g v-if="tooltip.active">
            <text :x="tooltip.x + tooltip.position.margin" :text-anchor="tooltip.position.anchor"  fill="#282e40" :y="tooltip.total.y-2">Kapazität: {{tooltip.content.totalCapacity}}</text>
            <text :x="tooltip.x + tooltip.position.margin" :text-anchor="tooltip.position.anchor"  fill="#282e40" :y="tooltip.used.y+2">Durchgeführt: {{tooltip.content.usedCapacity}}</text>
            <line :y2="tooltip.total.y" :y1="style.height-style.margin.top-style.margin.bottom" :x1="tooltip.x" :x2="tooltip.x" stroke="black" stroke-dasharray="2 4"  />
          </g>
          <g class="axes">
            <g class="xAxis"></g>
            <g class="yAxis"></g>
          </g>
          <g class="legend">
            <rect width="10" height="10" :x="0" fill="#177867" y="10"/>
            <text font-size="10pt" fill="#282e40" x="16" y="19">Gesamtkapazität</text>

            <circle r="5" fill="white" stroke="#177867" cx="5" cy="40" />
            <text font-size="10pt"  fill="#282e40" x="16" y="43">Durchgeführte Tests</text>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'


export default {
  mounted() {
    //set measures and scales that can be initialized without actual data
    this.style = {
      width: this.$refs.svgContainer.clientWidth,
      height: this.$refs.svgContainer.clientHeight - 20,
      margin: {top: 20, right: 0, bottom: 80, left: 10}
    }

    //set scales and axes
    let y = d3.scaleLinear().range([this.style.height-this.style.margin.top-this.style.margin.bottom,this.style.margin.top])
    let x = d3.scaleUtc()
    .range([this.style.margin.left,this.style.width-this.style.margin.left-this.style.margin.right])
    .domain([this.priorDate.setHours(0,0,0,0),this.today.setHours(0,0,0,0)])

    let xAxis = d3.select(".axes .xAxis")
      .attr("transform","translate(0,"+(this.style.height-this.style.margin.bottom-this.style.margin.top)+")")
      .call(
        d3.axisBottom().scale(x).ticks(d3.timeDay.every(1)).tickFormat(d3.timeFormat("%d-%b"))
      )

      xAxis.selectAll("text")
      .attr("y", 0)
      .attr("x", -7)
      .attr("dy", "13px")
      .attr("transform", "rotate(-70)")
      .style("text-anchor", "end")
      .style("font-size", "12px");

      d3.select(".legend").attr("transform","translate("+this.style.margin.left+","+(this.style.height - 40)+")")


    this.scale = {x:x, y:y}

    //get data and fill vis
    this.getHistory();
  },


  data: function() {
    return {
      displayLastDays: 8, //How many days back do we want to display data?
      today: new Date(),
      error: null,
      history: [], //all data storage not filtered by date
      style: {}, //some measurements depending on the viewPort, defined on mount
      scale: {}, //scales depending on VieePort, defined on mount
      tooltip: {
        active: false,
        content: {}
      } //
    }
  },


  computed: {
    priorDate() { //first day of relevant timespan
      return d3.timeDay.offset(this.today, -this.displayLastDays)
    },

    recentHistory() { //filter by this.config.displayLastDays
      if(this.history.length < 1) return null
      let recent = this.history.filter(day => day.date > this.priorDate)
      return recent
    },

    circles() { //filter by this.config.displayLastDays
      if(!this.recentHistory) return null
      let circles = this.recentHistory.map(day => {
        day.x = this.scale.x(day.date.setHours(0,0,0,0))
        day.y = this.scale.y(day.usedCapacity)
        return day
      })
      return circles
    },

    path() { //compute svg paths for area and line
      if(!this.recentHistory) return null
      let line = d3.line()
        .x(d => this.scale.x(d.date.setHours(0,0,0,0)))
        .y(d => this.scale.y(d.value))

      let area = d3.area()
        //.curve(d3.curveBasis)
        .x(d => this.scale.x(d.date.setHours(0,0,0,0)))
        .y0(() => this.scale.y(0))
        .y1(d => this.scale.y(d.value))

      return {
        usedCapacity: line(this.recentHistory.map(d=>{return{date: d.date, value: d.usedCapacity}})),
        totalCapacity: area(this.recentHistory.map(d=>{return{date: d.date, value: d.totalCapacity}})),
      }
    },
  },

  watch: {
    //after receiving and filtering dates, get new domains
    recentHistory: function() {
      this.scale.y.domain([
        0,
        d3.max(this.recentHistory.map(day => [day.totalCapacity, day.usedCapacity]).flat()),
      ])
    }
  },

  methods: {
    //get capacity history from API. Parse and store in data->history and trigger visualization
    getHistory() {
      return new Promise((res, rej) => {
        this.$http.get("testCapacity").then(
          success => {
            this.history = this.parse(success.body.data)
          },
          error => {
            rej(error);
            this.error = "no data"
            console.log(error);
          }
        );
      });
    },

    //create Date() for each day
    parse(data) {
      let parseDate = d3.isoParse
      data.forEach(day => day.date = parseDate(day.createdAt))
      return data
    },

    toggleToolTip(circle) {
      if(circle) {
        this.tooltip.active = true

        this.tooltip.x = this.scale.x(circle.date.setHours(0,0,0,0))
        this.tooltip.total = {y: this.scale.y(circle.totalCapacity)}
        this.tooltip.used = {y: this.scale.y(circle.usedCapacity)}
        this.tooltip.position = ((this.style.width - this.tooltip.x) < 150) ? {anchor: "end", margin: -5} : {anchor: "start", margin: 5}


        this.tooltip.content = circle
      } else {
        this.tooltip.active = false
      }
    }
  }
};
</script>

<style scoped>
.box {
  background-color: rgba(255,255,255,1);
  border-radius: 5px;
  padding: 20px;
}

.svgContainer {
  height: 300px;
}
</style>
