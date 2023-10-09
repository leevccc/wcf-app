import axios from 'axios';
import { DepartmentState } from '@/store/modules/department/type';

export interface DepartmentForm {
  id?: number;
  name?: string;
}
export function getDepartment() {
  return axios.get<DepartmentState[]>('/api/departments');
}

export function postDepartment(data: DepartmentForm) {
  return axios.post('/api/departments', data);
}

export function putDepartment(data: DepartmentForm) {
  return axios.put(`/api/departments/${data.id}`, data);
}
