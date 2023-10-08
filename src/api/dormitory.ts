import axios from 'axios';
import {
  DormitoryExpenseState,
  DormitoryIndividualExpenseState,
  DormitoryOccupancyState,
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

export interface DormitoryOccupancyForm {
  id?: number;
  userId?: number;
  user?: string;
  dormitoryId?: number;
  dormitory?: string;
  checkInDate?: string;
  checkOutDate?: string;
}

export interface DormitoryExpenseGenerateForm {
  date?: string;
}
export function getDormitory() {
  return axios.get<DormitoryState[]>('/api/dormitories');
}
export function getDormitoryRecord() {
  return axios.get<DormitoryRecordState[]>('/api/dormitory/record');
}

export function getDormitoryOccupancy() {
  return axios.get<DormitoryOccupancyState[]>('/api/dormitory/occupancy');
}

export function getDormitoryExpense() {
  return axios.get<DormitoryExpenseState[]>('/api/dormitory/expense');
}

export function getDormitoryIndividualExpense() {
  return axios.get<DormitoryIndividualExpenseState[]>(
    '/api/dormitory/iExpense'
  );
}

export function postDormitory(data: DormitoryForm) {
  return axios.post('/api/dormitories', data);
}
export function postDormitoryRecord(data: DormitoryRecordForm) {
  return axios.post('/api/dormitory/record', data);
}

export function postDormitoryOccupancy(data: DormitoryOccupancyForm) {
  return axios.post('/api/dormitory/occupancy', data);
}

export function putDormitoryOccupancy(data: DormitoryOccupancyForm) {
  return axios.put(`/api/dormitory/occupancy/${data.id}`, data);
}

export function generateExpense(data: DormitoryExpenseGenerateForm) {
  return axios.post('/api/dormitory/expense/generate', data);
}
