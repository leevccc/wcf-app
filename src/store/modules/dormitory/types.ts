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

export interface DormitoryRecord {
  id?: number;
  dormitoryId?: number;
  billDate?: string;
  date?: string;
  water?: number;
  electricity?: number;
}

export interface DormitoryOccupancy {
  id?: number;
  userId?: number;
  dormitoryId?: number;
  checkInDate?: string;
  checkOutDate?: string;
}

export interface DormitoryExpense {
  id?: number;
  billMonth?: string;
  dormitoryId?: number;
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

export interface DormitoryIndividualExpense {
  id?: number;
  billMonth?: string;
  dormitoryId?: number;
  userId?: number;
  checkInDate?: string;
  checkOutDate?: string;
  daysResided?: number;
  subsidy?: number;
  dormitoryCost?: number;
  dormitoryDue?: number;
  individualShare?: number;
}
