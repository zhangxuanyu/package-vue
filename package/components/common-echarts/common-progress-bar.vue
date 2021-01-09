<template>
  <div class="progress_bar_chart">
    <div
      class="line_box"
      v-for="(item, index) in data"
      :key="'r_line_2_' + index"
      @click="$emit('drill', item)"
    >
      <div class="line_title text_clip">
        <span :title="item.xzqh">{{ item.xzqh }}</span>
      </div>
      <div class="line_bar">
        <div class="line_bar_bg2" :style="{ width: item.percent + '%' }"></div>
        <div class="line_bar_fg" :style="{ width: item.percent + '%' }"></div>
        <div class="line_bar_value">
          <span>{{ item.access_num }} / {{ item.total }}</span>
        </div>
      </div>
      <div class="line_percent_value">
        <span>{{ item.percent.toFixed(2) + "%" }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.progress_bar_chart {
  overflow-y: auto;
}
.progress_bar_chart::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.progress_bar_chart::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 32, 71, 1);
  border-radius: 10px;
}
.progress_bar_chart::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(43, 196, 255, 1);
}
.progress_bar_chart::-webkit-scrollbar-corner {
  background: rgba(0, 32, 71, 1);
}
.line_box {
  width: 100%;
  flex-shrink: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.line_box + .line_box {
  margin-top: 5px;
}
.line_box > .line_title {
  width: 80px;
  height: 22px;
  line-height: 22px;
  font-size: 14px;
  color: #b2daff;
  float: left;
  text-align: right;
  padding-right: 10px;
  box-sizing: border-box;
}
.line_box > .line_bar {
  flex-grow: 1;
  width: 300px;
  height: 22px;
  line-height: 22px;
  border-radius: 6px;
  border: solid 1px #0b366b;
  overflow: hidden;
  position: relative;
  float: left;
}
.line_box > .line_bar > .line_bar_bg {
  height: 18px;
  background-image: linear-gradient(90deg, #3b17ae 0%, #00c0ff 100%),
    linear-gradient(#ffffff, #ffffff);
  background-blend-mode: multiply, normal;
  border-radius: 4px;
  position: absolute;
  left: 2px;
  top: 2px;
}
.line_box > .line_bar > .line_bar_bg2 {
  height: 18px;
  background-image: linear-gradient(90deg, #00c0ff 0%, #3b17ae 100%),
    linear-gradient(#ffffff, #ffffff);
  background-blend-mode: multiply, normal;
  border-radius: 4px;
  position: absolute;
  left: 2px;
  top: 2px;
}
.line_box > .line_bar > .line_bar_fg {
  position: absolute;
  z-index: 1;
  height: 18px;
  left: 2px;
  top: 2px;
  background-image: url("../../assets/img/line_bg.png");
  background-position-x: left;
  background-size: contain;
}
.line_box > .line_bar > .line_bar_value {
  position: absolute;
  z-index: 1;
  top: 2px;
  left: 2px;
  height: 18px;
  line-height: 18px;
  width: 100px;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  padding-left: 10px;
}
.line_box > .line_percent_value {
  height: 22px;
  width: 80px;
  text-align: right;
  font-family: Digital-7Mono;
  font-size: 26px;
  color: #b2daff;
  position: relative;
  top: -1px;
}
</style>
