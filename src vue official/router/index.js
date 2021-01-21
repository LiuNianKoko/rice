import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/index'
import About from '@/pages/about/about'
import Me from '@/pages/about/me/me'
import Company from '@/pages/about/company/company'
import Concat from '@/pages/about/concat/concat'
import Brand from '@/pages/about/brand/brand'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path:'/about',
      component:About,
      children:[
        {
          path:'me',
          component:Me
        },
        {
          path:'company',
          component:Company
        },
        {
          path:'concat',
          component:Concat
        },
        {
          path:'brand',
          component:Brand
        }
      ]
    }
  ]
})
