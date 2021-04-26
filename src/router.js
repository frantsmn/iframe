import Vue from 'vue'
import Router from 'vue-router'

import ItemGrid from './views/ItemGrid.vue'
import BookForm from './views/BookForm.vue'
import EventPicker from './views/EventPicker.vue'
import SummaryPage from './views/SummaryPage.vue'
import SuccessPage from './views/SuccessPage.vue'
import ErrorPage from './views/ErrorPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'catalog',
      component: ItemGrid
    },
    {
      path: '/book/:id',
      name: 'book',
      component: BookForm,
      props: true
    },
    {
      path: '/book/:id/calendar',
      name: 'calendar',
      component: EventPicker
    },
    {
      path: '/summary',
      name: 'summary',
      component: SummaryPage,
      props: true
    },
    {
      path: '/success',
      name: 'success',
      component: SuccessPage
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorPage
    },
    {
      path: '*',
      component: ErrorPage
    },
  ],
  mode: 'history'
})
