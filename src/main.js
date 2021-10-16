// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import '@/css/resrt.css'
import assembly from './components/bread'




Vue.filter('TimeFilter',function (createdate){ 
  const date=new Date(createdate); 
  const year=date.getFullYear();  
  const month=date.getMonth()+1;
  const day=date.getDay();    
  const shi=date.getHours()  
  const fen=date.getMinutes() 
  const miao=date.getSeconds() 
  return year+"-"+month+"-"+day}
)
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component('mianbao',assembly)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
