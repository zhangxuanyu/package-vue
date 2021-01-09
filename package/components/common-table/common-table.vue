<template>
  <div class="apass_table">
    <el-table
      :data="data"
      v-if="table_show_flag"
      @sort-change="sortChange"
      @row-click="rowClick"
      :row-class-name="rowClassName"
      ref="multipleTable"
      :height="height"
      @select="select"
      @select-all="selectAll"
      stripe="stripe"
      :highlight-current-row="currentStatus"
      class="log_content1"
    >
      <el-table-column
        type="selection"
        width="60"
        align="center"
        v-if="selection"
      ></el-table-column>
      <el-table-column
        v-for="(item, index) in header"
        :label="item.label"
        :align="item.align || 'left'"
        :width="item.width"
        :key="'head_' + index"
        :prop="item.prop"
        :show-overflow-tooltip="item.type === 'buttons' ? false : true"
        :sortable="item.sortable ? 'custom' : false"
      >
        <template slot-scope="scope">
          <div v-if="item.type === 'buttons'" class="row_action">
            <template v-for="(v, i) in item.actionList">
              <span
                v-if="v.disabledRule && v.disabledRule(scope.row)"
                class="btn disabled"
                :class="{ hide: v.disableHide }"
                :key="'btn_' + index + '_' + i"
                v-text="v.getLabel ? v.getLabel(scope.row) : v.label"
              ></span>
              <a
                v-else
                class="btn"
                :class="v.class || ''"
                :key="'btn_' + index + '_' + i"
                @click.stop="v.callback && v.callback(scope.row)"
                v-text="v.getLabel ? v.getLabel(scope.row) : v.label"
              ></a>
              <span
                v-if="i < item.actionList.length - 1"
                class="interval_line"
                :key="'line_' + index + '_' + i"
                >|</span
              >
            </template>
            <template v-if="item.moreActionList">
              <span
                class="interval_line"
                v-if="item.actionList && item.actionList.length > 0"
                >|</span
              >
              <a
                class="btn"
                @mouseenter="mouseenter($event, item.moreActionList, scope.row)"
                @mouseleave="mouseleave"
                >更多</a
              >
            </template>
          </div>
          <span v-else-if="item.type === 'button'" class="row_action">
            <a
              :class="{btn:!(item.disable && item.disable({...scope.row,scope_index_line:scope.$index,scope_index:index}))}"
              v-text="scope.row[item.prop]"
              :style="(item.getStyle && item.getStyle(scope.row)) || {}"
              @click.stop="item.callback && item.callback({...scope.row,scope_index_line:scope.$index,scope_index:index})"
            ></a>
          </span>
          <!-- <div v-else-if="item.type === 'icon'">
            <img
              src="../assets/imgs/ic_true.png"
              alt=""
              v-if="scope.row[item.prop] == 1"
              style="width:100%;height:100%;"
            />
            <img
              src="../assets/imgs/ic_yiwancheng.png"
              alt=""
              v-if="scope.row[item.prop] == 2"
              style="width:100%;height:100%;"
            />
            <img
              src="../assets/imgs/ic_restart.png"
              alt=""
              v-if="scope.row[item.prop] == 3"
              style="width:100%;height:100%;"
            />
            <img
              src="../assets/imgs/ic_failed.png"
              alt=""
              v-if="scope.row[item.prop] == 4"
              style="width:100%;height:100%;"
            />
          </div>-->
          <div v-else-if="item.type === 'tag'" class="table_tag">
            <template v-for="(item, index) in scope.row[item.prop]">
              <el-tag
                v-if="index <= 1 || tag_flag_arr[scope.$index] == 1"
                :key="'tag_' + index"
                >{{ item }}</el-tag
              >
            </template>
            <!-- <div
              class="tagclo btn_down"
              v-if="
                tag_flag_arr[scope.$index] == 0 &&
                  scope.row[item.prop].length > 2
              "
              @click.stop="changeTag(scope.$index, 1)"
            ></div>
            <div
              class="tagclo btn_up"
              v-if="
                tag_flag_arr[scope.$index] == 1 &&
                  scope.row[item.prop].length > 2
              "
              @click.stop="changeTag(scope.$index, 0)"
            ></div>-->
          </div>
          <div v-else-if="item.type === 'chart'" class="charts">
            <sparkline :indicatorStyles="spIndicatorStyles1">
              <sparklineCurve
                :refLineStyles="spRefLineStyles3"
                :refLineType="false"
                :data="scope.row[item.prop]"
                :limit="scope.row[item.prop].length"
                :styles="item.prop == 'cpu' ? spCurveStyles2 : spCurveStyles3"
              />
            </sparkline>
            <span class="use" v-if="item.prop == 'cpu' && scope.row.cpu_use"
              >{{ scope.row["cpu_use"] }}.00mm</span
            >
            <span
              class="use"
              :style="
                scope.row[item.prop].length
                  ? {}
                  : { right: '25px', bottom: '8px' }
              "
              v-if="item.prop == 'cpu' && !scope.row.cpu_use"
              >0mm</span
            >
            <span
              class="use"
              v-if="item.prop == 'mermoy' && scope.row.memory_use"
              >{{ (scope.row["memory_use"] / 1024 / 1024).toFixed(2) }}Mi</span
            >
            <span
              class="use"
              :style="
                scope.row[item.prop].length
                  ? {}
                  : { right: '25px', bottom: '8px' }
              "
              v-if="item.prop == 'mermoy' && !scope.row.memory_use"
              >0Mi</span
            >
          </div>
          <div v-else-if="item.type === 'image'" class="img_content">
            <img
              :src="item.getImage && item.getImage(scope.row)"
              :width="item.size"
            />
          </div>
          <div v-else-if="item.type === 'image-tooltip'" class="img_content">
            <el-tooltip
              effect="dark"
              :content="
                item.getTooltip ? item.getTooltip(scope.row) : item.tooltip
              "
              placement="top"
            >
              <img
                :src="item.getImage && item.getImage(scope.row)"
                :width="item.size"
              />
            </el-tooltip>
          </div>
          <div
            v-else-if="
              item.type === 'tooltip' &&
                item.getLength &&
                item.getLength(scope.row) > 1
            "
          >
            <el-tooltip
              placement="right-start"
              popper-class="apass_table_tooltip"
            >
              <div
                slot="content"
                v-html="item.getContent && item.getContent(scope.row)"
              ></div>
              <span
                v-text="(item.getText && item.getText(scope.row)) + '..'"
                style="text-decoration: underline;color: #515fe7;"
              ></span>
            </el-tooltip>
          </div>
          <span
            v-else-if="item.type === 'hot-index'"
            class="hot_index"
            :class="'index_' + scope.row.hotIndex"
            v-text="'TOP' + scope.row.hotIndex"
          ></span>
          <!-- <span class="sort_table" v-else-if="item.sortable">
            <span>{{ getPercent(scope.row[item.prop]) }}</span>
            <span>
              <img
                v-if="scope.row[item.prop] >= 0"
                :src="require('../assets/imgs/icon_up.png')"
              />
              <img v-else :src="require('../assets/imgs/icon_down.png')" />
            </span>
          </span> -->
          <span
            v-else-if="item.type === 'selected-icon'"
            class="selected_icon"
            :class="{
              selected: scope.row[item.prop]
            }"
          >
            <span></span>
          </span>
          <span
            v-else-if="item.type === 'html'"
            class="table_html"
            v-html="
              item.getHtml ? item.getHtml(scope.row) : scope.row[item.prop]
            "
          ></span>
          <span
            v-else
            v-text="
              item.getText ? item.getText(scope.row) : scope.row[item.prop]
            "
          ></span>
        </template>
      </el-table-column>
    </el-table>

    <ul
      ref="moreActionList"
      class="more_action_list"
      :style="moreActionStyle"
      @mouseenter="enterMoreActionList"
      @mouseleave="leaveMoreActionList"
      v-show="showMoreActionList"
    >
      <li
        v-for="(item, index) in moreActionList"
        :key="'more_' + index"
        @click="item.callback"
        v-text="item.label"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    height: {
      type: String,
      default: null
    },
    rowClassName: {
      type: Function,
      default: null
    },
    selection: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: false
    },
    currentStatus: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    screen_level() {
      this.table_show_flag = !this.table_show_flag;
      setTimeout(() => {
        this.table_show_flag = !this.table_show_flag;
      }, 50);
    },
    data: {
      handler(val) {
        // console.log(val);
        this.toggleSelection(val);
      },
      immediate: true
    }
  },
  data() {
    return {
      tag_flag_arr: [],
      spCurveStyles2: {
        stroke: "#515fe7",
        fill: "#515fe7"
        // fill: '#d2d6f8'
      },
      spCurveStyles3: {
        stroke: "#37c299",
        fill: "#37c299"
        // fill: '#c8ebe4'
      },
      // 指示器样式
      spIndicatorStyles1: false,
      spRefLineStyles3: {
        stroke: "#d14",
        strokeOpacity: 0,
        strokeDasharray: "2, 2"
      },
      moreActionList: [],
      showMoreActionList: false,
      moreActionStyle: {
        top: 0,
        left: 0
      },
      //屏幕等级1280：1，1440：2，1920：3
      screen_level: 3,
      table_show_flag: true
    };
  },
  mounted() {
    this.tag_flag_arr = Array.from(
      { length: this.data.length },
      (item, index) => (item = 0)
    );

    //分辨率兼容
    this.resize();
    window.addEventListener("resize", this.resize);

    window.atClick = (func, val) => {
      this.$emit("atClick", { func, val });
    };
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  methods: {
    toggleSelection(rows) {
      let self = this;
      rows.forEach(row => {
        if (row.sel == 1) {
          console.log(row);
          self.$nextTick(function() {
            self.$refs.multipleTable.toggleRowSelection(row, true);
          });
        }
      });
    },
    resize() {
      this.$nextTick(() => {
        // console.log(document.body.clientWidth );
        if (document.body.clientWidth >= 1280) {
          this.screen_level = 1;
        }
        if (document.body.clientWidth >= 1440) {
          this.screen_level = 2;
        }
        if (document.body.clientWidth >= 1920) {
          this.screen_level = 3;
        }
        // console.log(this.screen_level);
      });
    },
    changeTag(index, val) {
      this.$set(this.tag_flag_arr, index, val);
    },
    sortChange(value) {
      this.$emit("sort-change", value);
    },
    rowClick(value) {
      this.$emit("row-click", value);
    },
    getPercent(num) {
      return Math.round(num * 100) + "%";
    },
    mouseenter($event, moreActionList, row) {
      let _self = this;

      _self.moreActionList = [];
      _self.showMoreActionList = true;
      _self.moreActionList = moreActionList
        .filter(item => {
          if (item.showRule) {
            return item.showRule(row);
          } else {
            return true;
          }
        })
        .map(item => ({
          id: row.id,
          label: item.label,
          callback() {
            _self.showMoreActionList = false;
            _self.moreActionList = [];

            item.callback && item.callback(row);
          }
        }));

      _self.$nextTick(() => {
        let targetInfo = $event.target.getBoundingClientRect();
        let containerInfo = _self.$refs.moreActionList.getBoundingClientRect();

        _self.moreActionStyle = {
          top: targetInfo.y + targetInfo.height + 15 + "px",
          left:
            targetInfo.x - (containerInfo.width - targetInfo.width) / 2 + "px"
        };
      });
    },
    mouseleave() {
      this.showMoreActionList = false;
    },
    enterMoreActionList() {
      this.showMoreActionList = true;
    },
    leaveMoreActionList() {
      this.showMoreActionList = false;
    },
    //全选
    selectAll(rows) {
      if (rows && rows.length) {
      } else {
        this.$refs.multipleTable.clearSelection();
      }
      this.$emit("selectnum", rows);
    },
    select(select, rows) {
      console.log(select, rows);
      this.$emit("selectnum", select);
    },
    cleanSel() {
      this.$refs.multipleTable.clearSelection();
      this.$emit("selectnum", []);
    }
  }
};
</script>

