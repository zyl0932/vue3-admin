import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Layout from "@/layout/index.vue"

// 看作是异步路由
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/documentation",
    component: Layout, // 布局组件作为一级路由
    redirect: "/documentation",
    children: [
      {
        path: "index",
        name: "Documentation",
        component: () =>
          import(
            /* webpackChunkName: "documentation" */
            "@/views/documentation/index.vue"
          ),
        meta: {
          title: "Documentation",
          icon: "documentation",
          hidden: true
        }
      }
    ]
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "guide",
        name: "Guide",
        component: () =>
          import(/* webpackChunkName: "guide" */ "@/views/guide/index.vue"),
        meta: {
          title: "Guide",
          icon: "guide"
        }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    meta: {
      title: "System",
      icon: "lock"
    },
    children: [
      {
        path: "menu",
        component: () =>
          import(/* webpackChunkName: "menu" */ "@/views/system/menu.vue"),
        meta: {
          title: "Menu Management"
        }
      },
      {
        path: "role",
        component: () =>
          import(/* webpackChunkName: "menu" */ "@/views/system/role.vue"),
        meta: {
          title: "Role Management"
        }
      },
      {
        path: "user",
        component: () =>
          import(/* webpackChunkName: "menu" */ "@/views/system/user.vue"),
        meta: {
          title: "User Management"
        }
      }
    ]
  },
  {
    // 外链路由
    path: "/external-link",
    component: Layout,
    children: [
      {
        path: "http://www.zhufengpeixun.com/",
        redirect: "/",
        meta: {
          title: "External Link",
          icon: "link"
        }
      }
    ]
  }
]
const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */
            "@/views/dashboard/index.vue"
          ),
        meta: {
          title: "Dashboard", // 需要配置声明文件否则无提示
          icon: "dashboard"
        }
      }
    ]
  }
]
export const routes = [...constantRoutes, ...asyncRoutes]
export default createRouter({
  history: createWebHistory(),
  routes
})
