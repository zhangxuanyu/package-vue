<template>
    <div class="list_page">
        <el-pagination layout="sizes,prev, pager, next,jumper" :current-page="current_page" :page-sizes="[5,10,20]" :page-size="current_size" :pager-count="5" @size-change="handleSizeChange" @current-change="change_page" :total="total_page">
        </el-pagination>
    </div>
</template>

<script>
export default {
    props: [
        'total_page'
    ],
    components: {

    },
    data() {
        return {
            current_size:10,
            current_page:1
        };
    },
    watch: {

    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
        change_page(val){
            this.current_page = val
            this.$emit('change_data',this.current_size,this.current_page)
        },
        handleSizeChange(val){
            this.current_page = 1
            this.current_size = val
            this.$emit('change_data',this.current_size,this.current_page)
        }
    },
};
</script>

<style>
.list_page .el-pagination {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.list_page .el-pagination .btn-next,
.list_page .el-pagination .btn-prev {
  background-color: rgba(0, 0, 0, 0);
  color: #b2daff;
}
.list_page .el-dialog,
.list_page .el-pager li {
  background-color: rgba(0, 0, 0, 0);
  color: #b2daff;
}
.list_page .el-pagination {
  color: #b2daff;
  font-weight: 400;
}
.list_page .el-pager li.active {
  color: #0ea8fc;
}
.list_page .el-input--mini .el-input__inner{
    height: 26px;
    line-height: 26px;
    background-color: #000f5e;
    border-color: #003993;
    color: #2bc4ff;
}
.list_page .el-pagination__editor.el-input .el-input__inner{
    height: 26px;
    line-height: 26px;
    background-color: #000f5e;
    border-color: #003993;
    color: #2bc4ff;
}
.list_page .el-pagination__jump{
    color: #b2daff;
}
</style>
<style scoped>
.list_page {
  position: relative;
  height: 30px;
  margin-top: 10px;
}
</style>
