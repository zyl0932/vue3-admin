# 4.SvgIcon 组件开发

> 自定义 svg 图标,封装成 icon 组件向 element-ui icon 组件似得，通过图标名称来使用图标,也可以自定义类名控制

```vue
<svg-icon icon-class="password" class-name="custom-class" @click="fn">
</svg-icon>
// 支持使用外链的形式引入svg,例如
<svg-icon icon-class="https:/xxxx.svg" />
```

## 4-1 什么是 Svg Sprite

将多个 svg 打包成 svg-sprite。svg 雪碧图。类似于 CSS 中的 Sprite 技术。图标图形整合在一起，实际呈现的时候准确显示特定图标
<br>

阅读资料
<br>

[张鑫旭文章](https://www.zhangxinxu.com/wordpress/2014/07/introduce-svg-sprite-technology/)

[SvgIcon 工作原理-推荐阅读](https://segmentfault.com/a/1190000015367490)

[SVG Sprite 技术介绍](https://blog.csdn.net/happyqyt/article/details/88369891)

## 4-2 准备 svg 文件

根目录下创建 src/icons 目录将 svg 图标文件放到@/icons/svg 文件下面,[svg 文件压缩包](https://static.zhufengpeixun.com/svg_1646126485370.zip)

## 4-3 配置 vite-plugin-svg-icons

> 用来根据导入的 svg 文件自动生成 symbol 标签并插入 html,生成 svg 雪碧图

- 修改 vite.config.ts 配置文件

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  plugins: [
    vue(),
    createSvgIconPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")], // icon存放的目录
      symbolId: "icon-[name]", // symbol的id
      inject: "body-last",
      customDomId: "__svg__icons__dom__", // svg的id
    }),
  ],
});
```

- 在`src/main.ts`内引入注册脚本

```ts
import "virtual:svg-icons-register";
```

svg 雪碧图已经生成

## 4-4 开发 svg icon 组件

### `src/components`下创建 SvgIcon/index.vue

```vue
<template>
  <!-- 如果iconClass是带协议的图标连接 则通过style属性方式渲染-->
  <div
    class="svg-icon svg-external-icon"
    v-if="isExt"
    :style="styleExternalIcon"
    v-bind="$attrs"
  >
  <!-- SVG icon 通过名称使用 -->
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <!--
        SVG的use元素可以调用其他SVG文件的元素,<use xlink:href="#symbolId"></use>
    -->
    <use :xlink:href="iconName" />
  </svg>
</template>
<script setup lang="ts">
import { isExternal } from "@/utils/validate"
import { computed } from "vue"
const props = defineProps<{ iconClass: string; className?: string}>()
// 是否是带协议的图片链接
const isExt = computed(() => isExternal(props.iconClass || ""))
// 拼接成symbolId 在loader配置中指定了symbolId格式 icon-图标名称
const iconName = computed(() => `#icon-${props.iconClass}`);
// 添加类名 props.className外部传入自定义类名
const svgClass = computed(() =>
  props.className ? `svg-icon ${props.className}` : "svg-icon"
);
// 如果iconClass是带协议的图标链接 则通过style css属性方式渲染
const styleExternalIcon = computed(() => ({
  mask: `url(${props.iconClass}) no-repeat 50% 50%`,
  "-webkit-mask": `url(${props.iconClass}) no-repeat 50% 50%`
}));
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: - 0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
```

> vue3.0 $listeners 已经移除,默认会将事件绑定到根元素上

### `@/utils/validate.ts`工具方法

#### 创建`src/utils/validate.ts`

## 4-5 全局注册

### 创建文件 src/icons/index.ts 全局注册 svgicon 组件入口

```ts
import { App } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

export default (app: App) => {
  // 全局注册svg-icon组件
  app.component("svg-icon", SvgIcon);
};
```

## 4-6main.ts 通过 use 安装 icon 组件

### `main.ts` 导入 `src/icons/index.ts` 并 `use` 安装

```ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "normalize.css/normalize.css";
import "@/style/index.scss";
// 引入icon插件
import initSvgIcon from "@/icons/index";
import "virtual:svg-icons-register";
const app = createApp(app);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);
// 使用icon组件
app.use(initSvgIcon);
app.mount("#app");
```

## 4-7 简单引用下

在`views/dashboard/index.vue`试用下

```vue
<template>
  <div>
    <h1>Dashboard</h1>
    <svg-icon icon-class="bug"></svg-icon>
    <!-- icon-class svg图标名称 class-name 额外的自定义类名 @click绑定事件 -->
    <svg-icon
      icon-class="404"
      class-name="custom-class"
      @click="sayHi"
    ></svg-icon>
  </div>
</template>
<script setup lang="ts">
const sayHi = () => {
  alert("hi svgs");
};
</script>
<style lang="scss">
.custom-class {
  // 自定义样式
  font-size: 200px;
  color: green;
}
</style>
```

`icon-class`分别是我们`svg/icons/svg`里面的图标的名称

## 4-8Svg 优化

> svgo 是 svg 压缩处理工具。我们根据网上下载或者 Sketch 导出的 svg 会有很多冗余无用的信息,大大增加了 svg 的尺寸,我们可以使用 svgo 对它进行优化

```shell
pnpm install svgo -D
```

我们在创建`src/icons/svgo.config.js`配置文件

```js
module.exports = {
  plugins: [
    "preset-default": // 默认插件配置
    {
      name: "removeAttrs",
      params: {
        attrs: "(fill|stroke)"
      }
    }
  ]
}
```

`package.json`添加`npm scripts`

```json
{
  ...
  "scripts": {
    ...
    "svgo": "svgo -f src/icons/svg --config=src/icon/svgo.config.js"
  }
}
```

运行 `npm run svgo` 压缩优化
