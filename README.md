# we-chat-api

we chat api is an application containing JavaScript. The checked-in dependency manifests use Express, MongoDB via Mongoose, Socket.IO. Source modules cover `authentication`, `group-room`, `private-room`, `users`, `message`, `user`, `private-rooms`.

## Repository layout

- `config/` — 1 tracked file(s).
- `controllers/` — 4 tracked file(s); source examples: `controllers/authentication.js`, `controllers/group-room.js`.
- `middleware/` — 1 tracked file(s); source examples: `middleware/auth.js`.
- `models/` — 4 tracked file(s); source examples: `models/group-room.js`, `models/message.js`.
- `routes/` — 3 tracked file(s); source examples: `routes/authentication.js`, `routes/private-rooms.js`.

## Local setup

Run each package setup block from the repository root. For workspace repositories, install dependencies at the root before running application-specific scripts.

Clone this repository and enter its directory:

```sh
git clone https://github.com/stanleyHayes/we-chat-api.git
cd we-chat-api
```

### Node package: `package.json`

Use Node.js and npm.

```sh
npm install
```

- `npm run dev` — runs the declared `dev` script (`nodemon index.js`).
- The package test script is a placeholder and exits with an error; it does not run an automated test suite.

## Configuration

The application declares `dotenv`. Review environment-variable references in the source and supply your own local values before starting it. Keep credentials out of Git; do not reuse committed credentials.

## Source entry points

- [controllers/authentication.js](controllers/authentication.js)
- [controllers/group-room.js](controllers/group-room.js)
- [controllers/private-room.js](controllers/private-room.js)
- [controllers/users.js](controllers/users.js)
- [index.js](index.js)
- [middleware/auth.js](middleware/auth.js)
- [models/group-room.js](models/group-room.js)
- [models/message.js](models/message.js)

## Development notes

Commands above come from the tracked manifests and source layout. External services and runtime configuration may be required. Documentation updates do not establish that the application is deployed or that its tests pass.
