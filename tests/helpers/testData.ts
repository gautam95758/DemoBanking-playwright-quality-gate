import users from '../../test-data/users.json';
import accounts from '../../test-data/accounts.json';
import transactions from '../../test-data/transactions.json';
import type { Account, Transaction } from '../types/api.types';

export const validUser = users.valid;
export const invalidUser = users.invalid;
export const expectedAccounts = accounts as Account[];
export const expectedTransactions = transactions as Transaction[];
export const expectedTotalBalance = expectedAccounts.reduce((total, account) => total + account.balance, 0);
export const baseUrl = 'http://127.0.0.1:4173';