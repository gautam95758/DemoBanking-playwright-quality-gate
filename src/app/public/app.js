const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const loginView = document.querySelector('#login-view');
const dashboardView = document.querySelector('#dashboard-view');
const loginForm = document.querySelector('#login-form');
const loginError = document.querySelector('#login-error');
const tokenKey = 'northstar-demo-token';

async function request(path, options = {}) {
  const token = localStorage.getItem(tokenKey);
  const response = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || 'The request could not be completed.');
  return body;
}

function showLogin() {
  dashboardView.classList.add('hidden');
  loginView.classList.remove('hidden');
  loginForm.reset();
}

function renderDashboard(user, accountData, transactionData) {
  document.querySelector('#welcome-message').textContent = `Welcome, ${user.displayName}`;
  const total = accountData.accounts.reduce((sum, account) => sum + account.balance, 0);
  document.querySelector('#total-balance').textContent = currency.format(total);
  document.querySelector('#account-count').textContent = `${accountData.accounts.length} accounts`;
  document.querySelector('#account-section-count').textContent = `${accountData.accounts.length} accounts`;

  const accountById = new Map(accountData.accounts.map((account) => [account.id, account]));
  document.querySelector('#account-list').innerHTML = accountData.accounts.map((account) => `
    <article class="account-card" aria-label="${account.name}">
      <div class="account-card-top"><div><h3>${account.name}</h3><span class="account-id">${account.id} · ${account.type}</span></div><span class="account-glyph" aria-hidden="true">${account.type === 'Checking' ? '↗' : '＋'}</span></div>
      <p class="account-balance" data-testid="account-balance-${account.id}">${currency.format(account.balance)}</p>
      <div class="account-card-bottom"><span class="account-number">${account.maskedNumber}</span><span class="status-pill">${account.status}</span></div>
    </article>`).join('');

  document.querySelector('#transaction-list').innerHTML = transactionData.transactions.map((transaction) => {
    const account = accountById.get(transaction.accountId);
    const sign = transaction.type === 'Credit' ? '+' : '−';
    return `<tr data-transaction-id="${transaction.id}">
      <td>${transaction.description}</td><td><time datetime="${transaction.date}">${new Date(`${transaction.date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</time></td>
      <td>${account ? account.name : transaction.accountId}</td><td>${transaction.status}</td>
      <td class="amount-cell"><span class="transaction-amount" data-testid="transaction-amount-${transaction.id}">${sign}${currency.format(transaction.amount)}</span><span class="transaction-type">${transaction.type}</span></td>
    </tr>`;
  }).join('');

  loginView.classList.add('hidden');
  dashboardView.classList.remove('hidden');
}

async function loadDashboard(user) {
  const [accountData, transactionData] = await Promise.all([
    request('/api/accounts'),
    request('/api/transactions'),
  ]);
  renderDashboard(user, accountData, transactionData);
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  loginError.textContent = '';
  const formData = new FormData(loginForm);
  const username = String(formData.get('username') || '').trim();
  const password = String(formData.get('password') || '');
  if (!username || !password) {
    loginError.textContent = !username && !password ? 'Enter your username and password.' : !username ? 'Enter your username.' : 'Enter your password.';
    return;
  }
  try {
    const result = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    localStorage.setItem(tokenKey, result.token);
    await loadDashboard(result.user);
  } catch (error) {
    localStorage.removeItem(tokenKey);
    loginError.textContent = error.message;
  }
});

document.querySelector('#logout-button').addEventListener('click', async () => {
  try {
    await request('/api/auth/logout', { method: 'POST' });
  } finally {
    localStorage.removeItem(tokenKey);
    history.replaceState(null, '', '/');
    showLogin();
  }
});

async function restoreSession() {
  const token = localStorage.getItem(tokenKey);
  if (!token) return;
  try {
    const [accountData, transactionData] = await Promise.all([
      request('/api/accounts'),
      request('/api/transactions'),
    ]);
    renderDashboard({ displayName: 'Alex Morgan' }, accountData, transactionData);
  } catch {
    localStorage.removeItem(tokenKey);
    showLogin();
  }
}

restoreSession();