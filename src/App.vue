<template>
  <div id="app">
    <dataShow :data="2333242" @back="back"></dataShow>
    <common-box title="12312312" :title_btn="title_btn">
        <div style="color: #fff">
          <p>2222222222222</p>
          <p>2222222222222</p>
          <p>2222222222222</p>
          <p>2222222222222</p>
          <p>2222222222222</p>
          <p>2222222222222</p>
          <p>2222222222222</p>
        </div>
      </common-box>

      <nice-dialog v-model="show_log" :width="1100" title="修改密码">
        <div>11111</div>
      </nice-dialog>


      <common-table
        class="from_content_table"
        ref="outtreetable"
        :selection="false"
        height="500"
        :data="tableData"
        :header="table_header"
        :stripe="true"
      ></common-table>

      <common-scroll-load>
        <div>11111</div>
      </common-scroll-load>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      title_btn: [
        {
          label: "本日",
          value: 1
        },
        {
          label: "本周",
          value: 2
        },
        {
          label: "本月",
          value: 3
        }
      ],
       tableData: [
        {
          order: 1,
          city: "太原",
          county: "11",
          company_name: "22",
          risk_level: "333",
          commitment: "4444"
        },
        {
          order: 1,
          city: "太原",
          county: "11",
          company_name: "22",
          risk_level: "333",
          commitment: "4444"
        },
        {
          order: 1,
          city: "太原",
          county: "11",
          company_name: "22",
          risk_level: "333",
          commitment: "4444"
        }
      ],
      tableData11: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      table_header: [
        {
          prop: "order",
          label: "序号",
          align: "center",
          width: 55
        },
        {
          prop: "city",
          label: "地市",
          align: "center",
          width: 100
        },
        {
          prop: "county",
          label: "区县",
          align: "center",
          width: 100
        },
        {
          prop: "company_name",
          label: "企业名称",
          align: "center"
        },
        {
          prop: "risk_level",
          label: "当日风险等级",
          align: "center",
          width: 150
        },
        {
          prop: "commitment",
          label: "承诺人",
          align: "center",
          type: "html",
          getHtml: str => {
            return '<span style="color:red;">' + str.commitment + "</span>";
          }
        }
      ],
      show_log:true,
    }
  },
  methods:{
    back(n){
      console.log(n);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
