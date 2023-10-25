import { defineStore } from "pinia"
export const useAppStore = defineStore("app", () => {
  // 状态
  const state = reactive({
    sidebar: {
      // sidebar 展开状态
      opened: true
    }
  })
  const sidebar = computed(() => state.sidebar)

  // actions
  const toggleSidebar = () => {
    state.sidebar.opened = !state.sidebar.opened
  }
  return { state, sidebar, toggleSidebar }
},{
  persist: {
    storage: window.sessionStorage,
    paths: ["state.sidebar.opened"]
  }
})
