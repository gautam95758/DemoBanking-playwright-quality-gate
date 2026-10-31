export interface LoginRequest {
  username: string;
  password: string;
}

export interface DemoUser {
  id: string;
  username: string;
  displayName: string;
}

export interface LoginResponse {
  token: string;
  user: DemoUser;
}

export interface ErrorResponse {
  error: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'Checking' | 'Savings';
  maskedNumber: string;
  currency: 'USD';
  balance: number;
  status: 'Active';
}

export interface AccountsResponse {
  accounts: Account[];
}

export interface AccountResponse {
  account: Account;
}

export interface Transaction {
  id: string;
  description: string;
  date: string;
  type: 'Credit' | 'Debit';
  amount: number;
  status: 'Completed';
  accountId: string;
}

export interface TransactionsResponse {
  transactions: Transaction[];
}

export interface HealthResponse {
  status: 'ok';
  service: 'northstar-demo-banking';
}