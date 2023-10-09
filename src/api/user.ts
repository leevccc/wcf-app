import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}

export interface UserForm {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  name?: string;
  avatar?: string;
  gender?: string;
  address?: string;
  idNumber?: string;
  hireDate?: string;
  resignationDate?: string;
}

export interface UserDepartmentForm {
  userId?: number;
  user?: string;
  departmentId?: number;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/auth/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/auth/logout');
}

export function getUserInfo() {
  return axios.get<UserState>('/api/users/me');
}

export function getUserList() {
  return axios.get<UserState[]>('/api/users');
}

export function getMenuList() {
  return axios.get<RouteRecordNormalized[]>('/api/user/menu');
}

export function postUser(data: UserForm) {
  return axios.post('/api/auth/register', data);
}

export function putUser(data: UserForm) {
  return axios.put(`/api/users/${data.id}`, data);
}

export function updateDepartment(data: UserDepartmentForm) {
  return axios.put(`api/users/${data.userId}/department`, data);
}
