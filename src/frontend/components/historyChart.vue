<template>
  <div>
    <!--<div v-if="tooltip.active" class="visTooltip">
      <p>
        Datum: {{tooltip.content.dateString}}<br>
        Durchgeführte Tests: {{tooltip.content.usedCapacity}}<br>
        Gesamtkapazität: {{tooltip.content.totalCapacity}}
      </p>
    </div>-->
    <div class="box">
      <strong>Eigene Kapazität und Auslastung</strong>
      <hr>
      <span v-if="error">{{error}}</span>
      <div ref="svgContainer" class="svgContainer">
        <svg v-if="style" :width="style.width" :height="style.height">
          <g v-if="path">
            <path :d="path.totalCapacity" fill="#177867" opacity="1" stroke="none" />
            <path :d="path.usedCapacity" stroke="white" stroke-dasharray="4 2" fill="none" />
          </g>
          <g v-if="circles">
            <circle v-for="(circle, i) in circles" :key="i" r="5" fill="white" stroke="#177867" @mouseover="toggleToolTip(true, $event, circle)" :cx="circle.x" :cy="circle.y" />
          </g>
          <g class="axes">
            <g class="xAxis"></g>
            <g class="yAxis"></g>
          </g>
          <g class="legend">
            <rect width="10" height="10" :x="0" fill="#177867" y="0"/>
            <text font-size="7pt" x="15" y="8">Gesamtkapazität</text>

            <circle r="5" fill="white" stroke="#177867" cx="5" cy="25" />
            <text font-size="7pt" x="15" y="28">durchgeführte Tests</text>

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
      height: this.$refs.svgContainer.clientHeight,
      margin: {top: 20, right: 0, bottom: 80, left: 10}
    }

    //set scales and axes
    let y = d3.scaleLinear().range([this.style.height-this.style.margin.top-this.style.margin.bottom,this.style.margin.top])
    let x = d3.scaleUtc()
    .range([this.style.margin.left,this.style.width-this.style.margin.left-this.style.margin.right])
    .domain([this.priorDate,this.today])

    let xAxis = d3.select(".axes .xAxis")
      .attr("transform","translate(0,"+(this.style.height-this.style.margin.bottom-this.style.margin.top)+")")
      .call(
        d3.axisBottom().scale(x).ticks(d3.timeDay.every(1)).tickFormat(d3.timeFormat("%d-%b"))
      )

      xAxis.selectAll("text")
      .attr("y", 0)
      .attr("x", -7)
      .attr("dy", ".35em")
      .attr("transform", "rotate(-70)")
      .style("text-anchor", "end");

      d3.select(".legend").attr("transform","translate("+this.style.margin.left+","+(this.style.height-40)+")")


    this.scale = {x:x, y:y}

    //get data and fill vis
    this.getHistory();
  },


  data: function() {
    return {
      displayLastDays: 7, //How many days back do we want to display data?
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
      let formatTime = d3.timeFormat("%d.%m.%Y");
      let circles = this.recentHistory.map(day => {
        day.x = this.scale.x(day.date)
        day.y = this.scale.y(day.usedCapacity)
        day.dateString = formatTime(day.date)
        return day
      })
      console.log(circles )
      return circles
    },

    path() { //compute svg paths for area and line
      if(!this.recentHistory) return null
      let line = d3.line()
        //.curve(d3.curveBasis)
        .x(d => this.scale.x(d.date))
        .y(d => this.scale.y(d.value))

      let area = d3.area()
        .curve(d3.curveBasis)
        .x(d => this.scale.x(d.date))
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

    toggleToolTip(show, event, circle) {
      if(show) {
        this.tooltip.active = true
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

.visTooltip {
  position: absolute;
}

.svgContainer {
  height: 400px;
}
</style>
