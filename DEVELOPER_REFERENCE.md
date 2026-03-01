# Developer Quick Reference Guide

## File Locations & Quick Navigation

### 3D & Graphics Components
- **LockMechanism.tsx** - 3D lock rendering
  - `GearMesh` - Rotating gear components
  - `LockCylinder` - Main lock body
  - `Key` - Interactive key element
  - `CameraController` - Camera movement
  - `Points` - Star field background

### UI & Interaction Components
- **UnlockingPage.tsx** - Main landing page
  - Touch event handlers
  - Rotation state management
  - Visual feedback UI
  - Auto-transition logic

- **SymposiumContext.tsx** - Global state
  - `useSymposium()` hook for unlock state

### Styling
- **tailwind.config.js** - Tailwind configuration
  - Custom animations
  - Color schemes
  - Responsive breakpoints

- **index.css** - Global styles
  - Custom animations
  - Lock mechanism styles
  - Mobile optimizations

---

## Common Tasks & Code Snippets

### Task 1: Change Unlock Rotation Requirement

**File**: `UnlockingPage.tsx` (Line ~37)
```typescript
// Current: ~286 degrees
if (keyRotation > Math.PI * 1.8 && !isUnlocked) {

// For 360 degrees:
if (keyRotation > Math.PI * 2 && !isUnlocked) {

// For 270 degrees:
if (keyRotation > Math.PI * 1.5 && !isUnlocked) {
```

### Task 2: Adjust Key Rotation Speed

**File**: `UnlockingPage.tsx` (Line ~70)
```typescript
// Reduce or increase multiplier
rotationRef.current = Math.max(0, Math.min(
  Math.PI * 2.2, 
  rotationRef.current + angle * 0.02  // Change 0.02 for speed
));
```

### Task 3: Change 3D Colors

**File**: `LockMechanism.tsx`

Lock body color:
```typescript
<meshPhongMaterial color="#1a1a2e" />  // Change hex code
```

Gear color:
```typescript
<meshPhongMaterial color="#00d9ff" />  // Cyan
```

Key color:
```typescript
<meshPhongMaterial color="#ffd700" />  // Gold
```

### Task 4: Add Sound Effects

**Step 1**: Create hook in `src/hooks/useSound.ts`
```typescript
export const useSound = () => {
  const playSound = (soundFile: string) => {
    const audio = new Audio(soundFile);
    audio.play().catch(e => console.log('Sound failed:', e));
  };
  return { playSound };
};
```

**Step 2**: Use in `UnlockingPage.tsx`
```typescript
import { useSound } from '../hooks/useSound';

const { playSound } = useSound();

// Play on drag
const handleTouchMove = () => {
  playSound('/sounds/gear-rotation.mp3');
};

// Play on unlock
if (keyRotation > Math.PI * 1.8) {
  playSound('/sounds/unlock.mp3');
}
```

### Task 5: Adjust Progress Bar Speed

**File**: `UnlockingPage.tsx` (Line ~170)
```typescript
<motion.div
  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
  initial={{ width: 0 }}
  animate={{ width: `${rotationPercent}%` }}
  transition={{ 
    type: 'spring', 
    stiffness: 100,    // Increase for snappier response
    damping: 20        // Decrease for bouncy effect
  }}
/>
```

### Task 6: Change Dark Theme Colors

**File**: `tailwind.config.js`
```javascript
colors: {
  'cyan-glow': '#00d9ff',      // Primary glow
  'blue-accent': '#0f3460',    // Secondary accent
  'dark-bg': '#0f0f1e',        // Background
}
```

Then use in components:
```typescript
className="bg-dark-bg text-cyan-glow"
```

### Task 7: Modify Camera Perspective

**File**: `LockMechanism.tsx` (Line ~100)
```typescript
<PerspectiveCamera 
  makeDefault 
  position={[0, 0.5, 2.5]}  // [x, y, z] - adjust distance
  fov={45}                   // Field of view
/>
```

### Task 8: Adjust Lighting

**File**: `LockMechanism.tsx` (Line ~107-110)
```typescript
<ambientLight intensity={0.6} color="#ffffff" />
<pointLight position={[5, 5, 5]} intensity={0.8} color="#00d9ff" />
<pointLight position={[-5, -5, -5]} intensity={0.4} color="#ff006e" />
<pointLight position={[0, 0, 5]} intensity={0.6} color="#ffd700" />
```

---

## State Management

