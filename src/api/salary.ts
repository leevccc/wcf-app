import axios from 'axios';

export function getSalaryConfig() {
  return axios.get('/api/salary/config/index');
}

export function getUserSalaryConfig(userId: number) {
  return axios.get(`/api/salary/config/users/${userId}`);
}
