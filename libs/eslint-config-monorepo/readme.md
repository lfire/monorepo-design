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

支持 Vue：
> 当前支持 Vue3.x，如若要支持 Vue2.x，请安装 `@yarn/eslint-config-monorepo@1`。
```js
module.exports = {
  root: true,
  extends: ['@yarn/eslint-config-monorepo/vue'],
};
```

支持 Vue TS版：
```js
module.exports = {
  root: true,
  extends: ['@yarn/eslint-config-monorepo/vue-ts'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};
```

支持 React：
```js
module.exports = {
  root: true,
  extends: ['@yarn/eslint-config-monorepo/react'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};
```

支持 React TS版：
```js
module.exports = {
  root: true,
  extends: ['@yarn/eslint-config-monorepo/react-ts'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};
```
