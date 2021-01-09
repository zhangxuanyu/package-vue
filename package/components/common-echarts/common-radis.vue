<template>
  <div :id="bar" class="dashboard"></div>
</template>

<script>
import uuidv1 from "uuid/v1";
var echarts = require("echarts");
export default {
  props: {
    indicator: {
      type: Array,
      default: () => []
    },
    datas: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data() {
    return {
      bar: uuidv1()
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
      this.init_radis_chart()
  },
  methods: {
    init_radis_chart() {
      var legendData = []; //图例
      var dataArr = [];
      var colorArr = ["rgba(248, 0, 96, 1)", "rgba(216, 215, 0, 1)","rgba(2, 255, 222, 1)"]; //颜色
      this.datas.forEach((e,idx) => {
        legendData.push(e.name)
        dataArr.push({
          value: e.value,
          name: e.name,
          itemStyle: {
            normal: {
              lineStyle: {
                color: colorArr[idx]
              },
              shadowColor: colorArr[idx],
              shadowBlur: 10
            }
          },
          areaStyle: {
            normal: {
              // 单项区域填充样式
              color: {
                type: "linear",
                x: 0, //右
                y: 0, //下
                x2: 1, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0,
                    color: colorArr[idx]
                  },
                  {
                    offset: 0.5,
                    color: "rgba(0,0,0,0)"
                  },
                  {
                    offset: 1,
                    color: colorArr[idx]
                  }
                ],
                globalCoord: false
              },
              opacity: 1 // 区域透明度
            }
          }
        });
      });
      
      var option = {
        color: colorArr,
        legend: {
            data: legendData,
            bottom:20,
            right:'center',
            itemWidth: 10, // 图例标记的图形宽度。[ default: 25 ]
            itemHeight: 3, // 图例标记的图形高度。[ default: 14 ]
            itemGap: 11, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
            textStyle: {
                fontSize: 12,
                color: '#00E4FF',
            },
        },
        radar: {
          // shape: 'circle',
          radius:'50%',
          name: {
            textStyle: {
              color: "rgba(14, 168, 252, 1)",
              fontSize: 14
            }
          },
          indicator: this.indicator,
          splitArea: {
            // 坐标轴在 grid 区域中的分隔区域，默认不显示。
            show: true,
            areaStyle: {
              // 分隔区域的样式设置。
              color: ["rgba(255,255,255,0)", "rgba(255,255,255,0)"] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
            }
          },
          axisLine: {
            //指向外圈文本的分隔线样式
            lineStyle: {
              color: "#153269"
            }
          },
          splitLine: {
            lineStyle: {
              color: "#113865", // 分隔线颜色
              width: 1 // 分隔线线宽
            }
          }
        },
        series: [
          {
            type: "radar",
            symbolSize: 8,
            // symbol: 'angle',
            data: dataArr
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
