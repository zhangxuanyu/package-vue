<template>
  <div :id="bar" class="dashboard"></div>
</template>

<script>
import uuidv1 from "uuid/v1";
var echarts = require("echarts");
export default {
  props: {
    datas: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    show_right: {
      type: Boolean,
      default: true,
    },
    color_list: {
      type: Array,
      default: () => {
        return ["#1142fb", "#00feaa"];
      },
    },
    unit: {
      type: String,
      default: "",
    },
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
        this.init_bar_charts();
      },
    },
  },
  computed: {},
  created() {},
  mounted() {
    this.init_bar_charts();
  },
  methods: {
    init_bar_charts() {
      var total = this.total; // 数据总数
      var datas = [];
      let total_list = [];
      this.datas.forEach((value) => {
        datas.push(value.value);
        total_list.push(total);
      });
      var option = {
        xAxis: {
          max: total,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 100,
          top: 10, // 设置条形图的边距
          right: this.show_right ? 100 : 10,
          bottom: 10,
          containLabel: true,
        },
        yAxis: [
          {
            type: "category",
            inverse: false,
            data: this.datas,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
        ],
        series: [
          {
            // 内
            type: "bar",
            barWidth: 17,
            silent: true,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: this.color_list[0], // 0% 处的颜色
                  },
                  {
                    offset: 0.8,
                    color: this.color_list[1], // 100% 处的颜色
                  },
                ],
              },
            },
            label: {
              normal: {
                formatter: (params) => {
                  var text;
                  if (params.name.length > 5) {
                    text = "{b| " + params.name.substring(0, 4) + "...}";
                  } else {
                    text = "{b| " + params.name + "}";
                  }
                  return text;
                },
                textStyle: {
                  color: "#b2daff",
                  fontSize: 16,
                  padding: [0, 0, -2, 0],
                },
                rich: {
                  b: {
                    color: "#b2daff",
                    fontSize: 16,
                    textShadowBlur: 10,
                    padding: [0, 0, -4, 0],
                  },
                },
                position: "left",
                distance: 20, // 向右偏移位置
                show: true,
              },
            },
            data: this.datas,
            z: 1,
            animationEasing: "elasticOut",
          },

          {
            // 分隔
            type: "pictorialBar",
            itemStyle: {
              normal: {
                color: "#07314a",
              },
            },
            symbolRepeat: "fixed",
            symbolMargin: 2,
            symbol: "rect",
            symbolClip: true,
            symbolSize: [3, 28],
            symbolPosition: "start",
            symbolOffset: [3, -4],
            symbolBoundingData: this.total,
            data: total_list,
            z: 2,
            animationEasing: "elasticOut",
          },
          {
            // label
            type: "pictorialBar",
            symbolBoundingData: total,
            itemStyle: {
              normal: {
                color: "none",
              },
            },
            label: {
              normal: {
                formatter: (params) => {
                  var text;
                  text = "{f| " + params.data + "}{g|" + this.unit + "}";
                  return text;
                },
                rich: {
                  f: {
                    color: "#b2daff",
                    fontSize: 20,
                    fontFamily: "Digital-7Mono",
                    textShadowColor: "#2bc4ff",
                    textShadowBlur: 10,
                    padding: [0, 0, -4, 0],
                  },
                  g: {
                    color: "#b2daff",
                    fontSize: 16,
                    textShadowColor: "#2bc4ff",
                    textShadowBlur: 10,
                    padding: [0, 0, -2, 0],
                  },
                },
                position: "right",
                distance: 10, // 向右偏移位置
                show: this.show_right,
              },
            },
            data: datas,
            z: 0,
          },

          {
            name: "外框",
            type: "bar",
            barGap: "-130%", // 设置外框粗细
            data: total_list,
            barWidth: 28,
            itemStyle: {
              normal: {
                barBorderRadius: [5, 5, 5, 5],
                color: "transparent", // 填充色
                barBorderColor: "#2bc4ff", // 边框色
                barBorderWidth: 3, // 边框宽度
              },
            },
            z: 3,
          },
        ],
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
