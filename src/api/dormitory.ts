import axios from 'axios';
import {
  DormitoryRecordState,
  DormitoryState,
} from '@/store/modules/dormitory/types';

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

export function postDormitoryRecord(data: DormitoryRecordForm) {
  return axios.post('/api/dormitory/record', data);
}
