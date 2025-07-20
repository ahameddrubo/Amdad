import './styles/main.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import lottie from 'lottie-web'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// ==================================================
// KHAMER MENU - MAIN APPLICATION
// ==================================================

class KhamerMenu {
  constructor() {
    this.currentDishIndex = 0
    this.isTransitioning = false
    this.ambientAudio = null
    this.heroScene = null
    this.mirageScene = null
    this.dishes = []
    this.particleSystems = []
    
    this.init()
  }

  async init() {
    // Initialize core systems
    this.setupDishes()
    this.setupAudio()
    this.setupWebGL()
    this.setupScrollTriggers()
    this.setupInteractions()
    this.setupTypingEffect()
    this.setupParticleSystem()
    
    // Start the experience
    this.startLoadingSequence()
  }

  // ==================================================
  // DISH DATA SETUP
  // ==================================================
  
  setupDishes() {
    this.dishes = [
      {
        id: 'kabsa',
        name: 'كبسة الملكية',
        nameEn: 'Royal Kabsa',
        description: 'أرز بسمتي مع لحم الضأن المطبوخ بالتوابل العربية الأصيلة والزعفران الذهبي',
        descriptionEn: 'Basmati rice with lamb cooked in authentic Arabic spices and golden saffron',
        price: '85',
        currency: 'ريال',
        image: '/images/kabsa.jpg',
        particles: ['saffron', 'rice', 'spice']
      },
      {
        id: 'mandi',
        name: 'مندي الحضرمي',
        nameEn: 'Hadrami Mandi',
        description: 'لحم الضأن المدخن مع الأرز المعطر بالهيل والقرفة',
        descriptionEn: 'Smoked lamb with rice perfumed with cardamom and cinnamon',
        price: '78',
        currency: 'ريال',
        image: '/images/mandi.jpg',
        particles: ['spice', 'rice']
      },
      {
        id: 'machboos',
        name: 'مجبوس السمك',
        nameEn: 'Fish Machboos',
        description: 'سمك الهامور الطازج مع الأرز المتبل بالكركم والبهارات الخليجية',
        descriptionEn: 'Fresh grouper fish with turmeric-spiced rice and Gulf spices',
        price: '92',
        currency: 'ريال',
        image: '/images/machboos.jpg',
        particles: ['spice', 'rice']
      },
      {
        id: 'mansaf',
        name: 'المنسف الأردني',
        nameEn: 'Jordanian Mansaf',
        description: 'لحم الضأن بصلصة اللبن مع الأرز والمكسرات',
        descriptionEn: 'Lamb in yogurt sauce with rice and nuts',
        price: '88',
        currency: 'ريال',
        image: '/images/mansaf.jpg',
        particles: ['spice', 'rice']
      },
      {
        id: 'ouzi',
        name: 'الأوزي العراقي',
        nameEn: 'Iraqi Ouzi',
        description: 'لحم الضأن المحشو بالأرز والمكسرات والزبيب',
        descriptionEn: 'Stuffed lamb with rice, nuts and raisins',
        price: '95',
        currency: 'ريال',
        image: '/images/ouzi.jpg',
        particles: ['spice', 'rice']
      }
    ]
    
    this.generateDishCards()
  }

  generateDishCards() {
    const container = document.getElementById('menuContainer')
    
    this.dishes.forEach((dish, index) => {
      const cardHTML = `
        <div class="dish-card" data-dish-id="${dish.id}" data-index="${index}">
          <div class="dish-background" style="background-image: url('${dish.image}')"></div>
          <div class="mashrabiya-overlay"></div>
          <div class="ingredient-particles" id="particles-${dish.id}"></div>
          
          <div class="dish-content">
            <h2 class="dish-name" data-en="${dish.nameEn}">${dish.name}</h2>
            <p class="dish-description" data-en="${dish.descriptionEn}">${dish.description}</p>
            <div class="dish-price">
              <span class="price-coins">🪙</span>
              ${dish.price} ${dish.currency}
            </div>
          </div>
        </div>
      `
      container.innerHTML += cardHTML
    })
  }

  // ==================================================
  // AUDIO SYSTEM
  // ==================================================
  
