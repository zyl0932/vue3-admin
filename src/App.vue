<template>
  <el-config-provider :size="size" :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useAppStore } from "./stores/app"
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
const store = useAppStore()
const { size } = storeToRefs(store)
</script>
