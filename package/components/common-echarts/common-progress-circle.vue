<template>
  <div :id="chart_id" class="dashboard"></div>
</template>

<script>
import helper from "@/services/helper.js";
import uuidv1 from "uuid/v1";

var echarts = require("echarts");

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    color: {
      type: Array,
      default: () => [
        "rgba(43, 196, 255, 1)",
        "rgba(2, 255, 222, 1)",
        "rgba(255, 132, 0, 1)",
        "rgba(181, 51, 255, 1)"
      ]
    },
    shadowColor: {
      type: Array,
      default: () => [
        "rgba(43, 196, 255, 0.5)",
        "rgba(2, 255, 222, 0.5)",
        "rgba(255, 132, 0, 0.5)",
        "rgba(181, 51, 255, 0.5)"
      ]
    },
    centerText: {
      type: String,
      default: ""
    },
    centerTextSize: {
      type: Number,
      default: 44
    }
  },
  watch: {
    data: {
      handler() {
        this.initChart();
      },
      deep: true
    }
  },
  data() {
    return {
      chart_id: uuidv1()
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      let chart_options = this.initOption();

      window[this.chart_id] = echarts.init(
        document.getElementById(this.chart_id)
      );
      window[this.chart_id].setOption(chart_options, true);
      window[this.chart_id].on("click", params => {
        console.log(params);
        this.$emit("clickItem", params.data);
      });
    },
    initOption() {
      let width = this.$el.getBoundingClientRect().width;
      let series = [];
      let seriesData = [];

      this.data.forEach((item, index) => {
        let data = [
          {
            name: item.name,
            value: item.value,
            itemStyle: {
              normal: {
                color: this.color[index],
                borderWidth: this.bar_width,
                borderColor: this.color[index % this.color.length],
                shadowColor: this.shadowColor[index % this.shadowColor.length],
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 4
              }
            }
          },
          {
            name: "",
            value: 100 - item.value,
            itemStyle: {
              normal: {
                color: "#1d274f"
              }
            }
          }
        ];

        seriesData.push({
          name: "访问来源",
          type: "pie",
          radius: [66 - 10 * index + "%", 70 - 10 * index + "%"],
          center: ["50%", "50%"],
          hoverAnimation: false,
          avoidLabelOverlap: true,
          label: {
            show: false,
            position: "center"
          },
          labelLine: {
            show: false
          },
          data: data
        });
      });

      let option = {
        title: {
          x: "center",
          y: "center",
          text: this.centerText,
          textStyle: {
            color: "#b2daff",
            fontFamily: "Digital-7Mono",
            fontSize: this.centerTextSize,
            fontWeight: "normal",
            textShadowColor: "#2bc4ff", // 默认透明
            textShadowBlur: 10
          },
          subtext: "",
          subtextStyle: {
            color: "#b2daff",
            fontSize: 16
          },
          itemGap: 10 // 主副标题距离
        },
        grid: {
          left: 10,
          top: 10,
          right: 10,
          bottom: 10,
          containLabel: true
        },
        legend: {
          orient: "vertical",
          y: "center",
          x: "right",
          data: this.data.map(item => item.name),
          textStyle: {
            color: "#b2daff",
            fontSize: "12px"
          },
          itemWidth: 8,
          itemHeight: 8,
          selectedMode: false,
          itemGap: 0
        },
        series: seriesData
      };

      return option;
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
