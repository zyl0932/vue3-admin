module.exports = {
    "env": {
        // 环境，针对哪些环境的语法
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        // 集成了哪些规则，别人写好的规则直接拿来用
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended", // typescript 规则
        "plugin:vue/vue3-essential",
        "@vue/prettier"
    ],
    "overrides": [],
    "parser": "vue-eslint-parser", // 解析.vue文件
    "parserOptions": {
        "parser": "@typescript-eslint/parser", // 解析.ts文件
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    "rules": {
        // 我们自定义的规则写在这里
        "vue/multi-word-component-names": "off",
        "prettier/prettier": [
            "error",
            {
                singleQuote: false, // 使用单引号
                semi: false, // 末尾添加分号
                tabWidth: 2,
                trailingComma: "none",
                useTabs: false,
                endOfLine: "auto"
            }
        ]
    }
}
