import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
// 初始化css，重置css默认样式
import "normalize.css/normalize.css"
// 全局css
import "@/styles/index.scss"
// 引入icon插件
import initSvgIcon from "@/icons/index"
import "virtual:svg-icons-register"

// 注册element-plus
import installElementPlus from "./plugins/element"
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(installElementPlus)
// 使用icon组件
app.use(initSvgIcon)
app.mount("#app")
