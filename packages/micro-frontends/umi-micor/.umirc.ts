import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  // qiankun: {
  //   slave: {},
  // },
  devServer: {
    port: 20000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  },
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    // 设置 alias
    memo.output.library('umiApp').libraryTarget('umd')
  },
});
