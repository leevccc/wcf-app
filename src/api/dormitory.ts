import axios from 'axios';
import {
  DormitoryRecordState,
  DormitoryState,
} from '@/store/modules/dormitory/types';

export interface DormitoryForm {
  roomNumber?: string;
  address?: string;
  waterPrice?: number;
  electricityPrice?: number;
  leaseStartDate?: string;
  leaseEndDate?: string;
}
export interface DormitoryRecordForm {
  dormitoryId?: number;
  date?: string;
  water?: number;
  electricity?: number;
}
export function getDormitory() {
  return axios.get<DormitoryState[]>('/api/dormitories');
}
export function getDormitoryRecord() {
  return axios.get<DormitoryRecordState[]>('/api/dormitory/record');
}

export function postDormitory(data: DormitoryForm) {
  return axios.post('/api/dormitories', data);
}
export function postDormitoryRecord(data: DormitoryRecordForm) {
  return axios.post('/api/dormitory/record', data);
}
