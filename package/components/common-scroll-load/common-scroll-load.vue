<template>
    <div class="all_content" :ref="ref_id">
        <slot></slot>
    </div>
</template>

<script>
import uuidv1 from "uuid/v1";
export default {
    props: {
        disable:{
            type:Boolean,
            default:false
        }
    },
    components: {

    },
    data() {
        return {
            ref_id:uuidv1()
        };
    },
    watch: {

    },
    computed: {

    },
    created() {

    },
    mounted() {
        var io = new IntersectionObserver((entries)=>{
            console.log(entries)
            if(!this.disable){
                this.$emit('load_data')
            }
        })

        io.observe(this.$refs[this.ref_id])
    },
    methods: {

    },
};
</script>

<style scoped>
/* .all_content{
    width: 100%;
    height: 100%;
} */
</style>
