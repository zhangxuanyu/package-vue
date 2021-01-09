<template>
  <chart :options="bar()" @click="getItem" class="bar" />
</template>

<script>
import { graphic } from "echarts/lib/export";
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          series: [
            {
              data: [],
            },
          ],
          xAxis: [],
        };
      },
    },
    could_get_detail: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  mounted() {},
  methods: {
    getItem(e) {
      this.$emit("getDetail", e.name);
    },
    bjdata() {
      let arr = [];
      for (let i = 0; i < this.data.yarr[0].value.length; i++) {
        arr.push(100);
      }
      return arr;
    },
    bar() {
      let self = this;
      return {
        color: ["#ff8400"],
        legend: {
          data: ["已承诺企业数", "未承诺企业数", "承诺率"],
          show: true,
          bottom: 5,
          textStyle: {
            fontSize: 14,
            color: "#b2daff",
            fontWeight: "normal",
          },
          icon: "react",
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 20,
        },
        title: {
          text: "",
          show: false,
          top: 10,
          right: 30,
          textStyle: {
            fontSize: 14,
            color: "#4cc6ff",
            fontWeight: "normal",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: 20,
          right: 20,
          bottom: 35,
          top: 10,
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            gridIndex: 0,
            data: this.data.xarr,
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#4cc6ff",
              },
            },
            axisLabel: {
              show: true,
              color: "#0d8cd6",
              fontSize: 14,
              // rotate: 30,
              interval: 0,
              formatter: function (value) {
                var res = value;
                if (res.length > 5) {
                  res = res.substring(0, 4) + "..";
                }
                return res;
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            gridIndex: 0,
            splitNumber: 5,
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              color: "#0d8cd6",
              fontSize: 14,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#17386a",
              },
            },
          },
          {
            type: "value",
            gridIndex: 0,
            splitNumber: 5,
            splitLine: {
              lineStyle: {
                color: "#17386a",
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#0d8cd6",
              fontSize: 14,
              formatter(params) {
                return params + "%";
              },
            },
          },
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          textStyle: {
            fontSize: 14,
          },
          padding: 8,
          itemHeight: 18,
          formatter(params) {
            let dotHtml0 = `<span style="display:inline-block;margin-right:8px;border-radius:50%;width:12px;height:12px;background-color:#02ffde"></span>`;
            let dotHtml1 = `<span style="display:inline-block;margin-right:8px;border-radius:50%;width:12px;height:12px;background-color:#f05155"></span>`;
            let dotHtml3 = `<span style="display:inline-block;margin-right:8px;border-radius:50%;width:12px;height:12px;background-color:#ff8400"></span>`;
            return `
            ${params[0].axisValue}<br/>
            ${dotHtml0}${params[0].seriesName}：${params[0].data}<br/>
            ${dotHtml1}${params[1].seriesName}：${params[1].data}<br/>
            ${dotHtml3}${params[3].seriesName}：${params[3].data}%<br/>
            `;
          },
        },
        series: [
          {
            name: this.data.yarr[0].name,
            type: "bar",
            stack: "1",
            barWidth: "30%",
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
              normal: {
                barBorderRadius: [0, 0, 0, 0],
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#02ffde",
                  },
                  {
                    offset: 1,
                    color: "#006d85",
                  },
                ]),
              },
            },
            data: this.data.yarr[0].value,
            zlevel: 2,
          },
          {
            name: this.data.yarr[1].name,
            type: "bar",
            stack: "1",
            barWidth: "30%",
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#f05155",
                  },
                  {
                    offset: 1,
                    color: "#382a34",
                  },
                ]),
              },
            },
            data: this.data.yarr[1].value,
            zlevel: 3,
          },
          {
            name: "2",
            type: "bar",
            barWidth: "50%",
            xAxisIndex: 0,
            yAxisIndex: 1,
            barGap: "-135%",
            data: this.bjdata(),
            itemStyle: {
              normal: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(4, 135, 124, 0)",
                  },
                  {
                    offset: 1,
                    color: "rgba(4, 135, 124, 0.3)",
                  },
                ]),
              },
            },
            zlevel: 1,
          },
          {
            name: this.data.yarr[2].name,
            type: "line",
            symbol: "emptyCircle",
            symbolSize: 10,
            hoverAnimation: false,
            xAxisIndex: 0,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3, //折线粗细
                  type: "solid", //'dotted'虚线 'solid'实线
                  color: "#ff8400",
                  shadowColor: "rgba(255, 132, 0, 0.5)",
                  shadowBlur: 4,
                  shadowOffsetX: 0,
                  shadowOffsetY: 8,
                },
                borderColor: "#ff8400",
                borderWidth: 3,
              },
            },
            data: this.data.yarr[2].value,
            zlevel: 4,
          },
        ],
      };
    },
  },
};
</script>
<style scoped>
.bar {
  width: 100%;
  height: 100%;
}
</style>