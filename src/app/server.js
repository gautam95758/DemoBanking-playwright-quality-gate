const crypto = require('node:crypto');
const path = require('node:path');
const express = require('express');
const { users, accounts, transactions } = require('./data/demoData');

const app = express();
const port = Number(process.env.PORT || 4173);
const sessions = new Map();

app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_request, response) => {
  response.status(200).json({ status: 'ok', service: 'northstar-demo-banking' });
});

app.post('/api/auth/login', (request, response) => {
  const { username, password } = request.body || {};
  if (typeof username !== 'string' || typeof password !== 'string' || !username.trim() || !password) {
    return response.status(400).json({ error: 'Username and password are required.' });
  }

  const demoUser = users.valid;
  if (username !== demoUser.username || password !== demoUser.password) {
    return response.status(401).json({ error: 'The username or password is incorrect.' });
  }

  const token = crypto.randomUUID();
  sessions.set(token, demoUser.id);
  return response.status(200).json({
    token,
    user: { id: demoUser.id, username: demoUser.username, displayName: demoUser.displayName },
  });
});

function requireAuthentication(request, response, next) {
  const authorization = request.get('authorization') || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  const userId = sessions.get(token);
  if (!userId) return response.status(401).json({ error: 'Authentication is required.' });
  request.demoUserId = userId;
  request.demoToken = token;
  return next();
}

app.get('/api/accounts', requireAuthentication, (_request, response) => {
  response.status(200).json({ accounts });
});

app.get('/api/accounts/:id', requireAuthentication, (request, response) => {
  const account = accounts.find((item) => item.id === request.params.id);
  if (!account) return response.status(404).json({ error: 'Account was not found.' });
  return response.status(200).json({ account });
});

app.get('/api/transactions', requireAuthentication, (request, response) => {
  const { accountId } = request.query;
  const filtered = typeof accountId === 'string'
    ? transactions.filter((transaction) => transaction.accountId === accountId)
    : transactions;
  response.status(200).json({ transactions: filtered });
});

app.post('/api/auth/logout', requireAuthentication, (request, response) => {
  sessions.delete(request.demoToken);
  response.status(200).json({ message: 'You have been logged out.' });
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Northstar Demo Banking listening at http://127.0.0.1:${port}`);
});