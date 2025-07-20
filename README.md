# خمر - Khamer Menu

The First-Ever Living, Breathing, Full-Skin Saudi Menu

## 🚀 Live Demo

Visit the live site: [https://ahameddrubo.github.io/Amdad/](https://ahameddrubo.github.io/Amdad/)

## 📋 Features

- **Beautiful Arabic Typography** - Using traditional Arabic fonts
- **Responsive Design** - Works perfectly on all devices
- **Smooth Animations** - Elegant loading and scroll animations
- **Traditional Saudi Dishes** - Authentic menu with 6 popular dishes
- **Modern UI/UX** - Contemporary design with Arabic cultural elements

## 🍽️ Menu Items

1. **كبسة الملكية (Royal Kabsa)** - 85 ريال
2. **مندي الحضرمي (Hadrami Mandi)** - 78 ريال
3. **مجبوس السمك (Fish Machboos)** - 92 ريال
4. **المنسف الأردني (Jordanian Mansaf)** - 88 ريال
5. **الأوزي العراقي (Iraqi Ouzi)** - 95 ريال
6. **شاورما اللحم (Meat Shawarma)** - 45 ريال

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Advanced styling with animations
- **Vanilla JavaScript** - No heavy frameworks
- **Google Fonts** - Arabic typography
- **Unsplash** - High-quality food images
- **GitHub Pages** - Hosting and deployment

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/neddrubo/khamer-menu.git

# Navigate to project directory
cd khamer-menu

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### GitHub Pages Deployment

The site automatically deploys to GitHub Pages when you push to the main branch. The GitHub Actions workflow handles:

1. **Automatic Build** - Builds the project on every push
2. **Deployment** - Deploys to GitHub Pages
3. **Optimized Assets** - Minified and optimized files

### Manual Deployment Steps

1. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Set folder to "/ (root)"

2. **Push your changes:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Wait for deployment:**
   - GitHub Actions will automatically build and deploy
   - Check the "Actions" tab for deployment status
   - Your site will be live at `https://yourusername.github.io/repository-name`

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Customization

### Adding New Dishes

Edit the `dishes` array in the JavaScript section of `index.html`:

```javascript
const dishes = [
    {
        id: 'your-dish',
        name: 'اسم الطبق',
        nameEn: 'Dish Name',
        description: 'وصف الطبق باللغة العربية',
        descriptionEn: 'Dish description in English',
        price: '75 ريال',
        image: 'https://your-image-url.com/image.jpg'
    }
    // Add more dishes...
];
```

### Changing Colors

Update the CSS custom properties in the `<style>` section:

```css
:root {
    --primary-color: #d4af37;  /* Gold */
    --background-color: #1a1a2e;  /* Dark blue */
    --text-color: #e6e6e6;  /* Light gray */
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Arabic Typography** - Thanks to Google Fonts for beautiful Arabic fonts
- **Images** - Courtesy of Unsplash photographers
- **Inspiration** - Traditional Saudi Arabian cuisine and culture

---

**Made with ❤️ for Saudi Arabian cuisine lovers**