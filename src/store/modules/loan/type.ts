export interface LoanRecordState {
  id?: number;
  userId?: number;
  user?: string;
  amount?: number;
  purpose?: string;
  paymentDate?: string;
  paymentMethod?: string;
  paid?: boolean;
  posted?: boolean;
  creatorId?: number;
  creator?: string;
  notes?: string;
  createTime?: string;
  updateTime?: string;
}
