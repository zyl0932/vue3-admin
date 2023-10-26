import { defineStore } from "pinia"
import { RouteLocationNormalizedLoaded } from "vue-router"
export const useTagsView = defineStore("tag", () => {
  const visitedViews = ref<RouteLocationNormalizedLoaded[]>([])
  // 添加视图
  const addView = (view: RouteLocationNormalizedLoaded) => {
    // 去重
    if (visitedViews.value.some((v) => v.path === view.path)) return
    // 没有title的处理
    visitedViews.value.push(
      Object.assign({}, view, {
        title: view.meta?.title || "tag-name"
      })
    )
  }
  // 删除视图
  const delView = (view: RouteLocationNormalizedLoaded) => {
    const i = visitedViews.value.indexOf(view)
    if (i > 1) {
      visitedViews.value.splice(i, 1)
    }
  }
  return { visitedViews, addView, delView }
})
