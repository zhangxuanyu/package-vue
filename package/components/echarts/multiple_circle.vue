<template>
  <div :id="yylx_asy" @click="getItem" class="dashboard"></div>
</template>

<script>
import helper from "@/services/helper.js";
import uuidv1 from "uuid/v1";
var echarts = require("echarts");
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    text: {
      type: String,
      default: "",
    },
    show_center_data: {
      type: Boolean,
      default: true,
    },
    bar_width: {
      type: Number,
      default: 5,
    },
    color: {
      type: Array,
      default: null,
    },
  },
  components: {},
  data() {
    return {
      yylx_asy: uuidv1(),
    };
  },
  watch: {
    data: {
      handler() {
        this.init_yylx_asy(this.data, this.text);
      },
      deep: true,
    },
  },
  computed: {},
  created() {},
  mounted() {
    this.init_yylx_asy(this.data, this.text);
  },
  methods: {
    getItem(e) {
      this.$emit("getDetail", e.name);
    },
    init_yylx_asy(data, text) {
      var options = this.init_circle(data, text);
      window[this.yylx_asy] = echarts.init(
        document.getElementById(this.yylx_asy)
      );
      window[this.yylx_asy].setOption(options, true);
    },
    init_circle(data_val, text) {
      // var data_val = data_val;
      var rich = {
        a: {
          fontSize: 12,
          padding: [7, 0],
        },
      };
      var placeHolderStyle = {
        normal: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          color: "rgba(0, 0, 0, 0)",
          borderColor: "rgba(0, 0, 0, 0)",
          borderWidth: 0,
        },
      };
      var data = [];
      var total = 0;
      var color = this.color
        ? this.color
        : [
            "rgba(31,189,255,1)",
            "rgba(0, 252, 255, 1)",
            "rgba(52, 231, 179, 1)",
            "rgba(139, 203, 57, 1)",
            "rgba(216, 215, 0, 1)",
            "rgba(255, 132, 0, 1)",
            "rgba(255, 140, 95, 1)",
            "rgba(248, 0, 96, 1)",
            "rgba(181, 51, 255, 1)",
          ];
      let shadowColor = [
        "rgba(31,189,255,0.5)",
        "rgba(0, 252, 255, 0.5)",
        "rgba(52, 231, 179, 0.5)",
        "rgba(139, 203, 57, 0.5)",
        "rgba(216, 215, 0, 0.5)",
        "rgba(255, 132, 0, 0.5)",
        "rgba(255, 140, 95, 0.5)",
        "rgba(248, 0, 96, 0.5)",
        "rgba(181, 51, 255, 0.5)",
      ];
      var legendarr = [];
      var temp2_data = 0;
      data_val.forEach((e) => {
        temp2_data = temp2_data + e.value;
      });
      for (var i = 0; i < data_val.length; i++) {
        data.push(
          {
            value: data_val[i].value,
            name: data_val[i].name,
            itemStyle: {
              normal: {
                borderWidth: this.bar_width,
                // shadowBlur: 20,
                borderColor: color[i%color.length],
                // shadowColor: color[i],
                shadowColor: shadowColor[i%color.length], //默认透明
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 4,
              },
            },
          },
          {
            value: temp2_data / 30,
            name: "",
            itemStyle: placeHolderStyle,
          }
        );
        legendarr.push(data_val[i].name);
      }
      for (var i = 0; i < data_val.length; i++) {
        total += data_val[i].value;
      }
      var seriesObj = [
        {
          name: "",
          type: "pie",
          clockWise: true,
          radius: ["58%", "61%"],
          center: ["50%", "50%"],
          hoverAnimation: false,
          avoidLabelOverlap: true,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: "outside",
                fontSize: 12,
                formatter: (params) => {
                  if (params.name !== "") {
                    if (params.value == 0 || total == 0) {
                      return '0%\n{a|'+params.name+'}'
                    } else {
                      return Number(params.value/total*100).toFixed(2) + "%\n" + '{a|'+params.name+'}';
                    }
                  } else {
                    return "";
                  }
                },
                rich: rich,
              },
            },
          },
          data: data,
        },
      ];
      var options = {
        title: {
          text: this.show_center_data
            ? helper.numberFormatting(total)
            : "",
          textStyle: {
            color: "#b2daff",
            fontFamily: "Digital-7Mono",
            fontSize: 48,
            fontWeight: "normal",
            textShadowColor: "#2bc4ff", //默认透明
            textShadowBlur: 10,
          },
          subtext: text,
          subtextStyle: {
            color: "#b2daff",
            fontSize: 18,
          },
          itemGap: 10, // 主副标题距离
          left: "center",
          top: "40%",
        },
        grid: {
          left: 10,
          top: 10,
          right: 10,
          bottom: 10,
          containLabel: true,
        },
        color: color,
        tooltip: {
          show: false,
        },
        legend: {
          show: false,
        },
        toolbox: {
          show: false,
        },
        series: seriesObj,
      };
      return options;
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
