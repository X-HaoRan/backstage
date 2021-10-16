import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: ()=>import('../views/login')
    },
    {
      path: '/home',
      name: 'home',
      component: ()=>import('../views/home'),
      children:[
        {path:'/users',name:'users',component:()=> import('../views/users')},
        {path:'/rights',name:'rights',component:()=> import('../views/surface')},
        {path:'/roles',name:'roles',component:()=> import('../views/power')},
        {path:'/goods',name:'goods',component:()=> import('../views/goods')},
        {path:'/params',name:'params',component:()=> import('../views/params')},
        {path:'/categories',name:'categories',component:()=> import('../views/categories')},
        {path:'/orders',name:'orders',component:()=> import('../views/orders')},
        {path:'/reports',name:'reports',component:()=> import('../views/reports')},
      ]
    }
  ]
})
