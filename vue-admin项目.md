# vue3-admin

## 1.Vite 项目初始搭建

> 该项目主要使用 vue3 技术栈+typescript

### 1.1 项目初始化

#### 项目准备

##### 版本:

> Vite 需要 Node.js 版本 14.8+,16+。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。

##### 参考网站

[Vite 官网](https://vitejs.cn/)
[TypeScript 官网](https://www.tslang.cn/)
[Vue3 官网](https://cn.vuejs.org/)

##### 创建项目

```sh
# npm 6.x
npm create vite@latest my-vue-app --template vue
# npm 7.x
npm create vite@latest my-vue-app -- --template vue
# yarn
yarn create vite my-vue-app --template vue
# pnpm
pnpm create vite my-vue-app --template vue
```

查看[create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite)以获取每个模板的更多细节:vanilla，vanilla-ts，vue，vue-ts，react，react-ts，preact，preact，preact-ts，lit，lit-ts，svelte，svelte-ts。

> 执行命令前请自行安装 npm、yarn 或 pnpm 等工具
> [https://yarnpkg.com/getting-started/install](https://yarnpkg.com/getting-started/install) > <br> [https://pnpm.io/installation](https://pnpm.io/installation)

##### 这里我们的项目主要采用 pnpm

- 使用 vite 模板预设快速创建 vue3+ts 项目

## 2.vue3+typescript 项目搭建流程

> 在上一节中，我们通过 vite3 快速初始化 vue3+ts 项目，我们还需要为项目增加一些自己的配置

### 2.1Eslint 配置

> 开发项目时需要安装 vscode 插件 Volar，并且需要关闭 Vue2 的插件 Vetur

#### 初始化 eslint

```sh
npx eslint --init # eslint初始化
# 校验语法并提示错误行数
? How would you like to use ESLint? ...
 To check syntax only
> To check syntax and find problems
 To check syntax, find problems, and enforce code style
# 采用js-module
? What type of modules does your project use? ...
> JavaScript modules (import/export)
 CommonJS (require/exports)
 None of these
# 采用vue语法
? Which framework does your project use? ...
 React
> Vue.js
 None of these
# 项目使用ts -- 选择Yes
? Does your project use TypeScript? » No / Yes
# 项目运行环境 -- 浏览器、node都勾选
# > 为什么勾选node环境? 因为后面写单元测试肯定是运行在node环境中的
? Where does your code run? ... (Press <space> to select, <a> to toggle
all, <i> to invert selection)
√ Browser
√ Node
# 配置文件采用js -- js可以写一些注释更方便，也可以选择yml
? What format do you want your config file to be in? ...
> JavaScript
 YAML
 JSON
# 拒绝默认安装 -- 选择YES。 安装采用的pnpm的方式
√ Would you like to install them now? · No / Yes
? Which package manager do you want to use? …
npm
 yarn
❯ pnpm
```

- .eslint.cjs 文件说明

```javascript
module.exports = {
    env: {
        // 环境,针对哪些环境
        browser: true;
        es2021: true;
        node: true;
    },
    extends: {
        // 继承了哪些规则，别人写好的规则直接拿来用
        "eslint: recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended" // typescript 规则
    },
    override: [],
    // "parser": "@typescript-eslint/parser",
    parser: "vue-eslint-parser", // 解析.vue文件
    parserOptions: {
        parser: "@typescript-eslint/parser", // 解析.ts文件
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["vue", "@typescript-eslint"],
    rules: {
        // 我们自定义的规则写在这里
    }
}
```

#### .eslintignore

```
node_module
dist
*.css
*.jpg
*.jpeg
*.png
*.gif
*.d.ts
```

#### vscode 安装 eslint 插件

> 最后，在 vscode 中安装 eslint 插件:eslint 只是检测代码规范
> 在 packge.json 中添加脚本

```json
"lint":"eslint --fix --ext .ts,.tsx,.vue src --quiet"
```

### 2.2Prettier 配置

#### 在 eslint 中进行配置

> eslint 中集成 prettier 配置

```sh
pnpm install prettier eslint-plugin-prettier @vue/eslint-config-prettier -D
```

在.eslintrc 中增添 prettier 配置

```javascript
module.exports = {
  env: {
    // 幻境，针对哪些幻境的语法
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // 集成了哪些规则，别人写好的规则直接拿来用
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended", // typescript规则
    "@vue/prettier",
  ],
  override: [],
  // "parser": "@typescript-eslint/parser" // 解析.ts文件
  parser: "vue-eslint-parser", // 解析.vue文件
  parserOptions: {
    parser: "@typescript-eslint/parser", //解析.ts文件
    ecmaVersion: "latest", // es最新版本
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    // 我们自定义的规则
    "prettier/prettier": [
      "error",
      {
        singleQuote: false, // 使用单引号
        semi: false, // 末尾添加分号
        tabWidth: 2,
        trailingComma: "none",
        useTabs: false,
        endOfLine: "auto",
      },
    ],
  },
};
```

#### 在 vscode 中安装 Prettier 插件

> Prettier 只是用来格式化代码。这里需要配置.prettier.js 文件，此文件为了让 Prettier 插件能够识别用户配置，配置需与 eslintrc.js 中保持一致

```javascript
module.exports = {
  singleQuote: false, // true是允许使用单引号,false是不允许使用单引号
  semi: false, // 末尾添加分号
  tabWidth: 2,
  trailingComma: "none",
  useTabs: false,
  endOfLine: "auto",
};
```

- 安装 Prettier 插件，设置 Default Formatter 选择 Prettier-Code formatter;并配置 Format On Save 为启用，保存时自动格式化

#### EditorConfig for VS code

> 安装 Editor for VS Code 插件，新建.editorconfig 文件

```javascript
root = true


[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
```

> 小结:仅两节是巍峨了保证项目代码风格统一。其中 eslint 负责校验代码，prettier 负责统一代码风格，editorconfig 保证编辑器基本设置一致

### 2.3husky

> 实际项目中，代码格式化一般是配置 git hook 使用;实现提交代码前，先进性校验

```sh
git init # git残酷初始化
npm pkg set scripts.prepare "husky install" # 设置prepare命令脚本
pnpm prepare # 执行prepare命令
npx husky add .husky/pre-commit "pnpm lint" #添加提交钩子
```

### 2-4commitlint

> 规范代码提交信息

|   类型   |                                                 描述                                                 |
| :------: | :--------------------------------------------------------------------------------------------------: |
|  build   |                主要目的是修改项目构建系统(例如 gulp，webpack，rollup 的配置等)的提交                 |
|  chore   | 不属于以上类型的其他类型 ci 主要目的是项目继续集成流程(例如 Travis，Jenkins，GitLabCI，Circle)的提交 |
|   docs   |                                               文档更新                                               |
|   feat   |                                            新功能、新特性                                            |
|   fix    |                                               修改 bug                                               |
|   perf   |                                         更改代码，以提高性能                                         |
| refactor |                        代码重构(重构，在不影响代码内部行为、功能下的代码修改)                        |
|  revert  |                                            回复上一次提交                                            |
|  style   |        不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码鲁逻辑)        |
|   test   |                                          测试用例新增、修改                                          |

- 安装依赖库

```sh
pnpm install @commitlint/cli @commitlint/config-conventional -D
```

- 添加钩子

```sh
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit
`echo "\$1"`'
```

- commitlint 配置
  增添 commitlint.config.js 配置文件

```javascript
module.exports = {
  extends: ["@commitlint/config-conventional"],
};
```

> 测试一下:git commit -m"feat:初始化项目"，如果发生`Error[ERR_REQUIRE_ESM]: require() of ES Module`错误，需要删除`package.json`中的`type="module"`

### 2-5 集成 vue-router

- 安装 vue-router
  - pnpm install vue-router
- 在 src 目录下创建 views 目录，添加 About.vue、Home.vue
  关闭组件命名警告

```javascript
rules: [
  // 我们自定义的规则写在这里
  "vue/multi-world-component-names": "off",
  "prettier/prettier": [
    ...
  ]
];
```

- 在 src 目录下创建 router 路由目录，添加 index.ts

```javascript
import { createRouter, createWebHistory } from "vue-router";
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/about",
      component: () => import("../views/About.vue"),
    },
  ],
});
```

- 在 mian.ts 中引入 router

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
createApp(App).use(router).mount("#app");
```

- 最后在 App.vue 中使用路由

```javascript
<router-link to="/home">首页</router-link>
<router-link to="/about">关于</router-link>
<router-view></router-view>
```

### 2-6 设置 vite 路径别名

在`vite.config.ts`中添加别名配置

```javascript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  plugin: [vue()],
});
```

> 这里如果报 path 模块错误可以`pnpm install @types/node -D 增加类型提示
> 并在 tsconfig.json 中添加映射路径

```json
{
    "compileOptions": {
        ...
        "baseUrl": ".",
        "paths": {
            "@/*:": ["src/*"]
        }
    }
}
```

### 2.7 集成 Pinia

> [https://pinia.vuejs.org/](https://pinia.vuejs.org/)

- 安装 pinia
  - pnpm install pinia
- 在 src 目录下新建 stores 目录，并添加`counter.ts`文件，添加以下内容

```javascript
import { defineStore } from "pinia";
import { ref } from "vue";
export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const increment = () => {
    count.value++;
  };
  return { counter, increment };
});
```

- 在 src 中新建`components/Counter/index.vue`组件

```vue
<template>
  <div>
    <button @click="handleClick">计数器</button>
    <span>{{ counter.count }}</span>
  </div>
</template>
<script lang="ts" setup>
import { useCounterStore } from "@/store/counter";
const counter = useCounterStore();
const handleClick = () => {
  counter.increment();
};
</script>
```

- 在 App.vue 中引入 Counter 组件

```vue
<template>
  <router-link to="/home">首页</router-link>
  <router-link to="/about">关于页面</router-link>
  <router-view></router-view>
  <Counter></Counter>
</template>
<script lang="ts" setup>
import Counter from "@/components/Counter/index.vue
</script>
```

- 最后，在 main.ts 中使用 pinia

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
createApp(App).use(router).use(createPinia()).mount("#app");
```

### 2-8 集成 ElementPlus

> [https://element-plus.gitee.io/zh-CN/](https://element-plus.gitee.io/zh-CN/)

- 安装 element-plus
  - pnpm install element-plus

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(createPinia());
app.mount("#app");
```

- Volar 支持
  在`tsconfig.json`中通过`compilerOptions.type`指定全局组件类型

```javascript
{
    "compilerOptions": {
        // ...
        "types": ["element-plus/global"]
    }
}
```
