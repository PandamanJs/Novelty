# Wordcraft - Premium Writing Platform

A distraction-free writing platform with a premium Apple-inspired liquid glass aesthetic.

## Design & Aesthetic

**Liquid Glass Morphism (Apple Touch)**
- Gradient backgrounds with subtle depth
- Frosted glass effects with backdrop blur (12-32px)
- Smooth hover animations and transitions
- Premium shadows and inset highlights
- Color palette: Deep blues, purples, with accent gradients
- Animated floating background elements
- Gradient text effects on hero and stats

## Features

### Writing Tools
- **Focus Mode** - Distraction-free interface, full-screen editor
- **Pomodoro Timer** - 25/5 minute focus/break cycles
- **Writing Prompts** - 15+ curated prompts for inspiration
- **Draft Manager** - Local storage with auto-save (30s interval)
- **Export Options** - Download as TXT, Markdown, or HTML

### Statistics & Tracking
- Real-time word/character counting
- Reading time estimation
- Daily writing goals with progress bar
- Writing streak tracking
- Session statistics

### UI/UX
- Responsive design (desktop, tablet, mobile)
- Smooth animations and transitions
- Premium button styles with gradient effects
- Sidebar with writing tips or saved drafts
- Toggle stats visibility
- Glass-effect cards and panels

## Project Structure

```
client/
├── pages/
│   ├── Index.tsx              # Landing page (redesigned)
│   ├── Write.tsx              # Main editor
│   ├── Projects.tsx
│   └── NotFound.tsx
├── components/
│   ├── WritingTimer.tsx        # Pomodoro timer
│   ├── WritingPrompt.tsx       # Prompt generator
│   ├── DraftManager.tsx        # Draft management
│   ├── ExportMenu.tsx          # Export functionality
│   ├── Header.tsx              # Navigation
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── export.ts               # Export utilities
│   └── utils.ts
├── global.css                  # Global styles with liquid glass effects
└── main.tsx
```

## Development

```bash
npm run dev          # Start dev server on port 5000
npm run build        # Build for production
npm run start        # Run production build
```

## Production Deployment

```bash
# Build both client and server
npm run build

# Run production server (port 5000 on Replit)
node dist/server/production.mjs
```

## Recent Design Updates (v2.1)

**Premium Liquid Glass Aesthetic**
- Refined color scheme: Deep navy blues → purple → dark blue gradients
- Enhanced glass-effect classes with gradient backgrounds and proper shadows
- Animated floating background elements
- Premium gradient buttons (purple → blue)
- Updated feature cards with hover glass-effect-lg
- Stats with gradient text effects
- Refined hero section with gradient text heading
- Better visual hierarchy and spacing

**Technical Improvements**
- Added `-webkit-backdrop-filter` for browser compatibility
- Inset shadows for premium glass appearance
- Cubic-bezier easing for smooth animations
- Fixed hover states with proper transitions
- Gradient dividers throughout

## Browser Support

Liquid glass effects work best on:
- Chrome/Edge 76+
- Safari 13+
- Firefox 103+
- Mobile Safari (iOS 13+)

## Data Storage

- **Drafts**: Browser localStorage (`wordcraft_drafts`)
- **Auto-save**: Every 30 seconds
- **Offline capable**: All data stored locally

## Future Enhancements

- Cloud sync for drafts
- Collaborative editing
- Rich text editor
- Custom themes
- Mobile apps
- Writing analytics dashboard
- Community features
