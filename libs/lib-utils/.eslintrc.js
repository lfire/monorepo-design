module.exports = {
  root: true,
  extends: ['@pnpm/eslint-config-monorepo/ts'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};
