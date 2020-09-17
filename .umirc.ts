import { defineConfig } from 'umi';

export default defineConfig({
  links: [{ rel: 'icon', href: 'favicon.png' }],
  // layout: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    // 内容路由
    {
      path: '/',
      component: '@/layouts/index',
      exact: true,
      routes: [{ exact: true, path: '/', component: '@/pages/home/index' }],
    },

    // 登录，注册 路由
    {
      exact: false,
      path: '/user',
      component: '@/layouts/User',
      routes: [
        { path: '/user', redirect: '/user/login' },
        { exact: true, path: '/user/login', component: '@/pages/login/index' },
      ],
    },
  ],
});
