# Wordcraft - Premium Writing Platform

A distraction-free writing platform with comprehensive writer tools and a sophisticated custom color palette.

## Color System

**Custom Palette** - Warm, professional design:
- **#e8e3d6** (Cream) - Accents, highlights
- **#91b2c7** (Blue-gray) - Secondary actions, stats
- **#789cac** (Slate-blue) - Tertiary elements
- **#6c7c80** (Slate) - Muted text
- **#645e6f** (Mauve) - Supporting
- **#817395** (Purple) - Primary actions, emphasis

## Writer Tools

### Essential Tools
- **Writing Timer** - Pomodoro technique (25/5 min cycles)
- **Writing Prompts** - 15+ curated prompts to spark inspiration
- **Story Outline** - Hierarchical outline builder with sections
- **Character Builder** - Develop and track characters with roles & traits
- **Writing Goals** - Track daily/weekly goals with progress bars
- **Draft Manager** - Auto-save and manage multiple drafts
- **Export Options** - Download as TXT, Markdown, or HTML

### Statistics & Tracking
- Real-time word/character counts
- Reading time estimation
- Daily writing goals with visual progress
- Writing streak counter
- Session statistics
- Goal completion tracking

### Focus Features
- Focus Mode (distraction-free interface)
- Sidebar toggle (writing tips or drafts)
- Stats visibility toggle
- Full-screen editor with minimal UI

## Project Structure

```
client/
├── components/
│   ├── WritingTimer.tsx        # Pomodoro timer
│   ├── WritingPrompt.tsx       # Prompt generator
│   ├── OutlineBuilder.tsx      # Story structure builder
│   ├── CharacterBuilder.tsx    # Character development tool
│   ├── WritingGoals.tsx        # Goal tracking
│   ├── DraftManager.tsx        # Draft management
│   ├── ExportMenu.tsx          # Export functionality
│   ├── Header.tsx
│   └── ui/                     # shadcn/ui components
├── pages/
│   ├── Index.tsx               # Landing page
│   ├── Write.tsx               # Main editor (all tools integrated)
│   ├── Projects.tsx
│   └── NotFound.tsx
├── lib/
│   ├── export.ts               # Export utilities
│   └── utils.ts
├── global.css                  # Global styles + color system
└── main.tsx
```

## Features Breakdown

### Outline Builder
- Create hierarchical story structure
- Add/edit/delete sections
- Expandable sections with notes
- Pre-loaded with 3-act structure

### Character Builder
- Store character information
- Track role and traits
- Visual character database
- Quick reference during writing

### Writing Goals
- Daily and weekly targets
- Visual progress indicators
- Goal completion tracking
- Motivational feedback

### Draft Manager
- Automatic saves every 30 seconds
- Browser localStorage persistence
- Quick draft loading
- Timestamp tracking

## Development

```bash
npm run dev          # Start on port 5000
npm run build        # Build for production
npm run start        # Run production server
```

## Production Deployment

Configured for auto-scaling deployment with:
- Build: `npm run build`
- Run: `node dist/server/production.mjs`
- Port: 5000 (Replit)

## Color Principles Applied

✅ **Warmth & Elegance** - Cream & slate foundation
✅ **Trust & Focus** - Blue-gray for secondary actions
✅ **Visual Hierarchy** - Purple for primary CTAs
✅ **Accessibility** - High contrast ratios
✅ **Consistency** - Color used semantically throughout

## Recent Updates (v3.0)

**Writer Tools Suite**
- Added Story Outline builder with hierarchical structure
- Added Character Builder for developing characters
- Added Writing Goals tracker with visual progress
- All tools integrated into main Write editor

**Color System Overhaul**
- Implemented custom 6-color palette
- Warm, professional design aesthetic
- Better visual hierarchy and cohesion
- Improved readability and focus

## Browser Support

All features work on:
- Chrome/Edge 90+
- Safari 14+
- Firefox 88+

## Data & Storage

- **Local Storage**: All drafts, goals, characters stored locally
- **Auto-Save**: 30-second intervals
- **No Backend**: Client-side only (can add later)

## Future Enhancements

- Cloud sync & collaboration
- Rich text editor
- Custom writing modes (poetry, screenplays)
- Analytics dashboard
- Community sharing
- Mobile app
