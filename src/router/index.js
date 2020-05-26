import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Message from '@/pages/message'
import About from '@/pages/about'
import Guidelines from '@/pages/guidelines'
import Search from '@/pages/search'
import Drivcx from '@/pages/drivcx'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,

    },
    {
      path: '/message/:url/:pageNo',
      name: 'Message',
      component: Message,
    },

    {
      path: '/about/:categoryId/:contentId',
      name: 'About',
      component: About,
      props: true
    },
    {
      path: '/guidelines',
      name: 'Guidelines',
      component: Guidelines,
    },
    {
      path: '/search/:keywords/:pageNo',
      name: 'Search',
      component: Search,
    },
    {
      path: '/message/drivcx',
      name: 'Drivcx',
      component: Drivcx,
    },

  ]
})
