const { spawn } = require('node:child_process');
const path = require('node:path');
const assert = require('node:assert/strict');

const PORT = 3123;
const BASE = `http://127.0.0.1:${PORT}`;
const SERVER = path.join(__dirname, '..', 'src', 'server.js');

async function waitForHealth(timeoutMs = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`${BASE}/health`);
      if (res.ok) return;
    } catch {
      // o servidor ainda não subiu
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error('Servidor não respondeu em /health dentro do tempo limite.');
}

async function main() {
  const server = spawn(process.execPath, [SERVER], {
    env: { ...process.env, PORT: String(PORT) },
    stdio: 'inherit'
  });

  try {
    await waitForHealth();

    const res = await fetch(`${BASE}/api/features/21`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valores: [2, 3, 5] })
    });
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(body.result.soma, 10);
    console.log('Smoke test OK');
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error('Smoke test FALHOU:', err.message);
  process.exit(1);
});