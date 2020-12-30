import dataShow from './components/appdata/index'
console.log(dataShow);
const install = function(Vue, opts = {}) {
    Vue.component('dataShow', dataShow);
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    dataShow
}