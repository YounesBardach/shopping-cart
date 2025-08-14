<p align="center">
  <img src="https://i.postimg.cc/C5zJmQZH/Chat-GPT-Image-Aug-13-2025-07-15-31-PM.png" alt="Shopping Cart Banner" width="900" />
</p>

<div align="center">

## Shopping Cart (React + TypeScript + Vite)

A minimal e‑commerce demo to practice React, React Testing Library, and data fetching for The Odin Project.

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=061A22)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Vitest](https://img.shields.io/badge/Vitest-2-6DA544?logo=vitest&logoColor=white)](https://vitest.dev/)
[![RTL](https://img.shields.io/badge/Testing%20Library-React-E33332?logo=testinglibrary&logoColor=white)](https://testing-library.com/docs/react-testing-library/intro/)
[![Deploy](https://img.shields.io/badge/Deployed%20on-Netlify-00AD9F?logo=netlify&logoColor=white)](https://celadon-praline-45af30.netlify.app/)

</div>

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Scripts](#scripts)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Routes](#routes)
- [Architecture](#architecture)
- [Testing](#testing)
- [Deployment](#deployment)
 

---

## About

This project is part of The Odin Project React curriculum: [The Odin Project — Project: Shopping Cart](https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart). It focuses on practicing component composition, client-side routing, React Context, data fetching, and testing.

- Live app: `https://celadon-praline-45af30.netlify.app/`
- Data source: FakeStore API (`https://fakestoreapi.com/products`)

## Features

- Product grid with image, title, price, category, and rating
- Product details page with quantity input and Add to Cart
- Toast confirmation after adding to cart
- Cart page with quantity editing, item removal, and running total
- Loading and error states while fetching products
- Client-side routing with a navigation bar and cart item count

## Requirements

- Node.js 20+
- npm

## Quick start

```bash
# 1) Install dependencies
npm install

# 2) Start the dev server
npm run dev

# Local dev server (default)
# http://localhost:5173
```

## Scripts

- `npm run dev` — start Vite dev server
- `npm run test` — run tests with Vitest
- `npm run build` — type-check and build for production (Vite)
- `npm run lint` — run ESLint
- `npm run format` — format with Prettier

## Tech stack

- **Framework:** React 18, TypeScript
- **Build tool:** Vite 6
- **Routing:** React Router 7
- **State:** React Context (`ProductContext`, `CartContext`) + custom hooks
- **Styles:** CSS Modules + `modern-normalize`
- **Testing:** Vitest, React Testing Library, jsdom

## Project structure

```
shopping-cart/
├─ index.html
├─ package.json
├─ src/
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ components/
│  │  ├─ Cart.tsx
│  │  ├─ NavBar.tsx
│  │  ├─ ProductDetails.tsx
│  │  ├─ ProductGrid.tsx
│  │  └─ Toast.tsx
│  ├─ context/
│  │  ├─ CartContext.ts
│  │  ├─ CartProvider.tsx
│  │  ├─ ProductContext.tsx
│  │  └─ ProductProvider.tsx
│  ├─ hooks/
│  │  ├─ useCart.ts
│  │  └─ useProduct.ts
│  ├─ styles/ (CSS modules)
│  ├─ tests/
│  │  ├─ Cart.test.tsx
│  │  ├─ NavBar.test.tsx
│  │  ├─ ProductDetails.test.tsx
│  │  ├─ ProductGrid.test.tsx
│  │  └─ setup.ts
│  └─ types/
│     └─ models.ts
└─ public/
   └─ vite.svg
```

## Routes

- `/` — product grid (home)
- `/product/:id` — product details; supports Add to Cart
- `/cart` — view and edit cart

## Architecture

- **Product fetching:** `ProductProvider` fetches from FakeStore API with basic validation and exposes `{ products, loading, error, fetchProducts }` via `ProductContext`.
- **Cart state:** `CartProvider` keeps an in-memory cart with `addToCart`, `removeFromCart`, `updateQuantity`, `getTotalPrice`, and `getTotalQuantity`.
- **Hooks:** `useProduct` and `useCart` consume the contexts with type safety.
- **UI:** `ProductGrid`, `ProductDetails` (with toast), `Cart`, `NavBar` (shows cart count), and `Toast` component. CSS Modules for styling.

## Testing

Tests are written with Vitest and React Testing Library. A jsdom environment is configured in `src/tests/setup.ts`.

```bash
npm run test
```

Examples covered:

- Rendering and loading states for `ProductGrid`
- Nav cart count via `NavBar`
- Product detail interactions (quantity and add to cart)
- Cart quantity updates and total calculation

## Deployment

This site is deployed to Netlify: `https://celadon-praline-45af30.netlify.app/`.

For SPAs, ensure all routes rewrite to `index.html`. If needed, add a `_redirects` file under `public/`:

```text
/* /index.html 200
```

 
