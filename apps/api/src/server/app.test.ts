import assert from 'node:assert/strict';
import test from 'node:test';

import { handleRequest } from './app.js';

test('GET /health returns ok', async () => {
  const response = await handleRequest(new Request('http://localhost/health'));
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.deepEqual(payload, { status: 'ok' });
});