  setupAudio() {
    this.ambientAudio = document.getElementById('ambientAudio')
    
    // Create a placeholder audio source since we don't have the actual file
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Very low volume ambient sound
    gainNode.gain.value = 0.1
    oscillator.frequency.value = 110 // Low frequency for ambient feel
    oscillator.type = 'sine'
    
    // Start after user interaction
    document.addEventListener('click', () => {
      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }
    }, { once: true })
  }

  // ==================================================
  // WEBGL SCENES
  // ==================================================
  
  setupWebGL() {
    this.setupHeroScene()
    this.setupMirageScene()
  }

  setupHeroScene() {
    const canvas = document.getElementById('heroCanvas')
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    
    // Create floating particles for hero background
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 1000
    const positions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.1,
      transparent: true,
      opacity: 0.6
    })
    
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)
    
    camera.position.z = 5
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      
      particles.rotation.x += 0.001
      particles.rotation.y += 0.002
      
      // Make particles pulse
      particles.material.opacity = 0.3 + Math.sin(Date.now() * 0.001) * 0.3
      
      renderer.render(scene, camera)
    }
    
    animate()
    
    this.heroScene = { scene, camera, renderer, particles }
    
    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    })
  }

  setupMirageScene() {
    const canvas = document.getElementById('mirageCanvas')
    if (!canvas) return
    
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    
    // Create constellation effect
    const starGeometry = new THREE.BufferGeometry()
    const starCount = 200
    const positions = new Float32Array(starCount * 3)
    
    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    
    const starMaterial = new THREE.PointsMaterial({
      color: 0xcd853f,
      size: 0.2,
      transparent: true,
      opacity: 0.8
    })
    
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)
    
    camera.position.z = 10
    
    this.mirageScene = { scene, camera, renderer, stars }
  }

  // ==================================================
  // SCROLL TRIGGERS & ANIMATIONS
  // ==================================================
  
  setupScrollTriggers() {
    // Hero section animations
    gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    })
    .to(".main-title", { scale: 0.8, opacity: 0.5 })
    .to(".social-icons", { y: -50, opacity: 0 }, 0)
    .to(".auto-typed-slogans", { y: -30, opacity: 0 }, 0)

    // Dish card entrance animations
    gsap.utils.toArray(".dish-card").forEach((card, index) => {
      gsap.set(card, { y: "100vh" })
      
      ScrollTrigger.create({
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => this.animateDishEntrance(card, index),
        onLeave: () => this.triggerMirageTransition(),
        snap: {
          snapTo: "labels",
          duration: { min: 0.2, max: 3 },
          delay: 0.2
        }
      })
    })
  }

  animateDishEntrance(card, index) {
    const tl = gsap.timeline()
    
    // Sand spiral dissolve effect
    tl.to(".mirage-transition", { opacity: 1, duration: 0.5 })
      .to(".mirage-transition", { opacity: 0, duration: 0.5 })
      .fromTo(card, 
        { 
          y: "100vh",
          rotationY: 180,
          opacity: 0
        },
        {
          y: 0,
          rotationY: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out"
        }
      )
      .fromTo(card.querySelector('.dish-content'),
        {
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        },
        "-=0.5"
      )
    
    // Generate particles for this dish
    this.generateDishParticles(card, index)
  }

  // ==================================================
  // PARTICLE SYSTEM
  // ==================================================
  
  setupParticleSystem() {
    this.dishes.forEach((dish, index) => {
      const container = document.getElementById(`particles-${dish.id}`)
      if (container) {
        this.createParticleSystem(container, dish.particles)
      }
    })
  }

  createParticleSystem(container, particleTypes) {
    const particleCount = 20
    
    setInterval(() => {
      if (container.children.length > particleCount) return
      
      particleTypes.forEach(type => {
        const particle = document.createElement('div')
        particle.className = `particle ${type}`
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%'
        particle.style.top = '100%'
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 2 + 's'
        particle.style.animationDuration = (10 + Math.random() * 10) + 's'
        
        container.appendChild(particle)
        
        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle)
          }
        }, 15000)
      })
    }, 2000)
  }

  generateDishParticles(card, index) {
    const dish = this.dishes[index]
    const container = card.querySelector('.ingredient-particles')
    
    // Create burst of particles on entrance
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        dish.particles.forEach(type => {
          const particle = document.createElement('div')
          particle.className = `particle ${type}`
          particle.style.left = Math.random() * 100 + '%'
          particle.style.top = Math.random() * 100 + '%'
          particle.style.animationDuration = '3s'
          
          container.appendChild(particle)
          
          setTimeout(() => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle)
            }
          }, 3000)
        })
      }, i * 200)
    }
  }

  // ==================================================
  // INTERACTIVE EFFECTS
  // ==================================================
  
  setupInteractions() {
    // Dish card hover effects
    document.querySelectorAll('.dish-card').forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        this.onDishHover(e.target)
      })
      
      card.addEventListener('mouseleave', (e) => {
        this.onDishLeave(e.target)
      })
      
      card.addEventListener('click', (e) => {
        this.onDishClick(e.target)
      })
    })

    // Social icon interactions
    document.querySelectorAll('.social-icon').forEach(icon => {
      icon.addEventListener('mouseenter', (e) => {
        this.onSocialHover(e.target)
      })
    })

    // Title flame effect on hover
    const title = document.querySelector('.main-title')
    if (title) {
      title.addEventListener('mouseenter', () => {
        this.triggerFlameEffect(title)
      })
    }

    // Auto-play ambient sounds on first interaction
    document.addEventListener('click', () => {
      this.startAmbientAudio()
    }, { once: true })

    // 404 page sand glyph
    const sandGlyph = document.getElementById('sandGlyph')
    if (sandGlyph) {
      sandGlyph.addEventListener('click', () => {
        this.returnToHome()
      })
    }
  }

  onDishHover(card) {
    const dishName = card.querySelector('.dish-name')
    
    gsap.to(card.querySelector('.dish-background'), {
      scale: 1.1,
      duration: 0.8,
      ease: "power2.out"
    })
    
    // Trigger flame effect on dish name
    if (dishName) {
      this.triggerFlameEffect(dishName)
    }
    
    // Increase particle generation
    this.intensifyParticles(card)
  }

  onDishLeave(card) {
    gsap.to(card.querySelector('.dish-background'), {
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    })
  }

  onDishClick(card) {
    // Trigger detailed view or order functionality
    console.log('Dish clicked:', card.dataset.dishId)
  }

  onSocialHover(icon) {
    const platform = icon.dataset.platform
    
    switch (platform) {
      case 'tiktok':
        // Already handled in CSS
        break
      case 'snapchat':
        // Already handled in CSS  
        break
      case 'instagram':
        // Already handled in CSS
        break
    }
  }

  triggerFlameEffect(element) {
    const text = element.textContent
    element.innerHTML = text.split('').map(char => 
      `<span class="flame-letter">${char}</span>`
    ).join('')
    
    // Remove flame effect after animation
    setTimeout(() => {
      element.innerHTML = text
    }, 1000)
  }

  intensifyParticles(card) {
    const container = card.querySelector('.ingredient-particles')
    const dish = this.dishes[parseInt(card.dataset.index)]
    
    // Create extra particles on hover
    for (let i = 0; i < 5; i++) {
      dish.particles.forEach(type => {
        const particle = document.createElement('div')
        particle.className = `particle ${type}`
        particle.style.left = Math.random() * 100 + '%'
        particle.style.top = Math.random() * 100 + '%'
        particle.style.animationDuration = '2s'
        
        container.appendChild(particle)
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle)
          }
        }, 2000)
      })
    }
  }

  // ==================================================
  // TYPING EFFECT
  // ==================================================
  
  setupTypingEffect() {
    const slogans = [
      'ذوقِ ریگِ بیابان را بچش',
      'هر طعم، قصه‌ای از کاروانِ شب'
    ]
    
    let currentSloganIndex = 0
    let currentCharIndex = 0
    let isDeleting = false
    
    const typeEffect = () => {
      const currentSlogan = slogans[currentSloganIndex]
      const sloganElement = document.getElementById(`slogan${currentSloganIndex + 1}`)
      
      if (!sloganElement) return
      
      if (isDeleting) {
        // Delete characters
        sloganElement.textContent = currentSlogan.substring(0, currentCharIndex - 1)
        currentCharIndex--
      } else {
        // Type characters
        sloganElement.textContent = currentSlogan.substring(0, currentCharIndex + 1)
        currentCharIndex++
      }
      
      // Determine next action
      if (!isDeleting && currentCharIndex === currentSlogan.length) {
        // Finished typing, wait then start deleting
        setTimeout(() => {
          isDeleting = true
          typeEffect()
        }, 2000)
        return
      } else if (isDeleting && currentCharIndex === 0) {
        // Finished deleting, switch to next slogan
        isDeleting = false
        sloganElement.classList.remove('active')
        currentSloganIndex = (currentSloganIndex + 1) % slogans.length
        
        const nextSlogan = document.getElementById(`slogan${currentSloganIndex + 1}`)
        if (nextSlogan) {
          nextSlogan.classList.add('active')
        }
        
        setTimeout(typeEffect, 500)
        return
      }
      
      // Continue typing/deleting
      const speed = isDeleting ? 50 : 100
      setTimeout(typeEffect, speed)
    }
    
    // Start typing effect
    setTimeout(typeEffect, 1000)
  }

  // ==================================================
  // TRANSITION EFFECTS
  // ==================================================
  
  triggerMirageTransition() {
    if (this.isTransitioning) return
    
    this.isTransitioning = true
    const transition = document.getElementById('mirageTransition')
    
    // Show mirage transition
    transition.classList.add('active')
    
    // Animate constellation
    if (this.mirageScene) {
      const animateConstellation = () => {
        this.mirageScene.stars.rotation.z += 0.01
        this.mirageScene.renderer.render(this.mirageScene.scene, this.mirageScene.camera)
        
        if (this.isTransitioning) {
          requestAnimationFrame(animateConstellation)
        }
      }
      animateConstellation()
    }
    
    // Hide transition after 2 seconds
    setTimeout(() => {
      transition.classList.remove('active')
      this.isTransitioning = false
    }, 2000)
  }

  // ==================================================
  // AUDIO MANAGEMENT
  // ==================================================
  
  startAmbientAudio() {
    // Since we don't have actual audio files, we'll use Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
      // Create ambient sound with multiple oscillators
      const osc1 = audioContext.createOscillator()
      const osc2 = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      osc1.connect(gainNode)
      osc2.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      osc1.frequency.value = 110
      osc2.frequency.value = 165
      osc1.type = 'sine'
      osc2.type = 'triangle'
      
      gainNode.gain.value = 0.05
      
      osc1.start()
      osc2.start()
      
      // Modulate volume based on scroll
      window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
        gainNode.gain.value = 0.05 + (scrollPercent * 0.03)
      })
      
    } catch (error) {
      console.log('Audio context not available')
    }
  }

  // ==================================================
  // LOADING SEQUENCE
  // ==================================================
  
  startLoadingSequence() {
    const loadingScreen = document.getElementById('loadingScreen')
    const loadingText = loadingScreen.querySelector('.loading-text')
    
    // Animate loading text
    gsap.to(loadingText, {
      scale: 1.2,
      duration: 1,
      yoyo: true,
      repeat: 2,
      ease: "power2.inOut"
    })
    
    // Fade out loading screen
    setTimeout(() => {
      loadingScreen.classList.add('fade-out')
      
      // Start main animations
      setTimeout(() => {
        this.startMainAnimations()
      }, 500)
    }, 3000)
  }

  startMainAnimations() {
    // Animate hero elements in sequence
    const tl = gsap.timeline()
    
    tl.fromTo('.main-title', 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "back.out(1.7)" }
    )
    .fromTo('.social-icons .social-icon',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo('.auto-typed-slogans',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    )
  }

  // ==================================================
  // 404 PAGE FUNCTIONALITY
  // ==================================================
  
  show404Page() {
    const notFoundPage = document.getElementById('notFoundPage')
    notFoundPage.classList.add('active')
  }

  hide404Page() {
    const notFoundPage = document.getElementById('notFoundPage')
    notFoundPage.classList.remove('active')
  }

  returnToHome() {
    this.hide404Page()
    
    // Swirling sand effect
    gsap.to('.sand-glyph', {
      scale: 10,
      opacity: 0,
      rotation: 720,
      duration: 1,
      ease: "power2.in",
      onComplete: () => {
        window.location.href = '#hero'
      }
    })
  }
}

// ==================================================
// INITIALIZE APPLICATION
// ==================================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  new KhamerMenu()
})

// Handle service worker for performance
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}