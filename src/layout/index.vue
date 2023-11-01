<template>
  <div class="app-wrapper">
    <div class="sidebar-container"><sidebar></sidebar></div>
    <div class="main-container">
      <div class="header">
        <navbar @showSetting="openSetting"></navbar>
        <tags-view></tags-view>
      </div>
        <app-main />
    </div>
    <!-- right-panel -->
    <right-panel
      v-model="showSetting"
      title="样式风格设置"
      :size="settingsPanelWidth"
    >
      <!-- settings 面板设置组件，稍后实现 -->
      <settings />
    </right-panel>
  </div>
</template>
<script lang="ts" setup>
import variables from "@/styles/variables.module.scss"
const showSetting = ref(false)
const openSetting = () => {
  // 控制right-panel弹出
  showSetting.value = true;
}
const settingsPanelWidth = computed(() => variables.settingPanelWidth)
</script>
<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .header {
      background: cyan;
      .navbar {
        height: 50px;
        background: #1890ff;
      }
      .tags-view {
        height: 34px;
        background: #123fff;
      }
    }
    .app-main {
      /* main = 100% - navbar + tagsview */
      min-height: calc(100vh - 84px);
      background: red;
    }
  }
}
</style>
