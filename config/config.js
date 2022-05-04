import { defineConfig } from 'umi';

const publicPath = '/';
export default defineConfig({
  title: '3.0 模版',
  mfsu: {},
  ignoreMomentLocale: true,
  hash: true,
  externals: {
    config: 'window.CONFIG',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  headScripts: [{ src: `${publicPath}config.js` }],
  dynamicImport: {
    loading: '@/components/Loading',
  },
  lessLoader: {
    modifyVars: {
      hack: 'true; @import "~@/styles/modifyVars.less";',
    },
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: false,
  },
  targets: {
    android: 5,
    ios: 7,
    chrome: 58,
    ie: 11,
  },
  antd: {},

  // 配置非根目录部署
  // base: publicPath
  // publicPath,
  // exportStatic: { dynamicRoot: true },
});
