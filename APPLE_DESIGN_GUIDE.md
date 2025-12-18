# Apple Design System - Visual Guide for Novelty

## Color Palette Reference

### Primary Colors
```
Background:     #FFFFFF (HSL: 0 0% 100%)
Foreground:     #000000 (HSL: 0 0% 0%)
Primary Blue:   #0071E3 (HSL: 210 100% 44%)
Secondary Gray: #F0F0F0 (HSL: 0 0% 94%)
```

### Accent Colors
```
Success Green:  #34C759 (HSL: 140 71% 46%)
Warning Orange: #FF9500 (HSL: 38 92% 50%)
Error Red:      #FF3B30 (HSL: 0 84% 60%)
Border:         #E5E5E7 (HSL: 0 0% 90%)
```

### Text Hierarchy
```
Heading 1:  2.5rem / 1 - Bold
Heading 2:  2rem / 1 - Bold
Heading 3:  1.5rem / 1.25 - Semibold
Heading 4:  1.25rem / 1.25 - Semibold
Body:       1rem / 1.5 - Normal
Caption:    0.875rem / 1.5 - Normal (Muted)
```

## Component Styling

### Button: Apple Primary (.btn-apple)
```css
.btn-apple {
  background: hsl(210 100% 44%);      /* Apple Blue */
  color: white;
  border: none;
  border-radius: 0.5rem;              /* 8px - Apple style */
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: all 0.3s ease;
}

.btn-apple:hover {
  background: hsl(210 100% 38%);      /* Slightly darker */
  transform: scale(1.02);
}

.btn-apple:active {
  transform: scale(0.98);
}
```

### Button: Secondary (.btn-secondary)
```css
.btn-secondary {
  background: hsl(0 0% 94%);          /* Light gray */
  color: black;
  border: 1px solid hsl(0 0% 85%);
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: hsl(0 0% 88%);
  border-color: hsl(0 0% 75%);
}
```

### Card (.card-apple)
```css
.card-apple {
  background: hsl(0 0% 100%);         /* White */
  border: 1px solid hsl(0 0% 85%);
  border-radius: 0.75rem;             /* 12px */
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.card-apple:hover {
  border-color: hsl(0 0% 75%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
```

### Input Field
```css
.input {
  background: white;
  border: 1px solid hsl(0 0% 85%);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: hsl(210 100% 44%);    /* Apple Blue */
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.1);
}
```

## Typography Standards

### Font Stack
```
-apple-system, BlinkMacSystemFont, 'Sora', 'Segoe UI', sans-serif
```

This provides:
- macOS: System font (San Francisco)
- iOS: System font (San Francisco)
- Windows: Sora or Segoe UI
- Linux: Segoe UI or fallback

### Letter Spacing
- Default: -0.01em (tightens text, Apple standard)
- Headings: -0.02em (more compressed)
- UI Labels: 0em (normal)

### Font Weights Used
- Light: 300 (introductory text)
- Normal: 400 (body text)
- Medium: 500 (buttons, labels)
- Semibold: 600 (sub-headings)
- Bold: 700 (headings)

## Animation Standards

### Fade In Up (.fade-in-up)
```css
animation: fadeInUp 0.6s ease-out forwards;
```
Use for: Initial page load, progressive reveal

### Fade In (.fade-in)
```css
animation: fadeIn 0.6s ease-out forwards;
```
Use for: Background elements, subtle appearance

### Slide In (.slide-in-right, .slide-in-left)
```css
animation: slideInRight 0.6s ease-out forwards;
```
Use for: Sidebar entries, sequential reveals

### Float (.float)
```css
animation: float 6s ease-in-out infinite;
```
Use for: Subtle continuous motion (very subtle)

### Duration & Easing
- **Fast**: 0.2s (hover states, quick feedback)
- **Standard**: 0.3s (most interactions)
- **Slow**: 0.6s (page load animations)
- **Easing**: ease-out for entrance, ease-in for exit

## Spacing Scale

```
4px    - xs (gaps between tight elements)
8px    - sm (small padding/gaps)
12px   - md (standard padding)
16px   - lg (generous padding)
24px   - xl (large sections)
32px   - 2xl (major sections)
48px   - 3xl (hero sections)
```

## Shadow System

### Subtle (Hover States)
```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
```
Use for: Card hovers, button focus

### Medium
```css
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
```
Use for: Elevated cards, modals

### Large (Not Often Used)
```css
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
```
Use for: Dropdowns, popovers

**Rule**: Never use colored shadows (no blue/purple glows)

## Border Radius Standards

```
sm:  0.25rem (4px)  - Very subtle curves
md:  0.5rem (8px)   - Standard (buttons, inputs)
lg:  0.75rem (12px) - Cards, containers
xl:  1rem (16px)    - Large containers
full: 9999px        - Pills/badges
```

## Opacity Guidelines

```
100% - Full opacity (primary text, main elements)
70%  - Secondary text (descriptions, metadata)
50%  - Tertiary text (hints, disabled states)
10%  - Backgrounds (hover states, subtle fills)
```

## Dark Mode Support (Future)

When implementing dark mode, invert:
- Background: `#000000`
- Foreground: `#FFFFFF`
- Secondary: `#1A1A1A`
- Borders: `#424245`
- Keep Blue: `#0071E3` (works on both)

## Accessibility Notes

### Contrast Ratios
- ✅ Black text on white: 21:1 (AAA)
- ✅ Blue button on white: 4.5:1 (AA)
- ✅ Gray text on white: 7.1:1 (AA)
- ✅ All combinations meet WCAG AA

### Interactive Elements
- Minimum size: 44×44px (touch targets)
- Focus states: Always visible
- Color not sole indicator: Always pair with icons/text

### Keyboard Navigation
- Tab order: Left to right, top to bottom
- Focus visible: Blue outline (2px)
- Focus color: Apple Blue (#0071E3)

## Real-World Examples

### Hero Section
- Heading: Bold, black, 3-4rem
- Subheading: Normal, gray, 1.125rem
- CTA: Apple blue button with rounded corners
- Background: White, no gradients

### Feature Cards
- 2-3 cards per row (responsive)
- Icon: Small colored background (soft color)
- Title: Semibold black, 1.125rem
- Description: Normal gray, 1rem
- Hover: Subtle shadow, border change

### Navigation
- Logo: Small icon in blue background
- Links: Black text, no underline normally
- Active: Text color change or underline (not background)
- Mobile: Clean hamburger menu

### Footer
- Background: White with top border
- Text: Gray, small size
- Links: Hover changes to black
- Spacing: 3rem padding top/bottom

---

**Design System Version**: 1.0 Apple Light
**Created**: 2024
**Status**: Active
