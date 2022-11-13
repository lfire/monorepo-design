```bash
npm i -D @yarn/eslint-config-monorepo
```

依赖于 eslint-config-alloy

配置：.eslintrc.js
```js
module.exports = {
  root: true,
  extends: ['@yarn/eslint-config-monorepo'],
};
```
默认 JS 项目配置

支持 TS：
```js
module.exports = {
  root: true,
  extends: ['@yarn/eslint-config-monorepo/ts'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};
```

支持 Vue2.x：
> 当前不支持 Vue3.x
```js
module.exports = {
  root: true,
  extends: ['@yarn/eslint-config-monorepo/vue'],
};
```
