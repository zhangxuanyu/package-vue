<template>
  <transition name="mask-bg-fade">
    <el-dialog
      :class="{
        nice_dialog: true,
        width460: width == 460,
        width461: width == 461,
        width462: width == 462,
        width690: width == 690,
        width1100: width == 1100,
        width1101: width == 1101,
        width1100730: width == 1100730,
        width1100black: width == 1100.1,
        width1460: width == 1460,
        width1461: width == 1461,
        width1820: width == 1820,
      }"
      :close-on-click-modal="false"
      :visible.sync="showInner"
      :destroy-on-close="true"
    >
      <div class="nice_dialog_container">
        <slot name="header" v-if="$slots.header"></slot>
        <div class="log_header" v-if="!$slots.header">
          <div class="log_title">{{ title }}</div>
          <div class="log_close" @click="close_dailog"></div>
        </div>
        <slot></slot>
      </div>
    </el-dialog>
  </transition>
</template>

<script>
export default {
  model: {
    prop: "showOutter",
    event: "change"
  },
  props: {
    width: {
      type: Number,
      default: () => 460 //460:小提示框  461:提示框加选择  462:一企一档弹窗 其余根据设计图来选择尺寸
    },
    showOutter: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    showInner: false
  }),
  watch: {
    showOutter(value) {
      this.showInner = value;
    },
    showInner(value) {
      this.$emit("change", value);
    }
  },
  created() {
    // console.log(this.$slots);
    this.showInner = this.showOutter;
  },
  methods: {
    close_dailog(){
      this.showInner = false
    }
  }
};
</script>

<style scoped>
.nice_dialog_container {
  width: 100%;
  height: 100%;
}
.log_header div:nth-of-type(1) {
  float: left;
}
.log_header div:nth-of-type(2) {
  float: right;
}
.log_header {
  overflow: hidden;
  margin-bottom: 10px;
  padding: 0 5px;
}
.log_close {
  width: 48px;
  height: 18px;
  background-image: url("../../assets/img/pop_btn_close_s.png");
  cursor: pointer;
}
.log_title {
  font-size: 14px;
  color: rgba(43, 196, 255, 1);
  font-weight: 600;
}
.width1100 .log_title {
  font-size: 16px;
}
.width1100 .log_close {
  width: 66px;
  height: 24px;
  background-image: url("../../assets/img/pop_btn_close_l.png");
}
.width1100 .log_header {
  margin-top: 3px;
}
.width1101 .log_title {
  font-size: 16px;
}
.width1101 .log_close {
  width: 66px;
  height: 24px;
  background-image: url("../../assets/img/pop_btn_close_l.png");
}
.width1100730 .log_title {
  font-size: 16px;
}
.width1100730 .log_close {
  width: 66px;
  height: 24px;
  background-image: url("../../assets/img/pop_btn_close_l.png");
}
.width1101 .log_header {
  margin-top: 3px;
}
.width1100730 .log_header {
  margin-top: 3px;
}
.width1100black .log_title {
  font-size: 16px;
}
.width1100black .log_close {
  width: 66px;
  height: 24px;
  background-image: url("../../assets/img/btn_close.png");
}
.width1100black .log_header {
  margin-top: 3px;
}
.width1461 .log_title {
  font-size: 16px;
}
.width1461 .log_close {
  width: 66px;
  height: 24px;
  background-image: url("../../assets/img/pop_btn_close_l.png");
}
</style>
<style>
.width460 .el-dialog__body {
  background-image: url("../../assets/img/pop_bg_tip.png");
  width: 460px;
  height: 250px;
  background-size: 100% 100%;
}
.width461 .el-dialog__body {
  background-image: url("../../assets/img/pop_bg_s.png");
  width: 460px;
  height: 320px;
  background-size: 100% 100%;
}
.width462 .el-dialog__body {
  background-image: url("../../assets/img/yqyd_pop_bg1.png");
  width: 460px;
  height: 318px;
  background-size: 100% 100%;
}
.width690 .el-dialog__body {
  background-image: url("../../assets/img/pop_bg_m.png");
  width: 690px;
  height: 415px;
  background-size: 100% 100%;
}
.width1100 .el-dialog__body {
  background-image: url("../../assets/img/pop_bg_l.png");
  width: 1100px;
  height: 620px;
  background-size: 100% 100%;
}
.width1101 .el-dialog__body {
  background-image: url("../../assets/img/yqyd_pop_bg_qyxq.png");
  width: 1100px;
  height: 730px;
  background-size: 100% 100%;
}
.width1100730 .el-dialog__body {
  background-image: url("../../assets/img/1100730bg.png");
  width: 1100px;
  height: 730px;
  background-size: 100% 100%;
}
.width1100black .el-dialog__body {
  background-image: url("../../assets/img/pop_bg_zoushitu.png");
  width: 1100px;
  height: 620px;
  background-size: 100% 100%;
}
.width1460 .el-dialog__body {
  background-image: url("../../assets/img/yqyd_pop_bg_值班表.png");
  width: 1460px;
  height: 911px;
  background-size: 100% 100%;
}
.width1461 .el-dialog__body {
  background-image: url("../../assets/img/run_state_log_bg.png");
  width: 1460px;
  height: 620px;
  background-size: 100% 100%;
}
.width1820 .el-dialog__body {
  background-image: url("../../assets/img/pop_bg_xxl.png");
  width: 1820px;
  height: 911px;
  background-size: 100% 100%;
}
.width462 .el-dialog,
.width461 .el-dialog,
.width460 .el-dialog {
  width: 460px;
}
.width690 .el-dialog {
  width: 690px;
}
.width1100 .el-dialog {
  width: 1100px;
}
.width1101 .el-dialog {
  width: 1100px;
}
.width1100730 .el-dialog {
  width: 1100px;
}
.width1100black .el-dialog {
  width: 1100px;
}
.width1460 .el-dialog {
  width: 1460px;
  margin-top: 50px!important;
}
.width1461 .el-dialog {
  width: 1460px;
}
.width1820 .el-dialog {
  width: 1820px;
  margin-top: 50px!important;
}
.nice_dialog .el-dialog {
  background-color: rgba(0, 0, 0, 0);
}
.nice_dialog .el-dialog__header {
  display: none;
}
.nice_dialog .el-dialog__body {
  padding: 15px 20px;
  box-sizing: border-box;
}
.nice_dialog .el-dialog__footer {
  display: none;
}
</style>
