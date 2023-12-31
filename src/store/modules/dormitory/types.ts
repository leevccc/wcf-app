export interface DormitoryState {
  id?: number;
  roomNumber?: string;
  address?: string;
  waterPrice?: number;
  electricityPrice?: number;
  leaseStartDate?: string;
  leaseEndDate?: string;
  deleted?: boolean;
}

export interface DormitoryOptions {
  id: number;
  name: string;
}

export interface DormitoryRecordState {
  id?: number;
  dormitoryId?: number;
  dormitory?: string;
  billDate?: string;
  date?: string;
  water?: number;
  electricity?: number;
}

export interface DormitoryOccupancyState {
  id?: number;
  userId?: number;
  user?: string;
  dormitoryId?: number;
  dormitory?: string;
  checkInDate?: string;
  checkOutDate?: string;
}

export interface DormitoryExpenseState {
  id?: number;
  billMonth?: string;
  dormitoryId?: number;
  address?: string;
  roomNumber?: string;
  occupants?: number;
  lastMonthWaterReading?: number;
  currentMonthWaterReading?: number;
  waterUsage?: number;
  waterPrice?: number;
  waterCost?: number;
  lastMonthElectricityReading?: number;
  currentMonthElectricityReading?: number;
  electricityUsage?: number;
  electricityPrice?: number;
  electricityCost?: number;
  totalCost?: number;
}

export interface DormitoryIndividualExpenseState {
  id?: number;
  billMonth?: string;
  dormitoryId?: number;
  address?: string;
  roomNumber?: string;
  userId?: number;
  user?: string;
  checkInDate?: string;
  checkOutDate?: string;
  daysResided?: number;
  subsidy?: number;
  dormitoryCost?: number;
  dormitoryDue?: number;
  individualShare?: number;
}
