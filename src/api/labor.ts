import axios from 'axios';
import { LaborCostState } from '@/store/modules/labor/cost/type';

export interface LaborCostForm {
  departmentId?: number;
  action?: string;
  price?: number;
  comments?: string;
  effectiveDate?: string;
}
export function getLaborCost() {
  return axios.get<LaborCostState[]>('/api/labor/cost');
}

export function getEffectiveLaborCost() {
  return axios.get<LaborCostState[]>('/api/labor/cost/effective');
}

export function getOldLaborCost() {
  return axios.get<LaborCostState[]>('/api/labor/cost/old');
}

export function getFutureLaborCost() {
  return axios.get<LaborCostState[]>('/api/labor/cost/future');
}

export function postLaborCost(data: LaborCostForm) {
  return axios.post('/api/labor/cost', data);
}

export function deleteLaborCost(id: number) {
  return axios.delete(`/api/labor/cost/${id}`);
}
