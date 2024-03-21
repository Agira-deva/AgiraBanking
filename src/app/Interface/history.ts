export interface Transaction {
  id: number;
  transactionType: string;
  accountNumber: string;
  amount: number;
  createdAt: Date;
  status: string;
}
