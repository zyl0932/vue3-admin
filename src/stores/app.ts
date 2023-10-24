import { defineStore } from "pinia"
export const useAppStore = defineStore("app", () => {
  // 状态
  const state = reactive({
    // sidebar 展开状态
    sidebar: {
      // sidebar 展开状态
      opened: true
    }
  })
  const sidebar = computed(() => state.sidebar)

  // actions
  const toggleSidebar = () => {
    state.sidebar.opened = !state.sidebar.opened;
  }
  return { sidebar, toggleSidebar}
})