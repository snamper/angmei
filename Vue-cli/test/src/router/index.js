import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Mine from '@/components/Mine'
import Son1 from '@/components/Son1'
import Son2 from '@/components/Son2'
import '../../static/css/base.css'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home/:id',
      name: 'home',
      component: Home,
      children:[
        {
          path: 'son1',
          name: 'son1',
          component: Son1
        },
        {
          path: 'son2',
          name: 'son2',
          component: Son2
        }
      ]
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    }
  ]
})
