# API Documentation

Base URL: `http://127.0.0.1:4173`. All responses are JSON. Protected routes require `Authorization: Bearer <token>` from a successful demo login.

## `GET /api/health`

Authentication: none. Returns `200` with `{"status":"ok","service":"northstar-demo-banking"}`.

## `POST /api/auth/login`

Authentication: none. JSON request: `{"username":"alex","password":"DemoPass123!"}`. Success returns `200` with a random local session `token` and `user` containing `id`, `username`, and `displayName`. Password is never returned. Missing, empty, or wrongly typed credentials return `400`; incorrect credentials return `401`; errors have an `error` message.

The fixed synthetic credential and predictable local environment are for demonstration only. The token is an in-memory session identifier, not production-grade authentication.

## `POST /api/auth/logout`

Authentication: required. No request body. Returns `200` with `{"message":"You have been logged out."}` and invalidates the supplied token. Missing/invalid token returns `401`.

## `GET /api/accounts`

Authentication: required. Returns `200` with `{ "accounts": [...] }`. Each account contains `id`, `name`, `type`, `maskedNumber`, `currency`, numeric `balance`, and `status`. Missing/invalid token returns `401`.

## `GET /api/accounts/:id`

Authentication: required. Returns `200` with `{ "account": {...} }` for a known account, `404` with an `error` message for an unknown account, or `401` without valid authentication.

## `GET /api/transactions`

Authentication: required. Returns `200` with `{ "transactions": [...] }`. Records contain `id`, `description`, ISO `date`, `type` (`Credit` or `Debit`), positive numeric `amount`, `status`, and `accountId`. Optional `accountId` query parameter filters results. Missing/invalid token returns `401`.