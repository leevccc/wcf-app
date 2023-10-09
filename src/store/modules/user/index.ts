import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
  LoginData,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { RoleState, UserState } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: undefined,
    username: undefined,
    email: undefined,
    name: undefined,
    avatar: undefined,
    gender: undefined,
    address: undefined,
    idNumber: undefined,
    hireDate: undefined,
    resignationDate: undefined,
    departmentId: undefined,
    department: undefined,
    role: '',
    roles: [],
    createTime: undefined,
    updateTime: undefined,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
      this.role = 'user';
      if (this.isAdmin()) this.role = 'admin';
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    isAdmin() {
      if (this.role === 'admin') return true;
      if (this.roles) {
        const isAdmin = this.roles.some(
          (role: RoleState) => role.name === 'ROLE_ADMIN'
        );
        if (isAdmin) return true;
      }
      return false;
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();

      this.setInfo(res.data);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
