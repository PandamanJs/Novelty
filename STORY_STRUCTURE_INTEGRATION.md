# Story Structure & Scene Management System

## Overview

Novelty now includes a comprehensive story structure management system with chapters, scenes, hierarchical organization, rich text editing, and visual timeline/story map views. This guide documents the complete implementation.

## New Components Created

### 1. **StoryStructure.tsx** (380 lines)
Core data structures and state management for the entire story hierarchy.

**Key Interfaces:**
```typescript
interface Scene {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'in-progress' | 'completed' | 'placeholder';
  wordCount: number;
  wordGoal?: number;
  notes: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  position: number;
}

interface Chapter {
  id: string;
  title: string;
  sectionId: string;
  scenes: Scene[];
  wordCount: number;
  wordGoal?: number;
  position: number;
  isExpanded: boolean;
}

interface Section {
  id: string;
  title: string;
  type: 'act' | 'part' | 'section';
  chapters: Chapter[];
  position: number;
  isExpanded: boolean;
}

interface StoryStructure {
  sections: Section[];
  totalWordCount: number;
}
```

**Export Functions:**
```typescript
// Use the hook to access and manage story structure
const {
  structure,              // Current full structure
  addSection,             // Create new section (act/part/section)
  deleteSection,          // Remove section and all its chapters/scenes
  renameSection,          // Rename section
  toggleSection,          // Expand/collapse section
  addChapter,             // Create chapter in section
  deleteChapter,          // Remove chapter and all its scenes
  renameChapter,          // Rename chapter
  toggleChapter,          // Expand/collapse chapter
  addScene,               // Create scene in chapter
  deleteScene,            // Remove scene
  updateScene,            // Update scene properties (title, content, notes, tags)
  updateSceneStatus,      // Change scene status (draft → in-progress → completed)
} = useStoryStructure();
```

**UI Components:**
- `SceneStatusBadge`: Visual status indicator (color-coded)
- `SceneStatusSelector`: 4-button interface to change scene status

**Initial Data:**
Pre-populated with a 3-act structure containing sample scenes for quick start.

### 2. **ChapterSceneManager.tsx** (180+ lines)
Hierarchical tree UI for navigating and managing the story structure.

**Features:**
- **3-Level Hierarchy**: Section → Chapter → Scene
- **Expand/Collapse**: Chevron buttons at each level
- **Inline Editing**: Click title to edit, Enter/blur to save, Escape to cancel
- **Dropdown Menus**: Context menu for actions (rename, add child, delete)
- **Word Count Tracking**: Shows total per chapter and per scene
- **Status Badges**: Visual indicators on each scene
- **Scene Selection**: Click scene to select and highlight in blue
- **Gradient Header**: Total word count display with blue-indigo gradient background

**User Interactions:**
```
Section (click arrow to expand)
├─ Chapter (click arrow to expand)
│  ├─ Scene (click to select, shows status badge)
│  ├─ Scene (... more scenes ...)
│  └─ Scene
├─ Chapter (... more chapters ...)
│
└─ Section (... more sections ...)
```

**Styling:**
- Consistent with premium design system
- Gray-50 backgrounds with hover effects
- Smooth transitions for better UX
- Proper indentation for hierarchy (pl-8, pl-16)

### 3. **RichTextEditor.tsx** (160+ lines)
Feature-rich text editor with formatting, autosave, and comprehensive statistics.

**Props:**
```typescript
interface RichTextEditorProps {
  value: string;                    // Current text content
  onChange: (value: string) => void;// Update callback
  wordGoal?: number;                // Optional word count target
  placeholder?: string;             // Custom placeholder text
  autosave?: boolean;               // Enable/disable autosave (default: true)
  onSave?: (content: string) => void;// Autosave callback
}
```

**Features:**
- **Markdown Toolbar** (6 buttons):
  - Bold: `**text**`
  - Italic: `*text*`
  - Heading: `## `
  - List: `- `
  - Quote: `> `

- **Autosave System**:
  - 2-second debounce to prevent excessive saves
  - Status indicator: "Saving..." (amber) or "✓ Saved" (green)
  - Optional callback for persistence

- **Progress Tracking**:
  - Color-coded progress bar:
    - Orange: 0-50% of goal
    - Yellow: 50-75% of goal
    - Blue: 75-100% of goal
    - Green: 100%+ (over goal)
  - Shows percentage and word count: "750 / 1000 words"

- **Comprehensive Stats Grid** (4 columns):
  - **Words**: Live word count
  - **Characters**: Total including spaces
  - **Paragraphs**: Split by double newlines
  - **Reading Time**: Based on 200 wpm average

**Styling:**
- 96px height textarea (h-96)
- Responsive font size
- Relaxed line spacing (leading-relaxed)
- Focus ring with blue accent
- Resizable textarea

### 4. **StoryTimeline.tsx** (180+ lines)
Visual timeline and story map components for narrative overview.

