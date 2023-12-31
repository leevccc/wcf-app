import axios from 'axios';
import { ScrapState } from '@/store/modules/scrap/types';
import qs from 'query-string';

export interface ScrapForm {
  archive: boolean;
}
export interface ArchiveForm {
  from: string;
  end: string;
  packageWeight: number;
  unitPrice: number;
}

export interface ScrapWeekRecordForm {
  from?: string;
  end?: string;
}

export function getScrap(params: ScrapForm) {
  return axios.get<ScrapState[]>(`/api/scrap`, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function archiveScrap(data: ArchiveForm) {
  return axios.post('/api/scrap/archive', data);
}

export function getScrapStatistics() {
  return axios.get('/api/scrap/statistics');
}

export function getScrapWeekRecord(data: ScrapWeekRecordForm) {
  return axios.get(
    `/api/scrap/sum/byRecorded?from=${data.from}&end=${data.end}`
  );
}
