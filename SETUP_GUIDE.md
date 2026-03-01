# Setup & Deployment Guide for YANTRA 26 Interactive Lock

## Initial Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

This will install all required packages:
- **React 18.3** - UI framework
- **Three.js & React Three Fiber** - 3D graphics
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling

### 2. Verify Installation
Check that all packages were installed correctly:
```bash
npm list three @react-three/fiber framer-motion
```

### 3. Start Development Server
```bash
npm run dev
```

The development server will start at `http://localhost:5173`

### 4. Build for Production
```bash
npm build
```

This creates an optimized production build in the `dist/` folder.

---

## Project Structure Overview

### Core Components

**LockMechanism.tsx** - 3D Rendering
- Handles all Three.js 3D rendering
- Components: Lock cylinder, rotating gears, key, lighting system
- Adapts to device performance automatically

**UnlockingPage.tsx** - Main Landing Page
- Interactive landing page with unlock mechanism
- Touch and mouse event handling
- Progress tracking and visual feedback
- Auto-transition on unlock

**SymposiumContext.tsx** - State Management
- Global context for unlock state
- Manages page navigation flow
- Persists unlock state (optional: add localStorage)

### Utilities & Styling
- **Tailwind CSS** - Responsive design system
- **Framer Motion** - Page transitions and animations
- **Custom CSS** - Specialized effects and dark theme

---

## Key Features Walkthrough

### 1. 3D Lock System
Located in `LockMechanism.tsx`:
- **Cylinder Geometry**: Main lock body
- **Three Gears**: Rotate at different speeds based on key rotation
- **Golden Key**: Interactive element that rotates with user input
- **Dynamic Lighting**: Multiple light sources for realistic rendering
- **Star Field**: Background particle system for ambiance

### 2. Touch Interaction System
Located in `UnlockingPage.tsx`:
```typescript
// Handles both touch and mouse input
handleTouchStart/Move/End - Touch events
handleMouseDown/Move/Up - Mouse events
```

**Key Values:**
- Target unlock rotation: `Math.PI * 1.8` (~286 degrees)
- Rotation calculation: Drag distance × angle multiplier
- Progress calculation: `(rotation / unlockThreshold) * 100`

### 3. Visual Feedback
- **Progress Bar**: Fills as key rotates (0-100%)
- **Status Indicators**: Lock → Turning → Power status
- **Glow Effects**: Intensity increases with rotation
- **Haptic Feedback**: 5-pulse vibration pattern on unlock

---

## Mobile Optimization

### Device Targeting
- **Mobile First**: Designs for 360px-480px width
- **Responsive**: Scales to desktop (1920px+)
- **Touch Optimization**: Large interaction areas
- **Performance**: Adaptive rendering for lower-end devices

### Performance Tuning
```javascript
// Canvas performance settings
dpr={[1, 1.5]}                  // Device pixel ratio
performance={{ min: 0.5, max: 1 }}  // Adaptive scaling
gl={{ antialias: true }}         // Anti-aliasing
```

### Mobile Checklist
- ✅ Viewport meta tag configured
- ✅ Touch events handled properly
- ✅ Haptic feedback integrated
- ✅ Performance debounced
- ✅ CSS media queries for mobile

---

## Customization Guide

### Change Unlock Threshold
In `UnlockingPage.tsx`, line ~37:
```typescript
if (keyRotation > Math.PI * 1.8 && !isUnlocked) {
  // Adjust Math.PI * 1.8 (286°) to different value
  // Math.PI * 2.0 = 360°, Math.PI * 1.5 = 270°
}
```

### Adjust Colors
In `tailwind.config.js`:
```javascript
colors: {
  'cyan-glow': '#00d9ff',     // Primary glow
  'blue-accent': '#0f3460',   // Secondary accent
  'gold-key': '#ffd700',      // Key color
}
```

### Modify 3D Scene
In `LockMechanism.tsx`:
```typescript
// Camera position
<PerspectiveCamera makeDefault position={[0, 0.5, 2.5]} />

// Light positions
<pointLight position={[5, 5, 5]} intensity={0.8} />
```

### Add Sound Effects
Create `useSound.ts` hook:
```typescript
export const useSound = () => {
  const playSound = (soundFile: string) => {
    new Audio(soundFile).play();
  };
  return { playSound };
};
```

