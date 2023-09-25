export interface ScrapState {
  id?: number;
  dateRecorded?: string;
  packageNumber?: number;
  weightKg?: number;
  totalPackage?: number;
  comments?: string;
  archive?: boolean;
  createTime?: string;
  updateTime?: string;
  children: ScrapState[];
}

export interface ScrapStatisticState {
  id?: number;
  startDate?: string;
  endDate?: string;
  totalWeightKg?: number;
  totalPackage?: number;
  packageWeight?: number;
  totalPackageWeight?: number;
  netWeightKg?: number;
  unitPrice?: number;
  totalPrice?: number;
  comments?: string;
}
