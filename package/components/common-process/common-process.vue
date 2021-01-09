<template>
    <div>
        <div v-for="(item,index) in data" :key="'state'+index+500" class="state_box">
            <img :src="img_arr[item.type-1]" alt="">
            <div class="state_content">
                <p> <span>{{text_arr[item.type-1].time}}: &nbsp;</span>{{item.time=='0001-01-01 00:00:00'?'-':item.time}} </p>
                <p class="people" v-if="item.person"> <span>{{text_arr[item.type-1].people}}: &nbsp;</span>{{item.person}} </p>
                <p class="text_clip" :title="item.type==2?'':item.content"> <span>{{text_arr[item.type-1].content}}: &nbsp;</span> <s @click="opentext(item.type,item.content)" :style="item.type==2?{textDecoration:'underline',cursor:'pointer'}:''">{{test_cn(item.content)}}</s>  </p>
            </div>
            <div class="line" v-if="data.length<=4"></div>
        </div>
        <div class="state_box" v-if="data.length<=4">
            <img :src="img_arr[4]" alt="">
            <div class="state_content1 common_el jcstate">
                <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4}"
                placeholder="请输入内容"
                v-model="textarea2">
                </el-input>
                 <div class="search" @click="jcwxy">解除预警</div>
            </div>
        </div>
    </div>
</template>

<script>
// data[n].type:1,//1推送 2核查 3处置 4处置完成 5解除
export default {
    props: ['data','id'],
    components: {

    },
    data() {
        return {
            textarea2:'',
            img_arr:[
                require('../../assets/img/lc_ic_tuisong.png'),
                require('../../assets/img/lc_ic_hechabaogao.png'),
                require('../../assets/img/lc_ic_chuzhizhong.png'),
                require('../../assets/img/lc_ic_chuzhiwancheng.png'),
                require('../../assets/img/lc_ic_jiechu.png'),
            ],
            text_arr:[
                {
                    time:'预警时间',
                    content:'预警内容'
                },
                {
                    time:'核查报告',
                    content:'报告内容',
                    people:'报告人员'
                },
                {
                    time:'开始处置',
                    content:'处置内容',
                    people:'处置人员'
                },
                {
                    time:'处置完成',
                    content:'处置结果',
                    people:'处置人员'
                },
                {
                    time:'解除时间',
                    content:'解除说明',
                    people:'解除人员'
                },
            ]
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
        jcwxy(){
            this.$http.post(`/sxwh2/system/api/warning/warningResolve`,{
                id:this.id,
                content:this.textarea2
            }).then(res => {
                if(res.data.success){
                    this.$message.success('解除成功')
                    this.$emit('get_new_info',this.id)
                }
            })
        },
        opentext(n,val){
            if(n!==2){
                return
            }
            this.$emit('show_gg',val)
        },
        //匹配汉字和汉字字符
        test_cn(val){
            var reg = /([^\u4e00-\u9fa5\（\）\《\》\——\；\，\。\“\”\！])/g
            var val1 = val.replace(reg,'')
            return val1
        }
    },
};
</script>


<style>
    .jcstate .el-textarea__inner{
        width: calc(100%);
    }
    .jcstate .el-textarea{
        float: left;
        width: calc(100% - 130px);
    }
</style>
<style scoped>
.state_box{
    width: 100%;
    position: relative;
    padding-left: 100px;
    box-sizing: border-box;
    margin-top: 20px;
}
.state_box img{
    width: 60px;
    position: absolute;
    left: 25px;
    top: 15px;
}
.line{
    width: 2px;
	background-color: rgba(19, 76, 143, 1);
    position: absolute;
    top: 71px;
    left: 54px;
    bottom: -34px;
}
.state_content{
    width: 100%;
    height: 86px;
    box-sizing: border-box;
    padding: 10px 20px;
    line-height: 30px;
    background-image: linear-gradient(90deg, 
		rgba(0, 9, 122, 0.5) 0%, 
		rgba(6, 15, 52, 0.5) 100%);
	border-style: solid;
	border-width: 1px;
	border-image-source: linear-gradient(90deg, 
		rgba(19, 76, 143, 0.5) 0%, 
		rgba(6, 15, 48, 0.5) 100%);
    border-image-slice: 1;
    border-radius: 10px;
}
.state_content p{
    float: left;
    text-align: left;
    width: 50%;
    font-size: 14px;
    color: rgba(178, 218, 255, 1);
}
.state_content p s{
    text-decoration: none;
}
.state_content p:nth-last-of-type(1){
    width: 100%;
}
.state_content .people{
    text-align: right;
}
.state_content p span{
    color: rgba(14, 168, 252, 1);
}
.jcstate{
    overflow: hidden;
}
.search{
    width: 80px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #000f5e;
    border-radius: 6px;
    border: solid 1px #003993;
    color: #0ea8fc;
    font-size: 14px;
    cursor: pointer;
    float: right;
    margin-right: 10px;
}
</style>
