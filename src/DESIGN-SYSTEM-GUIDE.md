# Grand Gimeno Design System - Figma Make → Vercel

## ✅ PROVEN TACTICS FOR FIGMA MAKE → VERCEL

This design system uses **RGB CSS custom properties** - the most reliable approach for Tailwind + Vercel.

---

## 🎨 COLORS

### How It Works
Colors are defined in `/styles/globals.css` using **RGB format** (not hex):

```css
:root {
  --color-primary: 102 156 196;    /* #669CC4 */
  --color-charcoal: 82 85 87;       /* #525557 */
  --color-ivory: 238 237 225;       /* #EEEDE1 */
}
```

### Usage in Components

```jsx
// ✅ WORKS - Tailwind classes with opacity support
<div className="bg-primary">           {/* Solid blue */}
<div className="bg-primary/90">        {/* 90% opacity */}
<p className="text-primary">           {/* Blue text */}
<p className="text-foreground/60">     {/* 60% opacity charcoal */}
```

### Editing Colors
**Edit `/styles/globals.css` line 12-16:**

```css
--color-primary: 102 156 196;        /* Change blue */
--color-charcoal: 82 85 87;          /* Change dark */
--color-ivory: 238 237 225;          /* Change light */
```

**Convert hex to RGB:** `#669CC4` → `102 156 196`

---

## 📏 SPACING

### How It Works
Spacing is defined in CSS variables using **rem units**:

```css
:root {
  --space-section: 8rem;               /* 128px desktop */
  --space-section-mobile: 5rem;        /* 80px mobile */
  --space-xl: 2rem;                    /* 32px */
  --space-2xl: 3rem;                   /* 48px */
}
```

### Usage in Components

```jsx
// ✅ WORKS - Use Tailwind classes
<section className="mb-section">           {/* 8rem desktop, 5rem mobile */}
<div className="space-y-2xl">             {/* 3rem gap */}
<div className="px-xl">                   {/* 2rem padding */}

// ✅ WORKS - Container utilities
<div className="max-w-text mx-auto">      {/* 1200px max */}
<div className="max-w-content mx-auto">   {/* 1400px max */}
<div className="max-w-wide mx-auto">      {/* 1600px max */}
<div className="max-w-full mx-auto">      {/* 1800px max */}
```

### Editing Spacing
**Edit `/styles/globals.css` line 19-29:**

```css
--space-section: 8rem;               /* Desktop section spacing */
--space-section-mobile: 5rem;        /* Mobile section spacing */
--space-xl: 2rem;                    /* Change large spacing */
--space-2xl: 3rem;                   /* Change extra-large spacing */
```

---

## ✍️ TYPOGRAPHY

### How It Works
Fonts are defined as CSS variables:

```css
:root {
  --font-display: 'Cormorant Garamond', ui-serif, Georgia, serif;
  --font-mono: 'Space Mono', ui-monospace, monospace;
}
```

### Usage in Components

```jsx
// ✅ AUTOMATIC - All headings use Cormorant Garamond
<h1>Automatically styled</h1>
<h2>Automatically styled</h2>
<p>Automatically styled</p>

// ✅ MONO CLASS - Use Space Mono
<p className="mono">UPPERCASE ACCENT TEXT</p>
```

### Typography Specs
- **h1**: 600 weight, -0.02em tracking, 1.0 line-height
- **h2**: 600 weight, -0.01em tracking, 1.1 line-height
- **h3**: 500 weight, -0.01em tracking, 1.2 line-height
- **p**: 400 weight, 1.6 line-height
- **.mono**: 400 weight, 0.3em tracking, UPPERCASE, 9px

### Editing Typography
**Change fonts - Edit `/styles/globals.css` line 32-33:**

```css
--font-display: 'Cormorant Garamond', ui-serif, Georgia, serif;
--font-mono: 'Space Mono', ui-monospace, monospace;
```

**Don't forget to update the Google Fonts import at line 1-2!**

---

## 📦 CONTAINERS

### How It Works
Max-width containers for different content types:

```css
:root {
  --container-text: 75rem;         /* 1200px - Text */
  --container-content: 87.5rem;    /* 1400px - Content */
  --container-wide: 100rem;        /* 1600px - Wide */
  --container-full: 112.5rem;      /* 1800px - Full */
}
```

### Usage in Components

```jsx
// ✅ WORKS
<div className="max-w-text mx-auto">      {/* 1200px centered */}
<div className="max-w-content mx-auto">   {/* 1400px centered */}
<div className="max-w-wide mx-auto">      {/* 1600px centered */}
<div className="max-w-full mx-auto">      {/* 1800px centered */}
```

### Editing Containers
**Edit `/styles/globals.css` line 36-39:**

```css
--container-text: 75rem;         /* Change text container */
--container-content: 87.5rem;    /* Change content container */
```

---

## 🎯 BORDER RADIUS

### How It Works

```css
:root {
  --radius-sm: 0.125rem;           /* 2px */
  --radius-md: 0.25rem;            /* 4px */
  --radius-lg: 0.5rem;             /* 8px */
}
```

### Usage in Components

```jsx
// ✅ WORKS
<div className="rounded-sm">      {/* 2px */}
<div className="rounded-md">      {/* 4px */}
<div className="rounded-lg">      {/* 8px */}
```

### Editing Border Radius
**Edit `/styles/globals.css` line 42-44:**

```css
--radius-sm: 0.125rem;           /* Change small radius */
--radius-md: 0.25rem;            /* Change medium radius */
--radius-lg: 0.5rem;             /* Change large radius */
```

---

## 🚀 WHY THIS WORKS ON VERCEL

### ✅ RGB Format with `<alpha-value>`
```js
// tailwind.config.js
primary: 'rgb(var(--color-primary) / <alpha-value>)'
```
This allows Tailwind to generate opacity variants:
- `bg-primary` → `rgb(102 156 196)`
- `bg-primary/90` → `rgb(102 156 196 / 0.9)`
- `text-primary/60` → `rgb(102 156 196 / 0.6)`

### ✅ Fallback Utilities in CSS
All critical utilities are hardcoded in `@layer utilities` with `!important`:
```css
.text-primary {
  color: #669CC4 !important;  /* Always works */
}
```

### ✅ CSS Variables for Everything
- Colors, spacing, typography, containers all in `:root`
- Single source of truth
- Change once, updates everywhere

---

## 📝 EDITING CHECKLIST

### To Change a Color:
1. Edit RGB value in `/styles/globals.css` `:root`
2. Edit fallback hex in `@layer utilities` (if using hardcoded utilities)
3. Push to Vercel - auto-deploys

### To Change Spacing:
1. Edit `--space-*` values in `/styles/globals.css` `:root`
2. Push to Vercel - auto-deploys

### To Change Typography:
1. Edit `--font-*` values in `/styles/globals.css` `:root`
2. Update Google Fonts import if changing fonts
3. Push to Vercel - auto-deploys

---

## 🔥 EXAMPLE: Changing Blue to Purple

**Edit `/styles/globals.css`:**

```css
/* Line 12 - Change RGB value */
--color-primary: 147 51 234;        /* #9333ea Purple */

/* Line 240 - Change fallback */
.text-primary {
  color: #9333ea !important;
}
```

**Result:** All blue text/buttons → purple everywhere. ✅

---

## 📦 FILES TO EDIT

- `/styles/globals.css` - **ALL design system values**
- `/tailwind.config.js` - **References CSS variables** (rarely edit)

**Never edit components directly for design changes. Always edit CSS.**
