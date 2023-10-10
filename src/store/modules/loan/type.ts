export interface LoanRecordState {
  id?: number;
  userId?: number;
  user?: string;
  amount?: number;
  purpose?: string;
  paymentDate?: string;
  paymentMethod?: string;
  isProcessed?: boolean;
  notes?: string;
}
