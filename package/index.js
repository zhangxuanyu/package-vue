import './assets/css/index.css'

import dataShow from './components/appdata/index'
import commonBox from './components/common-box/index'
import niceDialog from './components/common-dailog/index'
import commomPage from './components/common-page/index'
import commonScrollLoad from './components/common-scroll-load/index'
import commonTable from './components/common-table/index'


var components_arr = [
    {name:'dataShow',component:dataShow},
    {name:'commonBox',component:commonBox},
    {name:'niceDialog',component:niceDialog},
    {name:'commomPage',component:commomPage},
    {name:'commonScrollLoad',component:commonScrollLoad},
    {name:'commonTable',component:commonTable},
]

const install = function(Vue) {
    components_arr.forEach(e => {
        Vue.component(e.name, e.component);
    });
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    dataShow,
    commonBox,
    niceDialog,
    commomPage,
    commonScrollLoad,
    commonTable,
    install
}