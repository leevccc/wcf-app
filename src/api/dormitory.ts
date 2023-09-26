import axios from 'axios';
import {
  DormitoryRecordState,
  DormitoryState,
} from '@/store/modules/dormitory/types';

export function getDormitory() {
  return axios.get<DormitoryState[]>('/api/dormitory');
}
export function getDormitoryRecord() {
  return axios.get<DormitoryRecordState[]>('/api/dormitory/record');
}
