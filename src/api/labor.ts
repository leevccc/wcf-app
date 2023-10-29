import axios from 'axios';
import { LaborCostState } from '@/store/modules/labor/cost/type';
import { LaborDataState } from '@/store/modules/labor/data/type';

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

export interface LaborDataForm {
  id?: number;
  orderId?: number;
  productId?: number;
  productName?: string;
  date?: string;
  laborCostId?: number;
  departmentId?: number;
  department?: string;
  action?: string;
  quantity?: number;
  frequency?: number;
  unitPrice?: number;
  amount?: number;
  notes?: string;
  userId?: number;
  producer?: string;
  cardGroup?: string;
  cardNumber?: string;
  archiveDate?: string;
}

export function getLaborData() {
  return axios.get<LaborDataState[]>('/api/labor/data');
}

export function putLaborData(data: LaborDataForm) {
  return axios.put<LaborDataState>(`/api/labor/data/${data.id}`, data);
}

export function getAllLaborData() {
  return axios.get<LaborDataState[]>('/api/labor/data/all');
}

export function exportLaborData() {
  return axios
    .get('/api/labor/data/export')
    .then((response) => {
      const url = `${import.meta.env.VITE_API_BASE_URL}${response.data}`;
      const link = document.createElement('a');
      link.href = url;
      link.download = 'example.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      // 处理下载失败的情况
      window.console.error('下载失败', error);
    });
}
