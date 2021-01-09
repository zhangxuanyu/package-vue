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
      default: () => {}
    },
    total: {
      type: Number,
      default: 0
    },
    color:{
      type: Array,
      default: null
    },
    x_rotate:{
      type: Number,
      default: 0
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
    this.init_bar_charts();
  },
  methods: {
    //累加函数
    add_arr_func(arr,idx){
        var temp_arr = JSON.parse(JSON.stringify(arr[idx].arr))
        arr.forEach((e,index) => {
            if(index>idx){
                temp_arr.forEach((el,id) => {
                    temp_arr[id] = temp_arr[id] + e.arr[id]
                });
            }
        });
        console.log(temp_arr);
        return temp_arr
    },
    init_bar_charts() {
      var total = this.total; // 数据总
      var series = []
      this.datas.yarr.forEach((e,idx) => {
          series.push({
            // 替代颜色
            type: "pictorialBar",
            hoverAnimation:false,
            name: e.name,
            symbol: "fixed",
            stack: "总量",
            symbolSize: [24, 5],
            symbolMargin: 2,
            symbolRepeat: "repeat",
            barCategoryGap: "40%",
            z: 1+idx,
            data: this.add_arr_func(this.datas.yarr,idx)
          })
      });
      var temp_total_arr = new Array(this.datas.yarr[0].arr.length).fill(total)
      series.push({
            // 背景色
            type: "pictorialBar",
            stack: "总量",
            symbol: "fixed",
            symbolSize: [24, 5],
            symbolMargin: 2,
            symbolRepeat: "repeat",
            symbolBoundingData: total,
            z: -10,
            data: temp_total_arr,
            itemStyle: {
              normal: {
                color: "#0b366b"
              }
            },
            animationEasing: "elasticOut"
          })
      var colors = this.color?this.color:['rgba(248, 0, 96, 1)','rgba(255, 132, 0, 1)','rgba(216, 215, 0, 1)','rgba(43, 196, 255, 1)']
      var option = {
        color:colors,
        legend: {
          textStyle: {
            color: "#fff",
            fontSize:'12px'
          },
          itemWidth:8,
          itemHeight:8,
          selectedMode:false,
          bottom:10,
          itemGap:20,
        },
        grid:{
            top:20,
            left:50,
            right:20,
        },
        xAxis: {
          type: "category",
          data: this.datas.xarr,
          axisLabel: {
            color: "rgba(13, 140, 214, 1)",
            rotate:this.x_rotate
          },
          axisLine: {
            lineStyle: {
              color: "rgba(11, 54, 107, 1)"
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          max: total,
          axisLabel: {
            color: "rgba(13, 140, 214, 1)"
          },
          axisLine: {
            lineStyle: {
              color: "rgba(11, 54, 107, 1)"
            }
          },
          splitLine: {
            show: false
          },
        },
        series: series,
        tooltip:{
            axisPointer:{
                trigger: 'axis',
                type:'shadow'
            },
            formatter:(params)=>{
                var str = ''
                var index = params.dataIndex
                this.datas.yarr.forEach((e,idx) => {
                    str = str + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+colors[idx]+'"></span>' + e.name +':'+ e.arr[index]+'<br>'
                });
                return str
            },
        }
      };
      window[this.bar] = echarts.init(document.getElementById(this.bar));
      window[this.bar].setOption(option, true);
      // 处理点击事件
      window[this.bar].on('click',(params)=> {
        this.$emit('clickItem',params)
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
