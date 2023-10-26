import { App } from "vue"
import { ElMessage, ElNotification, ElMessageBox } from "element-plus"

// 默认自动导入组件插件，只会解析在模板中使用的组件，所以这里需要导入样式
// 这里的样式也可以做到按需导入
// import "element-plus/theme-thalk/el-message.css"
// import "element-plus/theme-thalk/el-notifacation.css"
// import "element-plus/theme-thalk/el-message-box.css"
export default (app: App): void => {
  // 按需导入组件列表
  // Vue.prototype替换为config.globalProperties
  // 文档说明 https://v3.cn.vuejs.org/guide/migration/global-api.html#vue-prototype=%E6%9B%BF%E6%8D%A2%E4%B8%BA-config-globalproperties
  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$notify = ElNotification
  app.config.globalProperties.$confirm = ElMessageBox.confirm
  app.config.globalProperties.$alert = ElMessageBox.alert
  app.config.globalProperties.$prompt = ElMessageBox.prompt
}
export type Size = "default" | "large" | "small"
