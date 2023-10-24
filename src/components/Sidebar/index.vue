<template>
  <h4 @click="isCollapse = !isCollapse">展收测试</h4>
  <el-menu
    class="el-menu-container"
    mode="vertical"
    :default-active="activeMenu"
    :background-color="scssVariables.menuBg"
    :text-color="scssVariables.menuText"
    :active-text-color="scssVariables.menuActiveText"
    :collapse="isCollapse"
    :collapse-transition="true"
    >
      <sidebar-item></sidebar-item>
    </el-menu>
</template>

<script lang="ts" setup>
import scssVariables from "@/styles/variables.module.scss"
const route = useRoute();
// 根据路由路径 对应  当前激活的菜单 页面刷新后 激活当前路由匹配的菜单
const activeMenu = computed(() => {
  return route.path;
})
const isCollapse = ref(0)
</script>