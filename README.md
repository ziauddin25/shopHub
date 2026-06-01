<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Project structure and setup

This repository is split into two independent services that run on different ports:

1. **backend/** – Express API (port 5000 by default)
2. **frontend/** – Vite‑powered React app (port 5173 by default)

### Environment variables

- **backend/.env** – `CLIENT_URL` should match where you serve the React app (default `http://localhost:5173`).
- **frontend/.env** – `VITE_API_URL` can override the URL used by the client; it defaults to the proxy at `/api`.

### Running locally

```bash
# install dependencies once
cd backend && npm install
cd ../frontend && npm install

# start both services in two terminals
cd backend && npm run dev      # API listening on http://localhost:5000
cd ../frontend && npm run dev  # Vite dev server on http://localhost:5173
```

The front‑end proxy in `vite.config.js` forwards `/api` requests to the backend, avoiding CORS.  You can also call the API directly using the `VITE_API_URL` variable.
=======
# shopHub
>>>>>>> f844a936ad42011bd16388be43d5ee601e722d93
