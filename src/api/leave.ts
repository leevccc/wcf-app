import axios from 'axios';
import { LeaveRecordState } from '@/store/modules/leave/types';

export interface LeaveRecordForm {
  id?: number;
  userId?: number;
  user?: string;
  startDate?: string;
  endDate?: string;
  reason?: string;
}
export function getLeaveRecord() {
  return axios.get<LeaveRecordState[]>('/api/leave/record');
}

export function postLeaveRecord(data: LeaveRecordState) {
  return axios.post(`/api/leave/record`, data);
}

export function putLeaveRecord(data: LeaveRecordState) {
  return axios.put(`/api/leave/record/${data.id}`, data);
}
