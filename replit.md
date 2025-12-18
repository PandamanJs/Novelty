# Wordcraft - Premium Writing Platform

A distraction-free creative writing platform with sophisticated animations, comprehensive writer tools, and a custom color palette.

## Visual Design

**Custom Palette** - Warm, professional aesthetic:
- **#e8e3d6** (Cream) - Accents, highlights  
- **#91b2c7** (Blue-gray) - Secondary actions, stats
- **#789cac** (Slate-blue) - Tertiary elements
- **#6c7c80** (Slate) - Muted text
- **#645e6f** (Mauve) - Supporting
- **#817395** (Purple) - Primary actions, emphasis

**Animation Suite** - Interactive & Alive:
- ✨ Pulse glow effects on cards & backgrounds
- 🎯 Shimmer animations for prompts
- 🌊 Smooth slide-in animations for modals
- 🔄 Rotating/bouncing icons on hover
- 📱 Interactive card hover effects with shine
- 💫 Staggered fade-in animations on load
- ⌨️ Input field focus glow effects
- 🎨 Button elevation & transform interactions

## Writer Tools

### Essential Tools
- **Writing Timer** - Pomodoro technique (25/5 min cycles) with pulse animation
- **Writing Prompts** - 15+ curated prompts with shimmer effects
- **Story Outline** - Hierarchical outline builder with sections
- **Character Builder** - Store character names, roles & traits
- **Writing Goals** - Track daily/weekly goals with progress bars
- **Draft Manager** - Auto-save & manage multiple drafts
- **Export Options** - Download as TXT, Markdown, or HTML

### Statistics & Tracking
- Real-time word/character counts with glow animations
- Reading time estimation
- Daily writing goals with visual progress
- Writing streak counter
- Session statistics
- Goal completion tracking

### Focus Features
- Focus Mode (distraction-free interface)
- Sidebar toggle (writing tips or drafts)
- Stats visibility toggle (right panel)
- Full-screen editor with minimal UI
- Animated background orbs for ambient feel

## Project Structure

```
client/
├── components/
│   ├── WritingTimer.tsx           # Pomodoro timer + animations
│   ├── WritingPrompt.tsx          # Prompt generator + slide-in
│   ├── OutlineBuilder.tsx         # Story structure builder
│   ├── CharacterBuilder.tsx       # Character development tool
│   ├── WritingGoals.tsx           # Goal tracking
│   ├── DraftManager.tsx           # Draft management
│   ├── ExportMenu.tsx             # Export functionality
│   ├── Header.tsx
│   └── ui/                        # shadcn/ui components
├── pages/
│   ├── Index.tsx                  # Landing page + animations
│   ├── Write.tsx                  # Main editor (all tools integrated)
│   ├── Projects.tsx
│   └── NotFound.tsx
├── lib/
│   ├── export.ts                  # Export utilities
│   └── utils.ts
├── global.css                     # Global styles + animation keyframes
└── main.tsx
```

## Animation System

### Keyframe Animations
- **pulse-glow**: Breathing glow effect (3s loop)
- **shimmer**: Light sweep across elements (3s loop)
- **bounce-subtle**: Gentle vertical bounce (2s loop)
- **slide-in-right**: Fast entrance from right (0.6s)
- **slide-in-left**: Fast entrance from left (0.6s)
- **glow-pulse**: Text glow effect (2s loop)
- **rotate-slow**: Smooth 360° rotation (20s loop)
- **flip-in**: 3D flip entrance (0.8s)
- **fade-in-up**: Fade in with upward movement (0.8s)

### Interactive Effects
- **Button hover**: -2px elevation with smooth transition
- **Button active**: Press-down feedback (0px)
- **Card hover**: -4px lift + shadow + shine overlay
- **Input focus**: Purple glow halo (3px)
- **Icon hover**: Rotation/bounce/shimmer based on type
- **Modal entrance**: Slide-in from right with fade

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

## Design Principles Applied

✅ **Warmth & Elegance** - Cream & slate foundation with purple accents
✅ **Motion & Life** - Comprehensive animation suite keeps UI dynamic
✅ **Trust & Focus** - Blue-gray for secondary actions, minimal distraction
✅ **Visual Hierarchy** - Purple for primary CTAs, animations guide attention
✅ **Accessibility** - High contrast ratios, smooth transitions
✅ **Consistency** - Colors used semantically, animations purposeful

## Recent Updates (v4.0 - Alive UI)

**Animation Suite**
- Added 10+ keyframe animations for dynamic feel
- Implemented interactive card effects with shine overlays
- Added staggered fade-in animations for content loading
- Button elevation & transform interactions
- Input field focus glow effects
- Animated background orbs for ambient atmosphere

**Writer Tools Suite**
- Story Outline builder with hierarchical structure
- Character Builder for developing characters
- Writing Goals tracker with visual progress
- All tools integrated into main Write editor
- Smooth slide-in animations for all tool modals

**Color System**
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
- **Auto-Save**: 30-second intervals during editing
- **No Backend**: Client-side only (can add later)

## Future Enhancements

- Cloud sync & collaboration
- Rich text editor with formatting persistence
- Custom writing modes (poetry, screenplays, essays)
- Analytics dashboard with writing insights
- Community sharing & publishing
- Mobile app with offline support
- Distraction-free full-screen mode
- Custom themes & color pickers
