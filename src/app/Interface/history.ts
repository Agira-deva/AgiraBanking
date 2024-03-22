export interface Transaction {
[x: string]: any;
  id: number;
  transactionType: string;
  accountNumber: string;
  amount: number;
  createdAt: Date;
  status: string;
}
