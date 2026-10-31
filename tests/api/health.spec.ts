import { test, expect } from '../fixtures/test';
import type { HealthResponse } from '../types/api.types';

test('health endpoint reports the local service as ready', async ({ request }) => {
  const response = await request.get('/api/health');
  expect(response.status()).toBe(200);
  const body = await response.json() as HealthResponse;
  expect(body).toEqual({ status: 'ok', service: 'northstar-demo-banking' });
});