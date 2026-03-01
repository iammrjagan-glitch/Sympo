# YANTRA 26 - Interactive 3D Lock Landing Page

A mobile-first landing page for the Mechanical Engineering Symposium featuring an interactive 3D lock, gear, and key unlocking mechanism.

## 🎯 Features

### Core Interaction
- **3D Lock Mechanism**: Realistic 3D rendered lock with rotating gears and key
- **Touch-Enabled**: Intuitive drag-and-rotate gesture controls optimized for mobile
- **Realistic Animations**: Smooth mechanical animations with proper physics and lighting
- **Haptic Feedback**: Vibration feedback on unlock (where supported)
- **Dark Theme**: Premium dark UI with glowing accents

### Technical Highlights
- **Mobile-First Design**: Optimized for 360px-480px mobile screens
- **Performance Optimized**: Adaptive rendering and debounced performance
- **Responsive**: Works seamlessly from mobile to desktop
- **Smooth Transitions**: Framer Motion animations for page transitions
- **State Management**: Context API for unlock state handling

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:5173` (or as shown in terminal)
   - The page opens with the interactive lock mechanism

### Building for Production
```bash
npm run build
```

## 🎮 User Interaction Guide

### How to Unlock
1. **On Desktop**: Click and drag left or right on the lock area
2. **On Mobile**: Swipe left or right on the lock mechanism
3. **Rotation Feedback**: Watch the progress bar fill as you rotate
4. **Complete Unlock**: Rotate the key approximately 280 degrees (~90%)
5. **Auto Transition**: Page automatically transitions to main content

### Visual Feedback
- **Lock Status**: Visual indicator showing lock/key/power status
- **Progress Bar**: Real-time progress indication (0-100%)
- **Gears**: Rotate realistically based on key rotation
- **Glow Effects**: Cyan glow intensifies as you progress
- **Haptic Vibration**: 5-pulse vibration pattern on unlock

## 📁 Project Structure

```
src/
├── components/
│   ├── LockMechanism.tsx      # 3D lock rendering with Three.js
│   ├── UnlockingPage.tsx      # Main landing page with interactions
│   ├── Navigation.tsx         # Main site navigation
│   ├── Hero.tsx              # Hero section
│   ├── Paddock.tsx           # Paddock section
│   ├── Circuits.tsx          # Circuits section
│   └── RaceControl.tsx       # Race control section
├── context/
│   └── SymposiumContext.tsx   # Global state management
├── App.tsx                    # Main app wrapper
├── main.tsx                   # Entry point
└── index.css                 # Global styles
```

## 🛠️ Technology Stack

- **React** 18.3 - UI framework
- **TypeScript** - Type safety
- **Three.js** (r128) - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server

## 🎨 Customization

### Changing Unlock Threshold
Edit in `UnlockingPage.tsx`:
```typescript
if (keyRotation > Math.PI * 1.8 && !isUnlocked) {  // ~286 degrees
  setIsUnlocked(true);
}
```

### Adjusting Colors
Modify Tailwind config in `tailwind.config.js`:
```javascript
colors: {
  'cyan-glow': '#00d9ff',     // Glow color
  'blue-accent': '#0f3460',   // Accent color
}
```

### Tweaking 3D Appearance
Edit camera and lighting in `LockMechanism.tsx`:
```typescript
<PerspectiveCamera makeDefault position={[0, 0.5, 2.5]} />
<pointLight position={[5, 5, 5]} intensity={0.8} color="#00d9ff" />
```

## 📱 Mobile Optimization

- **Responsive Design**: Adapts to all screen sizes
- **Touch Optimization**: Large interactive areas for mobile
- **Performance**: Reduced particle count (~1000) and optimized rendering
- **DPR Scaling**: Adaptive device pixel ratio (1-1.5)
- **Debounced Performance**: Smooth frame rates on lower-end devices

## 🔧 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **WebGL**: Requires WebGL support

## 📊 Performance

- **Target FPS**: 60fps on modern devices
- **Mobile FPS**: 30-60fps on mid-range devices
- **Load Time**: < 2 seconds on 4G connection
- **Bundle Size**: Optimized and tree-shaken

## 🎉 Key Features Explained

### 3D Lock Mechanism
The lock system consists of:
- **Main Cylinder**: Central rotating lock body
- **3 Gears**: Connected gears that rotate at different speeds
- **Golden Key**: Interactive key that rotates with user input
- **Keyhole**: Visual entry point for the key
- **Lighting System**: Dynamic lighting with multiple light sources

### Interaction System
- **Touch Detection**: Captures both touch and mouse input
- **Drag Calculation**: Converts drag distance to rotation angle
- **Smooth Interpolation**: Spring physics for smooth rotation
- **Boundary Checking**: Keeps rotation within valid range (0 to ~400°)

### State Management
- **SymposiumContext**: Controls unlocked state globally
- **Component State**: Manages rotation and interaction state
- **Auto-transition**: Triggers page change after unlock

## 🐛 Troubleshooting

### 3D Scene Not Rendering
- Check browser WebGL support
- Clear browser cache
- Try different browser

### Touch Not Working
- Ensure `touch-none` is not blocking interactions
- Check mobile viewport settings
- Test on actual mobile device

### Low Frame Rate
- Reduce particle count in `Points` component
- Lower DPR scaling
- Check browser GPU usage

## 📝 Future Enhancements

- Sound effects for mechanical clicks and gear rotation
- Additional unlock mechanisms (puzzles, patterns)
- Multiplayer unlock challenges
- Social sharing integration
- Analytics tracking

## 📄 License

This project is part of YANTRA 26 Symposium - Meenakshi Sundararajan Engineering College

## 👥 Credits

Built with modern web technologies for an immersive symposium experience.

---

**For Issues or Suggestions**: Create an issue in the repository or contact the development team.
