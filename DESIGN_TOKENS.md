# Novelty Design Token Reference

Quick reference for all design tokens, colors, animations, and component styles used in the Novelty platform.

---

## Color Tokens

### Primary Colors
```
--primary: HSL 285 15% 52%    → #817395 (Purple)
--primary-rgb: 129, 115, 149
```

### Secondary Colors
```
--secondary: HSL 200 20% 70%  → #91B2C7 (Blue-Gray)
--secondary-rgb: 145, 178, 199
```

### Tertiary Colors
```
--tertiary: HSL 200 18% 62%   → #789CAC (Slate-Blue)
--tertiary-rgb: 120, 156, 172
```

### Accent Colors
```
Cyan:   HSL 200 70% 50%       → #00CCFF
Orange: HSL 35 85% 55%        → #E8A500
Blue:   HSL 200 70% 50%       → #3399FF
Pink:   HSL 330 85% 60%       → #FF3366
```

### Neutrals
```
--background: HSL 40 15% 8%   → #1A1410 (Deep Dark)
--foreground: HSL 40 20% 92%  → #E8DFD0 (Cream)
--muted: HSL 200 12% 32%      → #3D4A52 (Muted)
--border: HSL 200 15% 20%     → #2A3A42 (Border)
```

---

## Glass Morphism Classes

### Standard Glass Effect
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.08) → rgba(255, 255, 255, 0.02)
  backdrop-filter: blur(24px) saturate(180%)
  border: 1px solid rgba(255, 255, 255, 0.15)
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)
  transition: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)
}
```

### Small Glass Effect
```css
.glass-effect-sm {
  backdrop-filter: blur(12px) saturate(180%)
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08)
  border: 1px solid rgba(255, 255, 255, 0.12)
}
```

### Large Glass Effect
```css
.glass-effect-lg {
  backdrop-filter: blur(32px) saturate(180%)
  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.2)
}
```

---

## Button Classes

### Premium Button
```css
.btn-premium {
  background: linear-gradient(135deg, hsl(270 85% 55%), hsl(270 75% 45%))
  border: 1px solid rgba(255, 255, 255, 0.2)
  box-shadow: 0 8px 24px rgba(129, 115, 149, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)
  padding: 1.5rem 2rem
  border-radius: 1rem
  font-weight: 600
}

.btn-premium:hover {
  transform: scale(1.05)
  box-shadow: 0 16px 40px rgba(129, 115, 149, 0.4)
}

.btn-premium:active {
  transform: scale(0.95)
}
```

### Secondary Button (Outline)
```css
Button with glass-effect + border-purple-500/30 + hover:border-purple-500/50
```

---

## Card Styles

### Premium Card
```css
.card-premium {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2))
  backdrop-filter: blur(24px)
  border: 1px solid rgba(255, 255, 255, 0.15)
  border-radius: 1.5rem
  padding: 2rem
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)
}

.card-premium:hover {
  transform: translateY(-1.5rem)
  border-color: rgba(255, 255, 255, 0.25)
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3)
}
```

### Feature Card (Color Variants)
```css
/* Purple variant */
background: from-purple-500/10 to-black/40
border: border-purple-500/20
hover:border-purple-500/50
hover:shadow-purple-500/20

/* Cyan variant */
background: from-cyan-500/10 to-black/40
border: border-cyan-500/20
hover:shadow-cyan-500/20

/* Orange variant */
background: from-orange-500/10 to-black/40
border: border-orange-500/20
hover:shadow-orange-500/20

/* Blue variant */
background: from-blue-500/10 to-black/40
border: border-blue-500/20
hover:shadow-blue-500/20
```

---

## Animation Tokens

### Easing Functions
```css
Spring (Bounce):    cubic-bezier(0.34, 1.56, 0.64, 1)
Standard:           cubic-bezier(0.25, 0.46, 0.45, 0.94)
Ease In Out:        cubic-bezier(0.42, 0, 0.58, 1)
Ease Out:           cubic-bezier(0.13, 0.93, 0.36, 0.95)
Ease In:            cubic-bezier(0.95, 0.05, 0.795, 0.035)
```

### Duration
```css
Fast:       0.15s
Standard:   0.3s - 0.4s
Slow:       0.6s
```

### Animations

#### Fade In Up
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
Duration: 0.6s, Easing: Spring
```

