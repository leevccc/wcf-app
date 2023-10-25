export interface SalaryConfigIndexState {
  departmentId: number;
  department: string;
  userId: number;
  user: string;
  count: number;
}

export interface SalaryConfigState {
  insertMode?: boolean;
  id?: number;
  userId?: number;
  user?: string;
  name?: string;
  type?: string;
  cycle?: number;
  cycleUnit?: string;
  amount?: number;
  isDailyConversion?: boolean;
  isRealTime?: boolean;
  isEffective?: boolean;
  effectiveDate?: string;
  notes?: string;
}
