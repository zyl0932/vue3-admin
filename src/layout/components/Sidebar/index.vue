<template>
  <h4 @click="isCollapse = !isCollapse">展收测试</h4>
  <el-menu
    class="sidebar-container-menu"
    mode="vertical"
    :default-active="activeMenu"
    :background-color="scssVariables.menuBg"
    :text-color="scssVariables.menuText"
    :active-text-color="scssVariables.menuActiveText"
    :collapse="isCollapse"
    :collapse-transition="true"
  >
    <!-- 循环sidebar-item组件 -->
    <sidebar-item
      v-for="route in menuRoutes"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    />
  </el-menu>
</template>

<script lang="ts" setup>
import scssVariables from "@/styles/variables.module.scss"
// 导入路由表
import { routes } from "@/router"
import SidebarItem from "./SidebarItem.vue"
const route = useRoute()
// 根据路由路径 对应  当前激活的菜单 页面刷新后 激活当前路由匹配的菜单
const activeMenu = computed(() => {
  const { path, meta} = route;
  console.log(path, meta)
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  console.log(meta.activeMenu)
  return path
})
// 渲染路由
const menuRoutes = computed(() => routes)
const isCollapse = ref(false)
</script>
