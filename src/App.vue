<template>
  <el-config-provider :size="size" :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useAppStore } from "./stores/app"
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import { useGenerateTheme } from "@/hooks/useGenerateTheme"
const store = useAppStore()
const { size } = storeToRefs(store)
useGenerateTheme()
</script>