#### Pulse Glow
```css
@keyframes pulseGlow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
Duration: 3s, Iteration: infinite
```

#### Float
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
Duration: 6s, Iteration: infinite
```

#### Shimmer
```css
@keyframes shimmer {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}
Duration: 2s, Iteration: infinite
```

#### Gradient Flow
```css
@keyframes gradientFlow {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}
Duration: 3s, Iteration: infinite
```

#### Ripple (Button Click)
```css
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
Duration: 0.6s
```

### Stagger Delays
```css
.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
.stagger-4 { animation-delay: 0.4s; }
```

### Utility Animations
```css
.rotate-slow        → rotate(0deg) over 20s infinite
.animate-float      → float effect
.animate-shimmer    → shimmer effect
.pulse-glow         → pulse effect
.gradient-flow      → gradient animation
```

---

## Typography

### Font Stack
```
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Font Sizes (Clamp for Responsiveness)
```css
H1: clamp(2.25rem, 5vw, 3.5rem)    /* 36px → 56px */
H2: clamp(1.875rem, 4vw, 3rem)     /* 30px → 48px */
H3: clamp(1.5rem, 3vw, 2.25rem)    /* 24px → 36px */
Body: 1rem (16px)
Small: 0.875rem (14px)
```

### Font Weights
```css
Light:   400
Regular: 600 (preferred for UI)
Bold:    700
Extra:   800
```

### Letter Spacing
```css
Luxury: -0.02em
Standard: 0em
Wide: 0.05em
```

### Line Heights
```css
Tight:   1.2
Normal:  1.5
Loose:   1.8
```

---

## Shadow System

### Light Shadow
```css
0 4px 16px rgba(0, 0, 0, 0.08)
```

### Medium Shadow
```css
0 8px 32px rgba(0, 0, 0, 0.1)
```

### Heavy Shadow
```css
0 16px 48px rgba(0, 0, 0, 0.2)
```

### Colored Shadows (by accent)
```css
Purple:  0 8px 24px rgba(129, 115, 149, 0.3)
Cyan:    0 8px 24px rgba(0, 204, 255, 0.2)
Orange:  0 8px 24px rgba(232, 165, 0, 0.25)
Blue:    0 8px 24px rgba(51, 153, 255, 0.2)
```

---

## Spacing Scale

### Tailwind Default + Custom Adjustments
```css
px: 0.25rem (4px)
0.5: 0.125rem (2px)
1: 0.25rem (4px)
2: 0.5rem (8px)
3: 0.75rem (12px)
4: 1rem (16px)
6: 1.5rem (24px)
8: 2rem (32px)
12: 3rem (48px)
16: 4rem (64px)
20: 5rem (80px)
```

---

## Responsive Breakpoints

```css
sm:  640px   (Small devices - phones)
md:  768px   (Medium devices - tablets)
lg:  1024px  (Large devices - desktops)
xl:  1280px  (Extra large - widescreen)
```

---

## Hover & Focus States

### Button Hover
```css
transform: scale(1.05)
box-shadow: enhanced
border: increased opacity
```

### Button Focus
```css
outline: 2px solid currentColor
outline-offset: 2px
```

### Card Hover
```css
transform: translateY(-6px)
border-color: increased opacity
box-shadow: 0 16px 48px rgba(...)
```

### Input Focus
```css
box-shadow: 0 0 0 3px rgba(primary, 0.1), inset 0 2px 4px rgba(0, 0, 0, 0.05)
border-color: primary
background: slight brightening
```

---

## Accessibility Features

