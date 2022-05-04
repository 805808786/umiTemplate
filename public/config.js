// 开发环境
const development = {
  BASE_URL: 'https://control.gongshu.gov.cn/centerapi',
};

// 生产环境
const production = {
  BASE_URL: 'https://control.gongshu.gov.cn/centerapi',
};

window.CONFIG = ['172.16.8.7', 'localhost', '127.0.0.1'].includes(window.location.hostname)
  ? development
  : production;
