import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';

import { env } from './config/env.js';
import { handleRequest } from './server/app.js';

const bunServe = typeof Bun !== 'undefined' ? Bun.serve : undefined;

if (bunServe) {
  bunServe({
    port: env.port,
    fetch: handleRequest
  });
  console.log(`API listening on ${env.port}`);
} else {
  createServer(async (req: IncomingMessage, res: ServerResponse) => {
    const body = await new Promise<string>((resolve) => {
      let data = '';
      req.on('data', (chunk: Buffer) => {
        data += chunk.toString();
      });
      req.on('end', () => resolve(data));
    });

    const request = new Request(`http://localhost:${env.port}${req.url ?? '/'}`, {
      method: req.method,
      headers: req.headers as HeadersInit,
      body: ['GET', 'HEAD'].includes(req.method ?? 'GET') ? undefined : body
    });

    const response = await handleRequest(request);
    res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
    res.end(await response.text());
  }).listen(env.port, () => {
    console.log(`API listening on ${env.port}`);
  });
}
