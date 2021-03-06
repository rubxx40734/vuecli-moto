import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/Products.vue')
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('../views/Order.vue')
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: () => import('../views/Coupons.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/Userboard.vue'),
    children: [
      {
        path: 'usercart',
        name: 'Usercart',
        component: () => import('../views/UserCart.vue')
      },
      {
        path: 'product/:productId',
        name: 'Userproduct',
        component: () => import('../views/UserProduct.vue')
      },
      {
        path: 'checkout/:orderId',
        name: 'Checkout',
        component: () => import('../views/UserCheckOut.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
