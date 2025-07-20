# خمر (Khamer) - The Living Saudi Menu

*The First-Ever Living, Breathing, Full-Skin Saudi Menu Experience*

## 🌟 Overview

Khamer is an immersive, cinematic web experience showcasing traditional Saudi cuisine through cutting-edge web technologies. Every pixel breathes, every letter dances, and the entire viewport becomes a never-ending, edge-to-edge Arabian culinary dream.

## ✨ Features

### 🎨 Visual Experience
- **100% Viewport Coverage**: True edge-to-edge, zero-margin experience
- **Liquid Gold Calligraphy**: Arabic "خمر" in Al-Thuluth style with dripping animations
- **Living Frescos**: Full-skin dish cards with 3D parallax ingredients
- **Mashrabiya Patterns**: Animated Islamic geometric overlays
- **Mirage Transitions**: 2-second shimmer effects between sections

### 🔮 Animations & Effects
- **Heartbeat Synchronization**: Title pulses with oud rhythm
- **Social Icon Micro-interactions**:
  - TikTok → Whirling Tanoura animation
  - Snapchat → Falcon eye blink
  - Instagram → Bedouin silver piece catching starlight
- **Flame Letters**: Hover effects on Arabic text
- **Floating Particles**: Saffron threads, rice grains, spices in 3D space
- **Sand Spiral Dissolves**: Page transition effects

### 🎵 Audio Experience
- **Ambient Soundscape**: Distant oud + palm frond rustle
- **Volume Scaling**: Audio adapts to scroll speed
- **Web Audio API**: Procedural ambient sound generation

### 📱 Responsive Design
- **Desktop**: Vertical scroll-snap navigation
- **Mobile/Tablet**: Horizontal swipe with "sand page" flipping
- **Touch Gestures**: Intuitive interaction patterns

### 🚀 Performance
- **WebGL Acceleration**: Three.js powered 3D effects
- **GSAP Animations**: Smooth, hardware-accelerated transitions
- **Service Worker**: Offline capability and asset caching
- **Lazy Loading**: Optimized resource loading

## 🛠️ Technologies

- **Frontend Framework**: Vanilla JavaScript (ES6+)
- **Animation Libraries**: 
  - GSAP with ScrollTrigger
  - Lottie for micro-animations
- **3D Graphics**: Three.js
- **Build Tool**: Vite
- **Styling**: Modern CSS with custom properties
- **Progressive Web App**: Service Worker implementation

## 📋 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/khamer-menu.git
cd khamer-menu
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

## 🎯 Usage

### Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview

# Serve production build
npm run serve
```

### Customization

#### Adding New Dishes

Edit `src/main.js` and modify the `dishes` array:

```javascript
{
  id: 'new-dish',
  name: 'اسم الطبق بالعربية',
  nameEn: 'Dish Name in English',
  description: 'وصف الطبق بالعربية',
  descriptionEn: 'Dish description in English',
  price: '99',
  currency: 'ريال',
  image: '/images/new-dish.jpg',
  particles: ['saffron', 'rice', 'spice']
}
```

#### Customizing Colors

Modify CSS custom properties in `src/styles/main.css`:

```css
:root {
  --desert-night: #1a1a2e;
  --liquid-gold: #d4af37;
  --antique-gold: #b8860b;
  --terracotta: #cd853f;
  --pomegranate: #c0392b;
}
```

#### Adding Audio Files

Replace placeholder audio in `public/audio/` directory:
- `ambient-oud.mp3` - Background ambient sound
- Additional audio files can be referenced in the audio system

## 🏗️ Project Structure

```
khamer-menu/
├── public/
│   ├── images/           # Dish images and visual assets
│   ├── audio/           # Audio files
│   ├── favicon.svg      # Site favicon
│   └── sw.js           # Service worker
├── src/
│   ├── styles/
│   │   └── main.css    # Main stylesheet
│   └── main.js         # Application entry point
├── index.html          # Main HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── README.md           # This file
```

## 🎨 Design Philosophy

### Arabian Aesthetic
- **Color Palette**: Sun-bleached terracotta, midnight indigo, pomegranate red, antique gold
- **Typography**: Authentic Arabic fonts (Scheherazade New, Amiri)
- **Patterns**: Traditional Islamic geometric designs
- **Motion**: Fluid, organic animations inspired by desert winds

### User Experience
- **Immersive Navigation**: No traditional menus, pure scroll/swipe interaction
- **Cultural Authenticity**: Right-to-left text flow, Arabic-first design
- **Accessibility**: Screen reader friendly, keyboard navigation support
- **Performance**: 60fps animations, optimized loading

## 🌐 Browser Support

- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **WebGL Support**: Required for 3D effects
- **Service Worker**: For offline functionality
- **Web Audio API**: For ambient sound features

## 📱 PWA Features

- **Offline Capability**: Core functionality works without internet
- **App-like Experience**: Can be installed on mobile devices
- **Push Notifications**: For special offers and updates
- **Background Sync**: Seamless online/offline transitions

## 🔧 Development Notes

### Performance Optimizations
- Hardware acceleration for animations
- Texture optimization for WebGL
- Debounced scroll events
- Efficient particle systems

### Accessibility Considerations
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion preferences

### Cross-Platform Testing
- Desktop browsers (Windows, macOS, Linux)
- Mobile browsers (iOS Safari, Android Chrome)
- Tablet interfaces
- Various screen sizes and orientations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Traditional Saudi cuisine inspiration
- Arabic calligraphy artists
- Islamic geometric pattern designers
- Modern web animation pioneers

## 📞 Support

For questions or support, please open an issue on GitHub or contact:
- Email: support@khamer-menu.com
- Website: https://khamer-menu.com

---

**خمر - حيث يلتقي التراث بالإبداع الرقمي**

*Khamer - Where Heritage Meets Digital Innovation*