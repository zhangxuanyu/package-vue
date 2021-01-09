<template>
  <div :id="yylx_asy" class="dashboard"></div>
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
      default: 3,
    },
    color: {
      type: Array,
      default: null,
    },
    shadowColor:{
      type: Array,
      default: null,
    },
    centerText: {
      type: String,
      default: "",
    },
    centerTextSize: {
      type: Number,
      default: 44
    },
    padding: {
      type: Number,
      default: 30
    },
    showLegend: {
      type: Boolean,
      default: false,
    },
    prop:{
      type: Object,
      default: null,
    },
    title_font_size:{
      type: Number,
      default: 44,
    },
    show_persent:{
      type: Boolean,
      default: true,
    },
    labelFormatter: {
      type: Boolean,
      default: true,
    },
    huanhang: {
      type: Boolean,
      default: false,
    }
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
    init_yylx_asy(data, text) {
      var options = this.init_circle(data, text);
      window[this.yylx_asy] = echarts.init(
        document.getElementById(this.yylx_asy)
      );
      window[this.yylx_asy].setOption(options, true);
      // 处理点击事件
      window[this.yylx_asy].on('click',(params)=> {
        console.log(params);
        this.$emit('clickItem',params.data)
      });
    },
    init_circle(data_val, text) {
      // var data_val = data_val;
      var prop_value = this.prop&&this.prop.value?this.prop.value:null
      var prop_name = this.prop&&this.prop.name?this.prop.name:null
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
            "rgba(226, 13, 96, 1)",
            "rgba(255, 132, 0, 1)",
            "rgba(216, 215, 0, 1)",
            "rgba(43, 196, 255, 1)",
            "rgba(139, 203, 57, 1)"
          ];
      let shadowColor =this.shadowColor?this.shadowColor: [
        "rgba(226, 13, 96, 0.5)",
        "rgba(255, 132, 0, 0.5)",
        "rgba(216, 215, 0, 0.5)",
        "rgba(43, 196, 255, 0.5)",
        "rgba(139, 203, 57, 0.5)"
      ];
      var temp2_data = 0;
      data_val.forEach((e) => {
        if(prop_value){
          temp2_data = temp2_data + e[prop_value]
          // temp2_data = temp2_data + e.prop_value
        }else{
          temp2_data = temp2_data + e.value;
        }
      });
      for (var i = 0; i < data_val.length; i++) {
        data.push(
          {
            value: prop_value?data_val[i][prop_value]:data_val[i].value,
            name: prop_name?data_val[i][prop_name]:data_val[i].name,
            code:data_val[i].code||data_val[i].code==0?data_val[i].code:'',
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
            value: temp2_data / this.padding,
            name: "",
            itemStyle: placeHolderStyle,
          }
        );
      }
      for (var i = 0; i < data_val.length; i++) {
        total += prop_value?data_val[i][prop_value]:data_val[i].value;
      }
      let centerText = "";
      if(this.show_center_data) {
        if (this.centerText) {
          centerText = this.centerText;
        } else {
          centerText = helper.numberFormatting(total)
        }
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
                  if (this.labelFormatter) {
                    if ((params.name) !== "") {
                      if(this.show_persent){
                        if (this.huanhang) {
                          return '{a|'+(params.name)+'}'+(params.value)+' \n('+(total==0?0:(params.value/total*100)).toFixed(2)+'%)';
                        } else {
                          return '{a|'+(params.name)+'}'+(params.value)+' ('+(total==0?0:(params.value/total*100)).toFixed(2)+'%)';
                        }
                      }else{
                        return '{a|'+(params.name)+'}'+' ('+(params.value)+')';
                      }
                    } else {
                      return "";
                    }
                  } else  {
                    return params.name;
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
          x: "center",
          y: "center",
          text: centerText,
          textStyle: {
            color: "#b2daff",
            fontFamily: "Digital-7Mono",
            fontSize: this.centerTextSize,
            fontWeight: "normal",
            textShadowColor: "#2bc4ff", //默认透明
            textShadowBlur: 10,
          },
          subtext: text,
          subtextStyle: {
            color: "#b2daff",
            fontSize: 16,
          },
          itemGap: 10, // 主副标题距离
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
          show: this.showLegend,
          orient: "vertical",
          top: "middle",
          left: 10,
          data: this.data.map(item => item.name),
          textStyle: {
            color: "#fff",
            fontSize: "12px"
          },
          itemWidth: 8,
          itemHeight: 8,
          selectedMode: false,
          itemGap: 20
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
