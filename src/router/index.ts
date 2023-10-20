import { createRouter, createWebHistory } from "vue-router"

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      component: () => import("../views/Home.vue")
    },
    {
      path: "/about",
      component: () => import("../views/About.vue")
    }
  ]
})