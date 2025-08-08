# Copilot Instructions for AI Agents

## Project Overview
- This is a React + TypeScript project bootstrapped with Vite.
- The codebase is organized with a clear separation between UI components (`src/components`), pages (`src/pages`), API logic (`src/API`), and utility/context code (`src/lib`, `src/context`).
- The entry point is `src/main.tsx`, which loads the main `App` component from `src/App.tsx`.

## Key Architectural Patterns
- **Component Structure:**
  - UI elements are in `src/components/ui/` (e.g., `button.tsx`, `card.tsx`).
  - Layout and header components are in `src/components/`.
  - Pages (route-level views) are in `src/pages/` (e.g., `city-page.tsx`, `weather-dashboard.tsx`).
- **API Integration:**
  - All API-related logic is in `src/API/`.
  - `config.ts` and `types.ts` define API endpoints and TypeScript types.
  - `weather.ts` likely contains functions for fetching weather data.
- **Context/State:**
  - Shared state and theming are managed in `src/context/` (e.g., `theme-provide.tsx`).
- **Assets:**
  - Static assets (images, SVGs) are in `public/` and `src/assets/`.

## Developer Workflows
- **Development:**
  - Use `npm run dev` to start the Vite development server with HMR.
- **Build:**
  - Use `npm run build` to create a production build.
- **Linting:**
  - Lint rules are configured in `eslint.config.js`.
  - Type-aware linting is recommended; see `README.md` for advanced ESLint setup.
- **Type Checking:**
  - TypeScript config is in `tsconfig.json`, `tsconfig.app.json`, and `tsconfig.node.json`.

## Project-Specific Conventions
- **File Naming:**
  - Use kebab-case for files and folders (e.g., `city-page.tsx`, `theme-provide.tsx`).
- **Component Organization:**
  - Place reusable UI primitives in `src/components/ui/`.
  - Place layout and page-level components in `src/components/` and `src/pages/`.
- **API Usage:**
  - Centralize all API calls and types in `src/API/`.
- **Styling:**
  - CSS files are colocated with components (e.g., `App.css`, `index.css`).

## Integration Points
- **Vite Plugins:**
  - Uses `@vitejs/plugin-react` or `@vitejs/plugin-react-swc` for React Fast Refresh.
- **ESLint Plugins:**
  - Optionally uses `eslint-plugin-react-x` and `eslint-plugin-react-dom` for React-specific linting.

## Examples
- To add a new weather data API call, create a function in `src/API/weather.ts` and export its type from `src/API/types.ts`.
- To add a new UI card, place it in `src/components/ui/card.tsx` and import it where needed.

## References
- See `README.md` for more on ESLint and TypeScript setup.
- See `vite.config.ts` for Vite configuration.
- See `eslint.config.js` for linting rules.

---

*Update this file as project structure or conventions evolve.*
