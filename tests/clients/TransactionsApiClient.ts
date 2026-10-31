import type { APIRequestContext, APIResponse } from '@playwright/test';

export class TransactionsApiClient {
  constructor(private readonly request: APIRequestContext) {}

  list(token?: string, accountId?: string): Promise<APIResponse> {
    const query = accountId ? `?accountId=${encodeURIComponent(accountId)}` : '';
    return this.request.get(`/api/transactions${query}`, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
  }
}