import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
  watch: {
    exclude: 'node_modules/**',
  },
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      sourcemap: true,
      format: 'cjs',
    },
    {
      file: 'dist/index.esm.js',
      sourcemap: true,
      format: 'esm',
    },
  ],
  plugins: [
    // 打包插件
    nodePolyfills(), // node polyfills 需要放在前面
    resolve(), // 查找和打包node_modules中的第三方模块
    commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    replace({
      preventAssignment: true,
      include: '**/node_modules/store/plugins/lib/json2.js',
      values: {
        eval: '[eval][0]', // 解决rollup打包eval警告
        // 'eval(': (v) => {
        //   console.log(v);
        //   return '[eval][0](';
        // },
      },
    }),
    typescript(), // 解析TypeScript
    babel({ babelHelpers: 'bundled' }), // babel配置,编译es6
    // 压缩代码
    // terser(),
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    }),
  ],
};
