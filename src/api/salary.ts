import axios from 'axios';
import { SalaryConfigState } from '@/store/modules/salary/types';

export function getSalaryConfig() {
  return axios.get('/api/salary/config/index');
}

export function getUserSalaryConfig(userId: number) {
  return axios.get(`/api/salary/config/users/${userId}`);
}

export function postUserSalaryConfig(data: SalaryConfigState) {
  return axios.post('/api/salary/config', data);
}