### Global Unlock State
```typescript
import { useSymposium } from './context/SymposiumContext';

function MyComponent() {
  const { isUnlocked, setIsUnlocked } = useSymposium();
  
  const handleUnlock = () => {
    setIsUnlocked(true);
  };
  
  return <button onClick={handleUnlock}>Unlock</button>;
}
```

### Local Rotation State
```typescript
const [keyRotation, setKeyRotation] = useState(0);

// Update on drag
const handleDrag = (angle: number) => {
  setKeyRotation(prev => prev + angle);
};
```

---

## Performance Optimization Tips

### 1. Reduce 3D Complexity
In `LockMechanism.tsx`, decrease geometry segments:
```typescript
// Instead of 32 segments:
<cylinderGeometry args={[0.6, 0.6, 0.4, 16]} />
```

### 2. Lower Particle Count
In `Points` component (Line ~89):
```typescript
// Reduce from 1000 to 500
const p = new Float32Array(500);
```

### 3. Adjust DPR for Mobile
In Canvas props:
```typescript
dpr={[1, 1]}  // Lower from [1, 1.5]
```

### 4. Disable WebGL Features
```typescript
gl={{ 
  antialias: false,    // Disable AA
  depth: true,
  stencil: false
}}
```

---

## Debugging Tips

### Check 3D Rendering
```typescript
// Add logging in useFrame
useFrame(() => {
  console.log('Camera:', camera.position);
  console.log('Rotation:', keyRotation);
});
```

### Debug Touch Events
```typescript
const handleTouchMove = (e: React.TouchEvent) => {
  console.log('Touch:', e.touches[0].clientX, e.touches[0].clientY);
  // ... rest of code
};
```

### Monitor Performance
In Chrome DevTools:
- Open Performance tab
- Record interaction
- Look for dropped frames or long tasks
- Check GPU usage

### Check Bundle Size
```bash
npm add vite-plugin-visualizer
# Then run build and view analysis
```

---

## CSS Classes Quick Reference

### Animation Classes
```css
.lock-glow              /* Pulsing glow effect */
.gear-rotate            /* Rotating animation */
.cyan-glow-text         /* Cyan text with glow */
.animate-fade-in-up     /* Fade and slide up */
.animate-scale-in       /* Scale and fade */
.gradient-dark-blue     /* Dark blue gradient */
.gradient-dark-cyan     /* Dark cyan gradient */
```

### Utility Classes
```css
.no-select-drag         /* Prevent text selection during drag */
.transition-smooth      /* Smooth transitions */
.lock-container         /* Touch optimization for mobile */
```

---

## Environment Setup

### Required Node Modules
```json
{
  "react": "^18.3.1",
  "three": "^r128",
  "@react-three/fiber": "^8.15.24",
  "@react-three/drei": "^9.99.3",
  "framer-motion": "^10.16.18",
  "tailwindcss": "^3.4.1"
}
```

### TypeScript Types
Ensure types are available for:
- `react` & `react-dom`
- `three`
- `@react-three/fiber`
- `framer-motion`

---

## Browser DevTools Tricks

### React DevTools
1. Install React DevTools extension
2. Check component state in `SymposiumContext`
3. Monitor re-renders

### Three.js Debugging
1. Add stats monitor:
```typescript
import { Stats } from '@react-three/drei';
<Canvas>
  <Stats />
  {/* ... */}
</Canvas>
```

2. Check WebGL info:
```javascript
const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');
console.log(gl.getParameter(gl.VERSION));
```

---

## Deployment Checklist

Before deploying:
- [ ] Run `npm run build`
- [ ] Check for TypeScript errors: `npm run typecheck`
- [ ] Verify lock unlocks at correct rotation
- [ ] Test touch on mobile device
- [ ] Check page transition works
- [ ] Verify all console.logs are removed
- [ ] Set production environment variables
- [ ] Test on multiple browsers
- [ ] Check performance metrics
- [ ] Verify imagery/assets load correctly

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build           # Build optimized production bundle
npm run preview         # Preview production build locally

# Quality
npm run lint            # Run ESLint
npm run typecheck       # Check TypeScript types

# Package Management
npm outdated            # Check for outdated packages
npm update              # Update all packages
npm audit               # Check for vulnerabilities
```

---

## Resources & Documentation

- [React Documentation](https://react.dev)
- [Three.js Documentation](https://threejs.org/docs)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion Guide](https://www.framer.com/motion)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide)

---

**Last Updated**: February 26, 2026
**For Quick Access**: Bookmark this guide for fast reference during development!
