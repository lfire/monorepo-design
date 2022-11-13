import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, `${root}/env`);
  console.log('ENV:: ', command, mode, env);

  const BASE_MAP: { test: string; prod: string; dev: string } = {
    test: `${env.VITE_APP_BASE_URI}`,
    prod: `${env.VITE_APP_BASE_URI}`,
    dev: `${env.VITE_APP_BASE_URI}`,
  };

  const cdnUrl = mode ? BASE_MAP[mode] : './';
  // console.log('url:: ', cdnUrl, env, JSON.stringify(env), env.VITE_APP_BASE_URI);

  return {
    plugins: [
      // vue 支持
      vue(),
      // // JSX 支持
      // vueJsx(),
      // html
      createHtmlPlugin({
        minify: true,
        /**
         * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
         * @default src/main.ts
         */
        entry: 'src/main.ts',
        /**
         * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
         * @default index.html
         */
        template: 'index.html',

        /**
         * 需要注入 index.html ejs 模版的数据
         */
        inject: {
          data: {
            title: 'H5',
            injectScript: mode === 'dev' ? '' : '',
          },
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      devSourcemap: mode === 'dev',
    },
    envDir: './env',
    base: env.VITE_APP_BASE_URI, // './'
    experimental: {
      renderBuiltUrl: (filename: string) => {
        return `${cdnUrl}${filename}`;
      },
    },
    esbuild: {
      sourcemap: true,
    },
    build: {
      target: 'es2015',
      minify: mode !== 'dev' ? 'terser' : false, // false, // 'terser',
      // 构建后是否生成 source map 文件
      sourcemap: mode !== 'prod', // false,
      terserOptions:
        mode !== 'dev'
          ? {
              compress: {
                keep_infinity: true,
                drop_console: mode === 'prod',
              },
            }
          : undefined,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, '/index.html'),
        },
        output: {
          manualChunks: (id: string) => {
            // vendor
            if (/[\\/]node_modules[\\/]/.test(id)) {
              return 'vendor';
            }
            // 兜底
            return 'main';
          },
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
    },
    // 开发环境服务器的配置都在 server 配置项内
    server: {
      fs: {
        // 当启用有 workspace 时，对于 vite 来说，需要配置项目目录外的权限
        // allow: [searchForWorkspaceRoot(process.cwd())],
        allow: ['../../'],
      },
      // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
      // 默认为 'localhost'，即仅能本机访问
      host: '0.0.0.0',
      // 启动端口
      port: 8080,
      // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
      strictPort: false,
      // HMR 连接配置（用于 HMR websocket 必须使用不同的 http 服务器地址的情况，或者禁用 hmr 模块），一般省略
      hmr: true,
      // hmr: {
      //   host: '127.0.0.1',
      //   port: 8080,
      // },
      // 参数类型：boolean | string，配置启动时时候自动打开网页，是字符串时表示打开某个特定路径
      open: `${BASE_MAP[mode]}`, // true,
    },
  };
});
