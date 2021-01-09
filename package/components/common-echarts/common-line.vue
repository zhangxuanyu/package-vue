<template>
  <div :id="bar" class="dashboard"></div>
</template>

<script>
import uuidv1 from "uuid/v1";
var echarts = require("echarts");
export default {
  props: {
    datas: {
      type: Object,
      default: () => {},
    },
    color: {
      type: Array,
      default: null,
    },
    fontSize: {
      type: Number,
      default: 12,
    },
    y_lang:{
      type: Boolean,
      default: false,
    }
  },
  components: {},
  data() {
    return {
      bar: uuidv1(),
    };
  },
  watch: {
    datas: {
      handler() {
        this.init_line_charts();
      },
      deep: true,
    },
  },
  computed: {},
  created() {},
  mounted() {
    this.init_line_charts();
  },
  methods: {
    init_line_charts() {
      // console.log(this.color);
      var serise_temp = [];
      var lengend = [];
      var color = this.color
        ? this.color
        : ["#42237b", "#f80060", "#ff8400", "#d8d700", "#2bc4ff"];
      this.datas.yarr.forEach((e, idx) => {
        serise_temp.push({
          data: e.value,
          type: "line",
          smooth: true,
          name: e.name,
          symbol: "none",
          lineStyle: {
            shadowColor: color[idx],
            shadowBlur: 10,
            shadowOffsetY: 5,
          },
        });
        lengend.push(e.name);
      });
      var option = {
        color: color,
        legend: {
          data: lengend,
          show: true,
          x: "center",
          bottom: "5%",
          icon: "rect",
          itemWidth: 1.2 * this.fontSize,
          itemHeight: 0.3 * this.fontSize,
          textStyle: {
            color: "#b2daff",
            fontSize: this.fontSize,
          },
          height: 20,
          type: "scroll",
        },
        xAxis: {
          type: "category",
          data: this.datas.xarr,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#0b366b",
            },
          },
          axisLabel: {
            formatter: "{value}",
            color: "#0d8cd6",
            fontSize: this.fontSize,
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            formatter: "{value}",
            color: "#0d8cd6",
            fontSize: this.fontSize,
            formatter: this.y_lang?function(value) {
              var texts = []
              if (value === 0 || value === '0') {
                texts.push('0')
              } else if (value === 1 || value === '1') {
                texts.push('低风险')
              } else if (value === 2 || value === '2') {
                texts.push('一般风险')
              } else if (value === 3 || value === '3') {
                texts.push('较大风险')
              } else if (value === 4 || value === '4') {
                texts.push('重大风险')
              } 
              return texts
            }:function(value) {
              return value
            }
          },
          splitLine: {
            lineStyle: {
              color: "#0b366b",
            },
          },
        },
        grid: {
          bottom: "18%",
          top: "5%",
          right: "3%",
          left: "3%",
          containLabel: true,
        },
        series: serise_temp,
      };
      window[this.bar] = echarts.init(document.getElementById(this.bar));
      window[this.bar].setOption(option, true);
    },
  },
};
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
}
</style>