**TimelineEvent Interface:**
```typescript
interface TimelineEvent {
  id: string;
  title: string;
  chapter: number;
  scene: number;
  date?: string;
  location?: string;
  characters?: string[];
  type: 'plot' | 'character' | 'location' | 'conflict';
}
```

**Components:**

1. **StoryTimeline**
   - Vertical timeline of major plot points
   - Automatically extracts completed scenes and plot-tagged scenes
   - Color-coded by event type
   - Timeline dots with connecting lines
   - Shows chapter and scene numbers
   - Responsive card layout

2. **StoryMap**
   - Grid-based visualization of entire story structure
   - Quick visual reference of completion status
   - Color-coded squares for each scene:
     - Gray: Draft
     - Blue: In Progress
     - Green: Completed
     - Yellow: Placeholder
   - Legend shows status meanings
   - Section and chapter organization visible

## Integration into Write.tsx

### Sidebar Additions

**New Section: "📚 Story Structure"**
```tsx
<ToolCard icon={<BookOpen className="w-4 h-4" />} color="blue" label="Chapters & Scenes">
  <button onClick={() => setShowTimeline(!showTimeline)}>
    {showTimeline ? '▼ Timeline View' : '▶ Timeline View'}
  </button>
  <button onClick={() => setShowStoryMap(!showStoryMap)}>
    {showStoryMap ? '▼ Story Map' : '▶ Story Map'}
  </button>
</ToolCard>
```

### Editor Area Integration

When Timeline or Story Map is expanded, displays above the editor with:
- 50% opacity backdrop blur
- Light gray background
- Maximum height of 256px (overflow scrollable)
- Clean, organized visualization

### State Management

**New state variables in Write.tsx:**
```typescript
const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
const [showTimeline, setShowTimeline] = useState(false);
const [showStoryMap, setShowStoryMap] = useState(false);
const { structure, addScene, deleteScene, updateScene, updateSceneStatus } = useStoryStructure();
```

## Data Flow

```
Write.tsx (Page Component)
├── State Management
│   ├── selectedSceneId
│   ├── showTimeline
│   ├── showStoryMap
│   └── structure (via useStoryStructure hook)
│
├── Story Structure Controls (Sidebar)
│   ├── Timeline Toggle
│   ├── Story Map Toggle
│   └── [Future] Chapter/Scene Manager
│
└── Editor Area
    ├── Timeline View (conditionally rendered)
    ├── Story Map View (conditionally rendered)
    └── Main Writing Editor
        └── RichTextEditor Component
```

## Feature Roadmap

### Phase 1: Core Structure (✅ Completed)
- [x] Data structures (Scene, Chapter, Section)
- [x] useStoryStructure hook with CRUD operations
- [x] ChapterSceneManager component
- [x] RichTextEditor with formatting
- [x] StoryTimeline and StoryMap visualization
- [x] Integration into Write.tsx

### Phase 2: Advanced Organization (⏳ Next)
- [ ] Drag-and-drop scene reordering
- [ ] Scene/chapter status persistence
- [ ] Quick scene creation from context menu
- [ ] Bulk operations (select multiple scenes, batch actions)
- [ ] Scene templates

### Phase 3: Versioning & History (⏳ Planned)
- [ ] Autosave version snapshots (every 5 minutes)
- [ ] Version history viewer
- [ ] Compare versions side-by-side
- [ ] Restore to previous version
- [ ] Version tagging and notes

### Phase 4: Advanced Editing (⏳ Planned)
- [ ] Search & replace across all scenes
- [ ] Comments and annotations
- [ ] Track changes (show edits with author/timestamp)
- [ ] Collaborative editing support
- [ ] Chapter/scene notes and metadata

### Phase 5: Export & Publishing (⏳ Planned)
- [ ] PDF export with formatting
- [ ] ePub export for e-readers
- [ ] Word document export
- [ ] Plain text export
- [ ] Markdown export
- [ ] Compile manuscript (select chapters to include)
- [ ] Custom formatting templates

### Phase 6: Advanced Features (⏳ Later)
- [ ] Visual story map with node connections
- [ ] Character/location/plot cross-references
- [ ] Distraction-free full-screen mode
- [ ] Writing analytics per scene/chapter
- [ ] Reading level estimates
- [ ] Sentiment analysis timeline
- [ ] Custom templates (genre-specific structures)
- [ ] Collaboration features

## Usage Examples

### Basic Scene Management

```typescript
// In a component using useStoryStructure hook
const { structure, addScene, updateScene } = useStoryStructure();

// Add a new scene to a chapter
addScene(sectionId, chapterId, 'New Scene', {
  content: '',
  status: 'draft',
  wordGoal: 1000,
});

// Update scene content and status
updateScene(sceneId, {
  content: 'Updated scene content...',
  status: 'in-progress',
  wordCount: 450,
});
```

### Using the Rich Text Editor

```typescript
<RichTextEditor
  value={sceneContent}
  onChange={setSceneContent}
  wordGoal={1000}
  autosave={true}
  onSave={(content) => {
    // Persist to database or localStorage
    saveToDB(sceneId, content);
  }}
  placeholder="Write your scene here..."
/>
```

