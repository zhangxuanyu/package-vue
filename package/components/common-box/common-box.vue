<!-- 公共模块盒子 -->
<template>
  <div class="box">
    <div v-if="showHead && $slots.header">
      <slot name="header"></slot>
    </div>
    <div class="box_header" v-else-if="showHead">
      <div
        class="header_title"
        :style="
          title_width
            ? {
                width: title_width + 'px',
                backgroundImage:
                  'url(' + require('../../assets/img/title_bg_l.png') + ')',
              }
            : ''
        "
      >
        {{ title }}
        <span v-if="showAlarm">
          (<span class="alarm_num">{{ alarmNum }}</span>/{{ sumNum }})
        </span>
      </div>
      <!-- 右方标题插槽 -->
      <div v-if="$slots.header_right">
        <slot name="header_right"></slot>
      </div>
      <!-- 右方标题默认内容 -->
      <div v-else>
        <div class="header_btn" v-if="title_btn && title_btn.length">
          <div
            class="header_btn_con"
            v-for="(item, index) in title_btn"
            :key="'btn' + index"
            @click="select_btn(item.value, index)"
            :style="
              now_select == index
                ? {
                    backgroundImage:
                      'url(' + require('../../assets/img/tab_bg_pre.png') + ')',
                  }
                : ''
            "
          >
            {{ item.label }}
          </div>
        </div>
        <div class="back" v-if="back" @click="backbox">
          <span
            >返回&nbsp; <img src="../../assets/img/ic_cancel.png" alt=""
          /></span>
        </div>
      </div>
    </div>
    <div :class="showBack ? 'box_content' : 'box_no_back'">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //标题
    title: {
      type: String,
      default: "11",
    },
    //标题长度
    title_width: {
      type: String,
      default: "",
    },
    //标题右侧选中
    title_btn: {
      type: Array,
      default: () => [],
    },
    //默认选中项
    selected_btn: {
      type: Number,
      default: 0,
    },
    back: {
      type: String,
      default: "",
    },
    showAlarm: {
      type: Boolean,
      default: false,
    },
    alarmNum: {
      type: Number,
      default: 0,
    },
    sumNum: {
      type: Number,
      default: 0,
    },
    showBack: {
      type: Boolean,
      default: true,
    },
    showHead: {
      type: Boolean,
      default: true,
    }
  },
  components: {},
  data() {
    return {
      now_select: 0,
    };
  },
  watch: {},
  computed: {},
  created() {
    this.now_select = this.selected_btn;
  },
  mounted() {},
  methods: {
    select_btn(val, idx) {
      this.now_select = idx;
      this.$emit("change_select", val);
    },
    backbox() {
      this.$emit("backbox");
    },
  },
};
</script>

<style scoped>
.box {
  /* width: 100%;
  height: 100%; */
}
.box_header {
  width: 100%;
  overflow: hidden;
}
.header_title {
  float: left;
  width: 307px;
  height: 28px;
  line-height: 28px;
  background-image: url("../../assets/img/bg_title.png");
  background-size: 100%;
  box-sizing: border-box;
  font-size: 14px;
  color: #b2daff;
  padding-left: 10px;
  font-weight: bold;
}
.header_btn {
  float: right;
  width: calc(100% - 400px);
  margin-right: 20px;
}
.header_btn_con {
  float: right;
  width: 48px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  margin-left: 5px;
  font-size: 12px;
  color: #2bc4ff;
  cursor: pointer;
  background-image: url("../../assets/img/tab_bg.png");
}
.box_content {
  background-image: linear-gradient(
    0deg,
    rgba(0, 9, 122, 0.3) 0%,
    rgba(6, 15, 48, 0.3) 100%
  );
  border-style: solid;
  border-width: 1px;
  border-image-source: linear-gradient(
    0deg,
    rgba(19, 76, 143, 0.3) 0%,
    rgba(6, 15, 48, 0.3) 100%
  );
  border-image-slice: 1;
  padding: 10px;
  box-sizing: border-box;
}
.box_no_back {
  padding: 10px;
  box-sizing: border-box;
}
.back {
  color: #0ea8fc;
  float: right;
  font-size: 14px;
  margin: 7px 15px 0 0;
  cursor: pointer;
}
.alarm_num {
  color: #c41255;
}
</style>
