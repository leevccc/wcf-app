import axios from 'axios';
import { LoanRecordState } from '@/store/modules/loan/type';

export interface LoanRecordForm {
  id?: number;
  userId?: number;
  user?: string;
  amount?: number;
  purpose?: string;
  paymentDate?: string;
  paymentMethod?: string;
  paid?: boolean;
  posted?: boolean;
  notes?: string;
}

export function getLoanRecord() {
  return axios.get<LoanRecordState[]>('/api/loan/record');
}

export function postLoanRecord(data: LoanRecordForm) {
  return axios.post('/api/loan/record', data);
}

export function setPaid(id: number) {
  return axios.put(`/api/loan/record/${id}`, { paid: true });
}

export function putLoanRecord(data: LoanRecordForm) {
  return axios.put(`/api/loan/record/${data.id}`, data);
}

export function deleteLoadRecord(id: number) {
  return axios.delete(`/api/loan/record/${id}`);
}
