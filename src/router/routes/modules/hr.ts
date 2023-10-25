import { AppRouteRecordRaw } from '@/router/routes/types';
import { DEFAULT_LAYOUT } from '@/router/routes/base';

const HR: AppRouteRecordRaw = {
  path: '/hr',
  name: '人力资源',
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    icon: 'icon-user',
    order: 2,
  },
  children: [
    {
      path: 'users',
      name: '用户管理',
      component: () => import('@/views/hr/user/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'salary',
      name: '工资管理',
      component: () => import('@/views/hr/salary/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'dormitory',
      name: '宿舍管理',
      component: () => import('@/views/hr/dormitory/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'department',
      name: '部门管理',
      component: () => import('@/views/hr/department/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'leave/record',
      name: '请假记录',
      component: () => import('@/views/hr/leave/record/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'loan/record',
      name: '借款管理',
      component: () => import('@/views/hr/loan/record/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default HR;
