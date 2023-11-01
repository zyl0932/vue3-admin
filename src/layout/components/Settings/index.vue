<template>
  <div class="drawer-container">
    <div class="drawer-item">
      <span>主题色</span>
      <theme-picker />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .drawer-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>