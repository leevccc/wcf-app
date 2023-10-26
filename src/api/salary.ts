import axios from 'axios';
import {
  SalaryConfigIndexState,
  SalaryConfigState,
  SalarySummaryState,
} from '@/store/modules/salary/types';
import { isEmptyString } from '@/utils/string';

export interface SalaryGenerateForm {
  billDate?: string;
  laborDays?: number;
}

export function getSalaryConfig() {
  return axios.get<SalaryConfigIndexState[]>('/api/salary/config/index');
}

export function getUserSalaryConfig(userId: number) {
  return axios.get<SalaryConfigState[]>(`/api/salary/config/users/${userId}`);
}

export function postUserSalaryConfig(data: SalaryConfigState) {
  return axios.post('/api/salary/config', data);
}

export function putUserSalaryConfig(data: SalaryConfigState) {
  return axios.put(`/api/salary/config/${data.id}`, data);
}

export function autoGenerate(data: SalaryGenerateForm) {
  return axios.post('/api/salary/generate', data);
}

export function getSalarySummary(billDate?: string, name?: string) {
  let url = '/api/salary/summary';
  if (!isEmptyString(billDate) && !isEmptyString(name)) {
    url += `?billDate=${billDate}&name=${name}`;
  } else if (!isEmptyString(billDate)) {
    url += `?billDate=${billDate}`;
  } else if (!isEmptyString(name)) {
    url += `?name=${name}`;
  }
  return axios.get<SalarySummaryState[]>(url);
}
