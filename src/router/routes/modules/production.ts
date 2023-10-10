import { AppRouteRecordRaw } from '@/router/routes/types';
import { DEFAULT_LAYOUT } from '@/router/routes/base';

const PRODUCTION: AppRouteRecordRaw = {
  path: '/production',
  name: '生产管理',
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    icon: 'icon-relation',
    order: 1,
  },
  children: [
    {
      path: 'scrap',
      name: '废料数据',
      component: () => import('@/views/production/scrap/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'labor/cost',
      name: '计件价格',
      component: () => import('@/views/production/labor/cost/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'labor/data',
      name: '计件数据',
      component: () => import('@/views/production/labor/data/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default PRODUCTION;
