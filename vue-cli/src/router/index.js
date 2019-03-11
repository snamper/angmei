import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Car from '@/components/Car'
import CarType from '@/components/CarType'
import Year from '@/components/Year'
import OutPut from '@/components/OutPut'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Car',
      name: 'Car',
      component: Car
    },
    {
      path: '/CarType',
      name: 'CarType',
      component: CarType
    },
    {
      path: '/Year',
      name: 'Year',
      component: Year
    },
    {
      path: '/OutPut',
      name: 'OutPut',
      component: OutPut
    },
  ]
})
