<template>
    <div @click="back">
      显示{{data}}，点击返回{{data}}
    </div>
</template>

<script>
export default {
  name: 'DataShow',
    props: [
      'data'
    ],
    components: {

    },
    data() {
        return {

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
      back(){
        this.$emit('back',this.data)
      }
    },
};
</script>

<style scoped>

</style>