<style>
.apass_table .el-table__empty-block {
  background-color: rgba(2, 20, 78, 1);
}
.apass_table .el-table__empty-text {
  color: rgba(43, 196, 255, 1);
}
.apass_table .el-table th {
  background-color: rgba(2, 20, 78, 1);
  border-bottom: 1px solid rgba(14, 168, 252, 1);
  border-top: 1px solid rgba(14, 168, 252, 1);
  padding: 3px 0;
}
.apass_table .el-table td,
.el-table th {
  background-color: rgba(10, 19, 40, 1);
  color: rgba(178, 218, 255, 1);
  border: none;
}
.apass_table .el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: rgba(3, 19, 74, 1);
}
/* .apass_table .el-table__body tr.current-row{
  border: solid 2px #02ffde;
} */
.apass_table .el-table__body tr.current-row > td {
  background-image: linear-gradient(#03554e, #03554e),
    linear-gradient(#2051cf, #2051cf);
  background-blend-mode: normal, normal;
  border-top: solid 2px #02ffde;
  border-bottom: solid 2px #02ffde;
}
.apass_table .el-table__body tr.current-row > td:first-child {
  border-left: solid 2px #02ffde;
}
.apass_table .el-table__body tr.current-row > td:last-child {
  border-right: solid 2px #02ffde;
}
.apass_table .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(3, 19, 74, 1);
}
.apass_table .el-table th.gutter {
  display: table-cell !important;
}
.apass_table .el-table th > .cell {
  color: rgba(43, 196, 255, 1);
}
.apass_table .el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: rgba(0, 0, 0, 0);
}
.table_tag .el-tag {
  background-color: #58617a;
  color: #fff;
  display: inline-block;
  height: 22px;
  padding: 0 5px;
  line-height: 22px;
  font-size: 12px;
  border-radius: 4px;
  margin-right: 3px;
  margin-bottom: 3px;
}
.tagclo {
  display: inline-block;
  width: 22px;
  height: 22px;
  vertical-align: middle;
  text-align: center;
  line-height: 22px;
  cursor: pointer;
  background-size: contain;
  margin-top: -3px;
}
/* .btn_down {
  background-image: url("../assets/imgs/btn_expand.png");
}
.btn_up {
  background-image: url("../assets/imgs/btn_fold.png");
} */
.charts {
  position: relative;
}
.charts .use {
  position: absolute;
  bottom: 0;
  right: -10px;
  font-size: 12px;
  color: rgba(26, 34, 54, 1);
}
.apass_table_tooltip {
  font-size: 12px;
  line-height: 20px;
}
.hot_index {
  font-family: "Arial";
  font-style: italic;
  font-weight: 800;
  font-size: 16px;
  color: #b9bab5;
}
.hot_index.index_1 {
  color: #d9ac64;
}
.hot_index.index_2 {
  color: #c3c4c0;
}
.hot_index.index_3 {
  color: #ba6e40;
}
.sort_table {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sort_table > span {
  flex-shrink: 0;
}
.sort_table > span:nth-child(1) {
  flex-grow: 1;
  text-align: right;
}
.sort_table > span:nth-child(2) {
  width: 30%;
  margin-left: 5px;
  text-align: left;
}
</style>

<style scoped>
.img_content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.selected_icon {
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  border: 1px solid #e3e5ef;
  padding: 2px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 50%;
}
.selected_icon > span {
  display: none;
  width: 100%;
  height: 100%;
  background-color: #e56600;
  border-radius: 50%;
}
.selected_icon.selected > span {
  display: block;
}
.more_action_list {
  position: fixed;
}
.more_action_list > li {
  padding: 5px 20px;
  background-color: #0f2683;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  cursor: pointer;
  position: relative;
}
.more_action_list > li:first-child {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.more_action_list > li:first-child::before {
  content: "";
  position: absolute;
  top: -20px;
  right: calc(50% - 20px);
  width: 40px;
  height: 20px;
  /* background-color: red; */
}
.more_action_list > li:first-child::after {
  content: "";
  position: absolute;
  top: -14px;
  right: calc(50% - 7px);
  border-top: 0 solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 14px solid #0f2683;
  border-left: 7px solid transparent;
}
.more_action_list > li:last-child {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.more_action_list > li:hover {
  background-color: #3f4f9c;
}
.more_action_list > li:first-child:hover::after {
  border-bottom: 14px solid #3f4f9c;
}
.btn {
  color: #0ea8fc;
  font-weight: 600;
  cursor: pointer;
}
.interval_line {
  margin: 0 10px;
}
</style>
