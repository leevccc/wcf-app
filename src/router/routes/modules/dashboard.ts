import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: '仪表盘',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        locale: 'menu.dashboard.workplace',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'scrap',
      name: '废料数据',
      component: () => import('@/views/dashboard/scrap/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'dormitory',
      name: '宿舍管理',
      component: () => import('@/views/dashboard/dormitory/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'user',
      name: '用户管理',
      component: () => import('@/views/dashboard/user/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'leave/record',
      name: '请假记录',
      component: () => import('@/views/dashboard/leave/record/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'department',
      name: '部门管理',
      component: () => import('@/views/dashboard/department/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
