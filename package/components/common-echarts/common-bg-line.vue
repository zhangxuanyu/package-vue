<template>
  <div :id="chart_id" class="dashboard"></div>
</template>

<script>
import uuidv1 from "uuid/v1";
var echarts = require("echarts");
export default {
  props: {
    xAxis: {
      type: Array,
      default: () => []
    },
    series: {
      type: Array,
      default: () => []
    },
    color: {
      type: Array,
      default: () => [
        "rgba(248, 0, 96, 1)",
        "rgba(255, 132, 0, 1)",
        "rgba(216, 215, 0, 1)",
        "rgba(43, 196, 255, 1)",
        "rgba(133, 57, 203, 1)"
      ]
    },
    showArea: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart_id: uuidv1()
    };
  },
  watch: {
    series: {
      handler() {
        this.init_charts();
      },
      deep: true
    }
  },
  mounted() {
    this.init_charts();
  },
  methods: {
    init_charts() {
      var option = {
        color: this.color,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            crossStyle: {
              color: "#999"
            }
          },
          formatter: params => {
            let htmlStr = "";

            if (this.series.length === 1) {
              for (var i = 0; i < params.length; i++) {
                htmlStr += `<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params[i].color};'></span>`;
                htmlStr += params[i].name + " : ";
                htmlStr += params[i].value + "</br>";
              }
            } else {
              for (var i = 0; i < params.length; i++) {
                if (i === 0) {
                  htmlStr += params[i].name + "</br>";
                }

                htmlStr += `<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params[i].color};'></span>`;
                htmlStr += params[i].seriesName + " : ";
                htmlStr += params[i].value + "</br>";
              }
            }
            return htmlStr;
          }
        },
        grid: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 30,
          containLabel: true
        },
        legend: {
          textStyle: {
            color: "#b2daff",
            fontSize: "12px"
          },
          icon: "rect",
          itemWidth: 8,
          itemHeight: 2,
          bottom: 0,
          itemGap: 20,
          data: this.series.map(item => item.name)
        },
        xAxis: {
          type: "category",
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#0d8cd6"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisPointer: {
            type: "shadow"
          },
          data: this.xAxis
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#0d8cd6"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: ["#0b366b"],
              width: 1
            }
          }
        },
        series: this.series.map((item, index) => {
          return {
            type: "line",
            smooth: true,
            symbol: "none",
            lineStyle: {
              width: 2,
              type: "solid",
              shadowColor: this.color[index],
              shadowBlur: 10,
              shadowOffsetY: 5
            },
            areaStyle: {
              color: this.color[index],
              opacity: this.showArea ? 0.2 : 0
            },
            ...item
          };
        })
      };

      window[this.chart_id] = echarts.init(
        document.getElementById(this.chart_id)
      );
      window[this.chart_id].setOption(option, true);
      window[this.chart_id].on("click", params => {
        this.$emit("click-item", params);
      });
    }
  }
};
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
}
</style>
