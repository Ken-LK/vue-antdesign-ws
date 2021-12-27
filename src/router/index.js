import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Led',
    component: ()=>import('@/views/led')
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
