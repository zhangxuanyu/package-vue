# npm-test

> 为山西危化大屏开发的 基于 elementui+vue 的ui库


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# 打包npm包
npm run lib
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 使用此npm包
1. npm install zhangxuanyu-test-vueone --save
2. 在`main.js`中使用此包,需要在引用前需引用`element-ui` 否则会导致部分组件无法生效
```js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import datass from 'zhangxuanyu-test-vueone'
Vue.use(datass);
```