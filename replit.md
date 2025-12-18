# Fusion Starter (Wordcraft)

A fullstack React + Express starter template for building web applications.

## Overview

This is a writing platform called Wordcraft, built with:
- **Frontend**: React + Vite + TailwindCSS with shadcn/ui components
- **Backend**: Express.js API (integrated with Vite dev server)
- **Styling**: TailwindCSS with typography plugin
- **3D Graphics**: Three.js with React Three Fiber/Drei

## Project Structure

```
├── client/           # React frontend
│   ├── components/   # UI components (shadcn/ui)
│   ├── pages/        # Page components
│   ├── hooks/        # Custom React hooks
│   └── lib/          # Utility functions
├── server/           # Express backend
│   ├── routes/       # API route handlers
│   ├── index.ts      # Server factory
│   └── node-build.ts # Production entry point
├── shared/           # Shared code between frontend and backend
├── public/           # Static assets
└── dist/             # Build output (generated)
```

## Development

The dev server runs on port 5000 and includes both the Vite frontend and Express API.

- Frontend: http://localhost:5000
- API endpoints: /api/*

## API Endpoints

- `GET /api/ping` - Health check endpoint
- `GET /api/demo` - Demo endpoint

## Build & Deploy

Build command: `npm run build`
- Builds client to `dist/spa`
- Builds server to `dist/server`

Production start: `node dist/server/production.mjs`

## Recent Changes

- 2025-12-18: Configured for Replit environment (port 5000, allowed hosts)
