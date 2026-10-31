import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { LoginRequest } from '../types/api.types';

export class AuthApiClient {
  constructor(private readonly request: APIRequestContext) {}

  login(credentials: LoginRequest): Promise<APIResponse> {
    return this.request.post('/api/auth/login', { data: credentials });
  }

  logout(token: string): Promise<APIResponse> {
    return this.request.post('/api/auth/logout', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}