Then use in `UnlockingPage.tsx`:
```typescript
const { playSound } = useSound();
playSound('/sounds/unlock.mp3');
```

---

## Browser Compatibility

### Supported Browsers
| Browser | Mobile | Desktop | WebGL |
|---------|--------|---------|-------|
| Chrome  | ✅ 90+ | ✅ 90+ | ✅ |
| Firefox | ✅ 88+ | ✅ 88+ | ✅ |
| Safari  | ✅ 14+ | ✅ 14+ | ✅ |
| Edge    | ✅ 90+ | ✅ 90+ | ✅ |

### WebGL Requirements
- Must have WebGL 1.0 or 2.0 support
- Fallback: Display message if not supported
- Check: Use `WEBGL_LOSE_CONTEXT` for error handling

---

## Performance Metrics

### Target Performance
- **Desktop**: 60 FPS at 1080p
- **Mobile**: 30-60 FPS at various resolutions
- **Load Time**: < 2 seconds on 4G
- **Bundle Size**: ~500KB (minified + gzipped)

### Optimization Techniques Used
1. **Geometry Reuse**: Cylinder geometries cached
2. **Performance Adaptive**: DPR scaling on low-end devices
3. **Debounced Rendering**: Frame rate management
4. **Particle Optimization**: 1000 particles (not 1500)
5. **Material Simplification**: Phong material for efficiency

---

## Deployment

### Deployment Options

#### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### 2. Netlify
```bash
# Build first
npm run build

# Deploy dist folder to Netlify
# Or connect GitHub repo for auto-deployment
```

#### 3. Traditional Hosting
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

#### 4. Docker
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## Troubleshooting

### Issue: 3D Scene Not Rendering
**Solution:**
1. Check browser console for errors
2. Verify WebGL support: `http://get.webgl.org/`
3. Clear browser cache and reload
4. Test on different browser

### Issue: Touch Input Not Working
**Solution:**
1. Check mobile device orientation (portrait optimal)
2. Verify touch events in DevTools
3. Ensure `touch-none` class is not on container
4. Test with actual touch, not DevTools simulator

### Issue: Low Frame Rate
**Solution:**
1. Reduce particle count: Change 1000 to 500 in `Points()`
2. Lower DPR: Change `dpr={[1, 1.5]}` to `[1, 1]`
3. Clear background processes
4. Reduce other page animations

### Issue: Slow Build Time
**Solution:**
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Update Vite: `npm install vite@latest`
3. Check for large imports in bundle analysis

---

## Environment Variables

Create `.env` file (if needed):
```
VITE_APP_NAME=YANTRA 26
VITE_APP_VERSION=1.0.0
```

Access in code:
```typescript
const appName = import.meta.env.VITE_APP_NAME;
```

---

## Testing Checklist

- [ ] Desktop browser (Chrome, Firefox, Safari, Edge)
- [ ] Mobile browser (iPhone, Android)
- [ ] Touch responsiveness on mobile
- [ ] Lock unlocking mechanism works
- [ ] Auto-transition to main page
- [ ] All visual effects render properly
- [ ] No console errors
- [ ] Performance acceptable (60fps desktop, 30fps mobile)
- [ ] Haptic feedback triggers (mobile)
- [ ] Audio plays correctly (if implemented)

---

## Production Checklist

- [ ] Run `npm run build`
- [ ] Verify `dist/` folder contents
- [ ] Test production build locally: `npm run preview`
- [ ] Update meta tags in `index.html`
- [ ] Set up 404 redirects for SPA
- [ ] Configure CORS if needed
- [ ] Set cache headers appropriately
- [ ] Enable compression (gzip)
- [ ] Set up CDN for static assets
- [ ] Monitor performance in production

---

## Support & Resources

### Documentation
- [React Documentation](https://react.dev)
- [Three.js Documentation](https://threejs.org/docs)
- [Framer Motion Docs](https://www.framer.com/motion)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Performance Tools
- [WebPageTest](https://www.webpagetest.org)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Bundle Analyzer](https://www.npmjs.com/package/vite-plugin-visualizer)

---

## Maintenance

### Regular Updates
```bash
# Check for updates
npm outdated

# Update packages
npm update

# Update specific package
npm update package-name@latest
```

### Version Control
- Keep `.gitignore` updated
- Commit `package-lock.json`
- Tag releases with versions

---

**Last Updated**: February 26, 2026
**Project Version**: 1.0.0