### Color Contrast
- **Text on Dark**: WCAG AA (4.5:1 minimum)
- **Text on Light**: WCAG AA (4.5:1 minimum)
- **Large Text**: WCAG AA (3:1 minimum)

### Focus Indicators
- Visible focus outlines: 2px solid
- Sufficient contrast ratio: 3:1
- Not just relying on color

### Touch Targets
- Minimum size: 44x44px
- Adequate spacing between targets: 8px

### Motion Preferences
- Respects `prefers-reduced-motion`
- Disables animations when user preference set

---

## Component-Specific Tokens

### Navigation
```css
Active Link:       color-primary + glass-effect
Hover Link:        color-secondary + glass-effect-sm
Inactive Link:     text-muted-foreground
Separator:         text-border (•)
```

### Form Elements
```css
Input Focus:       double box-shadow (outer + inset)
Label:             text-foreground, font-500
Required:          color-error after content
Error State:       border-error, text-error
```

### Icons
```css
Size:              w-4 h-4 (small), w-6 h-6 (medium), w-8 h-8 (large)
Stroke Width:      1.5 or 2
Color:             Inherits from parent or specific color class
Hover:             Enhanced color, optional rotation
```

---

## Usage Examples

### Creating with Premium Styling
```tsx
/* Premium Card */
<div className="card-premium bg-gradient-to-br from-purple-500/10 to-black/40">
  
/* Button with Icon */
<button className="btn-premium group">
  <span>Action</span>
  <Icon className="group-hover:translate-x-1 transition-transform" />
</button>

/* Glass Badge */
<div className="glass-effect px-4 py-2 rounded-full border border-purple-500/20">
  Premium Badge
</div>

/* Animated Background */
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div className="animate-float blur-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/10 rounded-full w-72 h-72" />
</div>
```

---

## Performance Considerations

### GPU Acceleration
- Uses `transform: translateY()` for smooth animations
- Hardware-accelerated opacity changes
- Will-change applied to frequently animated elements

### Blur Performance
- Blur values: 12px (light), 24px (standard), 32px (heavy)
- Avoid blur on very large elements
- Use `backdrop-filter` with caution on mobile

### Animation Performance
- Spring easing for organic feel
- Staggered animations prevent layout thrashing
- CSS transitions preferred over JavaScript

---

## Browser Support

### Modern Browsers (Full Support)
- Chrome 88+
- Firefox 85+
- Safari 15+
- Edge 88+

### CSS Features Used
- CSS Grid & Flexbox ✅
- CSS Variables (Custom Properties) ✅
- Backdrop Filter ✅
- CSS Animations ✅
- Gradient Text (bg-clip-text) ✅

---

## Quick Copy-Paste Templates

### Premium Feature Card
```tsx
<div className="group relative overflow-hidden p-8 rounded-3xl 
              bg-gradient-to-br from-purple-500/10 to-black/40 
              backdrop-blur-md border border-purple-500/20 
              hover:border-purple-500/50 hover:shadow-2xl 
              hover:shadow-purple-500/20 transition-all duration-300">
  <div className="relative z-10">
    {/* Content */}
  </div>
</div>
```

### Premium CTA Section
```tsx
<section className="max-w-4xl mx-auto py-20 relative z-10">
  <div className="group relative overflow-hidden p-12 rounded-3xl 
              bg-gradient-to-br from-purple-500/20 via-black/60 to-blue-500/10 
              backdrop-blur-md border-2 border-purple-500/40 
              hover:border-purple-500/60 hover:shadow-2xl 
              hover:shadow-purple-500/30">
    <h2 className="text-4xl font-bold text-white mb-6">Heading</h2>
    <Button className="btn-premium">Action</Button>
  </div>
</section>
```

---

## Maintenance

- **Update Frequency**: Quarterly design reviews
- **Breaking Changes**: None expected for v1.0
- **Future Additions**: Custom theme switcher, dark mode variant
- **Deprecations**: None currently planned

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Maintained By**: Novelty Design System  
**License**: Internal Use
