import commonPage from './commom-page.vue';
commonPage.install = function(Vue) {
  Vue.component('commonPage', commonPage);
};
export default commonPage;