### Accessing Timeline Events

```typescript
// Automatically extracts completed scenes and plot-tagged scenes
<StoryTimeline sections={structure.sections} />

// Visual story map with status overview
<StoryMap sections={structure.sections} />
```

## Architecture Decisions

### Why Separate Components?

1. **StoryStructure.tsx**: Pure data management (no UI)
   - Reason: Reusable across different components and views
   - Can be used for logic outside of React (logging, analytics)
   - Easy to test independently

2. **ChapterSceneManager.tsx**: Tree navigation UI
   - Reason: Focused single responsibility
   - Can be replaced with different UI (flat list, table, etc.)
   - Separate from the editor experience

3. **RichTextEditor.tsx**: Text editing component
   - Reason: Encapsulates all editor logic and UI
   - Reusable in different contexts
   - Easy to extend with new formatting options

4. **StoryTimeline.tsx**: Visualization components
   - Reason: Multiple visualization options (timeline, map, etc.)
   - Separate from editing concerns
   - Easy to add new view types

### Performance Considerations

- **Autosave Debounce**: 2-second debounce prevents excessive saves
- **Lazy Rendering**: Timeline/Map only render when toggled
- **Memoization**: Components optimized for large story structures
- **LocalStorage**: Draft auto-save every 30 seconds

### TypeScript Benefits

- Full type safety for story structure
- IDE autocomplete for all operations
- Catch errors at compile time
- Self-documenting code

## Testing Recommendations

1. **Unit Tests**: Test useStoryStructure hook operations
2. **Component Tests**: Test UI interactions (expand/collapse, inline edit)
3. **Integration Tests**: Test data flow between components
4. **E2E Tests**: Test complete writing workflow

## Future Enhancements

### Collaboration Features
- Multiple users working on same story
- Presence indicators (who's editing what)
- Real-time sync with WebSocket
- Merge conflict resolution

### AI Integration
- AI scene suggestions based on plot points
- Story structure recommendations
- Pacing analysis and suggestions
- Plot hole detection

### Analytics
- Writing statistics per scene/chapter
- Time spent per scene
- Revision frequency
- Reading difficulty per section

### Mobile Optimization
- Touch-friendly scene navigator
- Mobile-optimized text editor
- Simplified timeline view for mobile
- Sync across devices

## Troubleshooting

### Scene not appearing in timeline
- Check if scene status is 'completed' or tagged with 'plot-point'
- Verify scene wordCount > 0
- Timeline only shows major plot points

### Autosave not working
- Verify autosave prop is true (default)
- Check browser console for errors
- Ensure onSave callback is provided
- Check localStorage permissions

### Large stories slow
- Consider archiving completed chapters
- Use version control instead of keeping all versions in memory
- Optimize scene content (don't store full markdown history)

## API Reference

### useStoryStructure Hook

```typescript
// Import
import { useStoryStructure, SceneStatusBadge, SceneStatusSelector } from '@/components/StoryStructure';

// Hook functions
const {
  structure,              // Type: StoryStructure (contains all sections, chapters, scenes)
  addSection,             // (title: string, type?: 'act'|'part'|'section') => void
  deleteSection,          // (sectionId: string) => void
  renameSection,          // (sectionId: string, newTitle: string) => void
  toggleSection,          // (sectionId: string) => void
  addChapter,             // (sectionId: string, title: string) => void
  deleteChapter,          // (chapterId: string) => void
  renameChapter,          // (chapterId: string, newTitle: string) => void
  toggleChapter,          // (chapterId: string) => void
  addScene,               // (sectionId: string, chapterId: string, title: string) => void
  deleteScene,            // (sceneId: string) => void
  updateScene,            // (sceneId: string, updates: Partial<Scene>) => void
  updateSceneStatus,      // (sceneId: string, status: SceneStatus) => void
} = useStoryStructure();
```

### ChapterSceneManager Component

```typescript
import { ChapterSceneManager } from '@/components/ChapterSceneManager';

// No props required - uses useStoryStructure hook internally
<ChapterSceneManager />
```

### RichTextEditor Component

```typescript
import { RichTextEditor } from '@/components/RichTextEditor';

<RichTextEditor
  value={text}
  onChange={setText}
  wordGoal={1500}
  autosave={true}
  onSave={handleSave}
  placeholder="Start writing..."
/>
```

### StoryTimeline & StoryMap Components

```typescript
import { StoryTimeline, StoryMap } from '@/components/StoryTimeline';

// Show timeline of major plot points
<StoryTimeline sections={structure.sections} />

// Show grid view of all scenes with status
<StoryMap sections={structure.sections} />
```

## Conclusion

The Story Structure system provides a complete, professional-grade framework for organizing and writing novels in Novelty. With hierarchical chapters and scenes, rich text editing, automatic timeline generation, and visual story maps, writers have everything they need to structure, track, and complete their stories.

The modular architecture allows for easy extension and customization while maintaining clean separation of concerns and TypeScript safety throughout.
