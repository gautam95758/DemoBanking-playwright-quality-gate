import type { APIRequestContext, APIResponse } from '@playwright/test';

export class AccountsApiClient {
  constructor(private readonly request: APIRequestContext) {}

  list(token?: string): Promise<APIResponse> {
    return this.request.get('/api/accounts', token ? { headers: { Authorization: `Bearer ${token}` } } : {});
  }

  get(accountId: string, token?: string): Promise<APIResponse> {
    return this.request.get(`/api/accounts/${encodeURIComponent(accountId)}`, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
  }
}