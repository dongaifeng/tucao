import { defineConfig } from 'umi';

export default defineConfig({
  links: [{ rel: 'icon', href: 'favicon.png' }],

  // 配置前端服务项， 低于.env文件优先级
  // devServer: {
  //   port: 7777,
  // },

  mock: false,

  proxy: {
    '/api': {
      target: 'http://localhost:7000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    },
  },

  // layout: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    // 登录，注册 路由
    {
      exact: false,
      path: '/user',
      component: '@/layouts/User',
      routes: [
        { path: '/user', redirect: '/user/login' },
        { exact: true, path: '/user/login', component: './login/index' },
        { exact: true, path: '/user/register', component: './register/index' },
        { component: '404' },
      ],
    },

    // 内容路由
    {
      path: '/',
      component: '@/layouts/index',
      exact: false,
      routes: [
        { exact: true, path: '/', component: '@/pages/home/index' },
        { exact: true, path: '/setting', component: '@/pages/setting/index' },
        { exact: true, path: '/follow', component: '@/pages/follow/index' },
        { exact: true, path: '/collect', component: '@/pages/collect/index' },
        { exact: true, path: '/fans', component: '@/pages/fans/index' },
        { component: '404' },
      ],
    },
  ],
});
