# Fusion Starter (Wordcraft)

A fullstack React + Express writing platform for authors and writers.

## Overview

Wordcraft is a distraction-free writing platform built with:
- **Frontend**: React + Vite + TailwindCSS with shadcn/ui components
- **Backend**: Express.js API (integrated with Vite dev server)
- **Styling**: TailwindCSS with typography plugin
- **Storage**: localStorage for draft management

## Project Structure

```
├── client/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── WritingTimer.tsx # Pomodoro timer (25/5 min)
│   │   ├── WritingPrompt.tsx# Writing prompt generator
│   │   ├── ExportMenu.tsx   # Export as TXT/MD/HTML
│   │   ├── DraftManager.tsx # Draft management UI
│   │   └── Header.tsx
│   ├── pages/
│   │   ├── Index.tsx        # Landing page
│   │   ├── Write.tsx        # Main editor (enhanced)
│   │   ├── Projects.tsx
│   │   └── NotFound.tsx
│   ├── hooks/
│   ├── lib/
│   │   └── export.ts        # Export utilities
│   └── App.tsx
├── server/
│   ├── index.ts             # Server factory
│   └── node-build.ts        # Production entry point
├── shared/
└── public/
```

## Writer Features

### Core Editor
- Real-time word/character/reading time stats
- Daily writing goals with progress tracking
- Writing streak counter
- Focus mode (distraction-free interface)
- Auto-save every 30 seconds

### Writing Tools
1. **Writing Timer** - Pomodoro-style timer (25 min default)
2. **Writing Prompts** - Curated prompt library to spark inspiration
3. **Draft Manager** - Save, load, and manage multiple drafts locally
4. **Export Options** - Download as:
   - Plain Text (.txt)
   - Markdown (.md)
   - HTML (.html)

### UI Features
- Stats panel (toggle visibility)
- Focus mode (hide sidebar/stats)
- Drafts sidebar (view/load saved work)
- Formatting toolbar
- Responsive design (desktop/mobile)

## Development

Dev server runs on **port 5000** with both frontend (Vite) and backend (Express).

```bash
npm run dev
```

Access at: http://localhost:5000

## API Endpoints

- `GET /api/ping` - Health check
- `GET /api/demo` - Demo endpoint

## Build & Production

```bash
npm run build
node dist/server/production.mjs
```

Production server runs on port (default 3000, configured for 5000 on Replit)

## Data Storage

- **Drafts**: Stored in browser localStorage under `wordcraft_drafts`
- **Auto-save**: Triggered every 30 seconds when editing

## Recent Changes

**v2.0 - 2025-12-18: Enhanced Writer Platform**
- Added Writing Timer (Pomodoro support)
- Added Writing Prompt generator with 15+ curated prompts
- Implemented Draft Manager with localStorage persistence
- Added Export functionality (TXT, Markdown, HTML)
- Implemented auto-save (30-second interval)
- Added Focus Mode for distraction-free writing
- Enhanced sidebar with Writing Tips and Draft browser
- Improved toolbar with new features

**v1.0 - Initial Setup**
- Configured for Replit (port 5000, allowed hosts)
- Integrated Express with Vite dev server
- Set up production build configuration

## Future Enhancements

- Rich text editor with formatting support
- Cloud sync for drafts
- Collaboration features
- Writing analytics/insights
- Mobile app
- Custom writing goals by project
