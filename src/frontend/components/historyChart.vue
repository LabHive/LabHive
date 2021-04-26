<template>
  <div>
    <div class="box">
      <h4>{{$t("testcapacity.historyChart.title")}}</h4>
      <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary" @click="getHistory('pcr')">{{$t("testcapacity.historyChart.pcr")}}</button>
        <button type="button" class="btn btn-secondary" @click="getHistory('antibody')">{{$t("testcapacity.historyChart.antibody")}}</button>
      </div>
      <hr>
      <span v-if="error">{{error}}</span>
      <div ref="svgContainer" class="svgContainer">
        <svg v-if="style" :width="style.width" :height="style.height+50">
          <g v-if="path">
            <path :d="path.totalCapacity" fill="#177867" opacity=".4" stroke="none" />
            <path :d="path.usedCapacity" fill="#177867" stroke="none"/>
          </g>
          <g v-if="lines">
            <line v-for="(line, i) in lines" :key="i" fill="none" opacity="0.1" stroke="black" @mouseover="toggleToolTip(line)" @mouseout="toggleToolTip(false)" stroke-width="3" :x1="line.x" :x2="line.x" :y1="line.y" :y2="style.height-style.margin.top-style.margin.bottom" />
          </g>
          <g v-if="tooltip.active">
            <text :x="tooltip.x + tooltip.position.margin" :text-anchor="tooltip.position.anchor"  fill="#282e40" :y="tooltip.total.y-2">{{$t("testcapacity.historyChart.capacity")}}: {{Math.floor(tooltip.content.totalCapacity)}}</text>
            <text :x="tooltip.x + tooltip.position.margin" :text-anchor="tooltip.position.anchor"  fill="#282e40" :y="tooltip.used.y+2">{{$t("testcapacity.historyChart.usedCapacity")}}: {{Math.floor(tooltip.content.usedCapacity)}}</text>
            <line :y2="tooltip.total.y" :y1="style.height-style.margin.top-style.margin.bottom" :x1="tooltip.x" :x2="tooltip.x" stroke="black" stroke-dasharray="2 4"  />
          </g>
          <g class="axes">
            <g v-axis:x="scale" :transform="`translate(0,${style.height-style.margin.top-style.margin.bottom})`"></g>
            <g v-axis:y="scale" :transform="`translate(${style.margin.left},0)`"></g>
          </g>
          <g class="legend" :transform="`translate(${style.margin.left},0)`">
            <rect width="10" height="10" :x="0" fill="#177867" opacity=".4" y="10"/>
            <text font-size="10pt" fill="#282e40" x="16" y="19">{{$t("testcapacity.historyChart.totalCapacity")}}</text>

            <rect width="10" height="10" :x="0" fill="#177867" y="29"/>
            <text font-size="10pt"  fill="#282e40" x="16" y="38">{{$t("testcapacity.historyChart.testAmount")}}</text>
          </g>
        </svg>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked @click="displayLastDays = 6">
        <label class="form-check-label" for="exampleRadios1">
          {{$t("testcapacity.historyChart.lastWeek")}}
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"  @click="displayLastDays = history.length-1" :disabled="(history.length < 7  ) ? true : false">
        <label class="form-check-label" for="exampleRadios2">
          {{$t("testcapacity.historyChart.timespan")}}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'


export default {
  mounted() {
    //get data and fill vis
    this.getHistory("pcr");
    this.mounted = true
  },


  data: function() {
    return {
      displayLastDays: 7, //How many days back do we want to display data?
      today: new Date(),
      error: null,
      mounted: false,
      history: [], //all data storage not filtered by date
      tooltip: {
        active: false,
        content: {}
      } //
    }
  },


  computed: {
    style() {//some measurements depending on the viewPort, defined on mount
      if(!this.mounted) return null;
      return {
        width: this.$refs.svgContainer.clientWidth,
        height: this.$refs.svgContainer.clientHeight,
        margin: {top: 50, right: 0, bottom: 10, left: 40}
      }
    },

    priorDate() { //first day of relevant timespan
      return d3.timeDay.offset(this.today, -this.displayLastDays)
    },

    recentHistory() { //filter by this.config.displayLastDays
      if(this.history.length < 1) return null
      let recent = this.history.filter(day => day.date >= this.priorDate)
      return recent
    },

    scale() {//scales depending on VieePort, defined on mount
      let y = d3.scaleLinear().range([this.style.height-this.style.margin.top-this.style.margin.bottom,this.style.margin.top])
        let x = d3.scaleUtc()
        .range([this.style.margin.left,this.style.width-this.style.margin.left-this.style.margin.right])
        .domain([this.priorDate.setHours(0,0,0,0),this.today.setHours(0,0,0,0)])
      return {x:x, y:y}
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

    lines() { //filter by this.config.displayLastDays
      if(!this.recentHistory) return null
      let circles = this.recentHistory.map(day => {
        day.x = this.scale.x(day.date.setHours(0,0,0,0))
        day.y = this.scale.y(day.totalCapacity)
        return day
      })
      return circles
    },

    path() { //compute svg paths for area and line
      if(!this.recentHistory) return null
      /*let line = d3.line()
        .x(d => this.scale.x(d.date.setHours(0,0,0,0)))
        .y(d => this.scale.y(d.value))*/

      let area = d3.area()
        .x(d => this.scale.x(d.date.setHours(0,0,0,0)))
        .y0(() => this.scale.y(0))
        .y1(d => this.scale.y(d.value))

      return {
        usedCapacity: area(this.recentHistory.map(d=>{return{date: d.date, value: d.usedCapacity}})),
        totalCapacity: area(this.recentHistory.map(d=>{return{date: d.date, value: d.totalCapacity}})),
      }
    },
  },

  directives: {
    axis(el, binding) {
      const axis = binding.arg;
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value[axis]

      if(binding.arg == "y") { //yeah.. thats just lazy.
        d3.select(el).call(d3[axisMethod](methodArg))//.ticks(d3.timeDay.every(1)).tickFormat(d3.timeFormat("%d-%b"));
      } else {
        d3.select(el).call(d3[axisMethod](methodArg)
          .ticks(7)
          .tickFormat(d3.timeFormat("%d-%b"))
        )
      }
    }
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
    getHistory(testType) {
      return new Promise((res, rej) => {
        testType = "" //TODO: assuming two API endpoints ("testCapacity/pcr" and "testCapacity/antibody"), delete this line

        this.$http.get("testCapacity"+testType).then(
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

path {
      transition: all 1s;
    }

.svgContainer {
  height: 300px;
}
</style>
