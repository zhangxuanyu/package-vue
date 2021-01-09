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
  },
  components: {},
  data() {
    return {
        bar:uuidv1()
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
      this.init_pan_chart()
  },
  methods: {
    get_risk_name(val){
        if(val<=25){
            return '低风险'
        }else if(val<=50){
            return '一般风险'
        }else if(val<=80){
            return '较大风险'
        }else if(val<=100){
            return '重大风险'
        }
    },
    get_risk_color(val){
        if(val<80){
            return '#0089fa'
        }else{
            return 'rgba(248, 0, 96, 1)'
        }
    },
    init_pan_chart() {
      var colors = ["rgba(248, 0, 96, 1)", "#e6a900", "rgba(0, 60, 255, 1)"];
      var fontColor = "#0089fa";
      var data = this.datas;
      var fontSize = 10;
      var percent = (data[0] / (data[0] + data[1])) * 100;
      var option = {
        series: [
          {
            type: "gauge",
            name: "外层辅助",
            radius: "88%",
            pointer: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 70,
                name: "在线："
              }
            ],
            title: {
              show: false,
              offsetCenter: [-60, "90%"],
              textStyle: {
                color: fontColor
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: [[1, "#0a80d5"]],
                width: 5,
                opacity: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              length: 20,
              lineStyle: {
                color: "#051932",
                width: 0,
                type: "solid"
              }
            },
            axisLabel: {
              show: false
            }
          },
          {
            name: "最内层线",
            type: "gauge",
            radius: "30%",
            center: ["50%", "50%"],
            startAngle: 0,
            endAngle: 359,
            axisLine: {
              show: false,
              lineStyle: {
                opacity: 0
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                opacity: 0
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              length: 2,
              lineStyle: {
                color: fontColor,
                width: 0,
                type: "solid"
              }
            },
            detail: {
              show: false
            },
            data: [
              {
                value: data[1],
                name: "离线："
              }
            ],
            title: {
              show: false,
              offsetCenter: [50, "258%"],
              textStyle: {
                color: fontColor
              }
            },
            pointer: {
              show: false
            }
          },
          {
            name: "内层数据刻度",
            type: "gauge",
            radius: "78%",
            min: 0,
            max: 100,
            center: ["50%", "50%"],
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.1, colors[0]],
                  [0.3, colors[0]],
                  [0.7, colors[0]],
                  [0.8, colors[0]],
                  [1, colors[2]]
                ],
                shadowColor: "rgba(0, 0, 0, 0.5)",
                shadowBlur: 10
              }
            },
            splitLine: {
              length: 15,
              lineStyle: {
                width: 2,
                color: "#000"
              }
            },
            axisTick: {
              lineStyle: {
                width: 1,
                color: "#000"
              }
            },
            axisLabel: {
              color: "auto",
              distance: 1,
              fontSize: fontSize
            },
            detail: {
              show: false
            },
            itemStyle: {
              normal: {
                color: "rgba(178, 218, 255, 1)"
              }
            },
            pointer:{
                show:true,
                length:'70%',
                width:3
            },
            data: [
              {
                value: percent,
                name: this.get_risk_name(percent)
              }
            ],
            silent: false,
            title: {
              offsetCenter: [0, "95%"], //设置在线率位置
              color: this.get_risk_color(percent),
              fontSize: 18
            }
          }
        ]
      };
      window[this.bar] = echarts.init(document.getElementById(this.bar));
      window[this.bar].setOption(option, true);
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
