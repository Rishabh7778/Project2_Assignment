# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# Users Management App

A modern React application to list, search, and view details of users using Reqres API. The app includes features like pagination, search, dark/light theme toggle, and a modal for user details.

---

## Features

 # User List Page
  - Fetches user data from `https://reqres.in/api/users`
  - Pagination support
  - Skeleton loading for better UX
  - Search users by name or email
# User Details Modal
  - Opens user details in a modal
  - Deep linking support (`/user/:id`)
  - Accessible modal with focus trap and close on `Escape` key
# Theme Toggle
  - Light and dark themes
  - Saves preference in `localStorage`
# Error Handling
  - Global error boundary for catching React errors

---

## Tech Stack

- React 18 - Frontend library
- TypeScript - Strong typing and safer code
- React Router v7 - Client-side routing
- Redux Toolkit - State management (theme, search, pagination)
- React Query (TanStack Query) - Data fetching and caching
- Tailwind CSS - Utility-first CSS framework
- Jest & React Testing Library - Unit and integration tests
- Vite - Fast frontend build tool
- Reqres API - Free dummy API for users

---

## Project Structure

