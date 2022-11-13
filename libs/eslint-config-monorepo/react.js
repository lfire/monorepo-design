module.exports = {
  extends: [
    './lib/prettier.js',
    // "prettier/vue", // 禁用插件中与 Prettier 冲突的规则
    'alloy',
    'alloy/react',
  ],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    //
    // myGlobal: false
  },
  rules: {
    // 自定义你的规则
  },
  // // 以当前目录为根目录，不再向上查找 .eslintrc.js
  // root: true,
};
