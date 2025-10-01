<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let scrollPosition = 0;
  let mounted = false;
  let currentTextIndex = 0;
  let isTyping = false;
  
  // Dynamic text array
  const dynamicTexts = [
    'Pengalaman Berkuda dan Memanah Profesional',
    'Traditional Archery with Modern Facilities',
    'Horseback Riding Adventures Await',
    'Master the Art of Bow and Arrow'
  ];
  
  onMount(() => {
    mounted = true;
    
    // Scroll handler
    const handleScroll = () => {
      scrollPosition = window.scrollY;
    };
    
    // Text cycling
    const cycleText = () => {
      isTyping = true;
      setTimeout(() => {
        currentTextIndex = (currentTextIndex + 1) % dynamicTexts.length;
        isTyping = false;
      }, 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    const textInterval = setInterval(cycleText, 4000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(textInterval);
    };
  });

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Video modal handler
  const openVideoModal = () => {
    dispatch('openVideo');
  };
</script>

<section id="home" class="relative min-h-screen py-20 flex items-center justify-center overflow-hidden">
  <!-- Multi-layer Dynamic Background -->
  <div class="absolute inset-0">
    <!-- Base gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
    
    <!-- Overlay gradients for depth -->
    <div class="absolute inset-0 hero-overlay-1"></div>
    <div class="absolute inset-0 hero-overlay-2"></div>
    
    <!-- Animated mesh gradient -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute top-0 left-0 w-full h-full hero-mesh-1 animate-pulse"></div>
      <div class="absolute top-0 left-0 w-full h-full hero-mesh-2 animate-pulse" style="animation-delay: 1s;"></div>
    </div>
  </div>

  <!-- Advanced Particle System -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <!-- Floating particles -->
    {#each Array(30) as _, i}
      <div 
        class="absolute rounded-full particle-glow animate-float"
        style="
          left: {Math.random() * 100}%;
          top: {Math.random() * 100}%;
          width: {2 + Math.random() * 4}px;
          height: {2 + Math.random() * 4}px;
          animation-delay: {Math.random() * 5}s;
          animation-duration: {3 + Math.random() * 4}s;
        "
      ></div>
    {/each}
    
    <!-- Shooting stars -->
    {#each Array(3) as _, i}
      <div 
        class="absolute w-1 h-1 bg-yellow-400 rounded-full animate-shooting-star"
        style="
          left: {20 + Math.random() * 60}%;
          top: {10 + Math.random() * 30}%;
          animation-delay: {i * 8}s;
        "
      ></div>
    {/each}
  </div>

  <!-- Enhanced Decorative Elements -->
  <div class="absolute inset-0 opacity-15">
    <!-- Archery targets -->
    <div class="absolute top-1/4 left-1/6 w-20 h-20 animate-spin-slow">
      <div class="w-full h-full target-ring-1 rounded-full relative">
        <div class="absolute inset-2 target-ring-2 rounded-full">
          <div class="absolute inset-2 target-ring-3 rounded-full">
            <div class="absolute inset-2 target-center rounded-full flex items-center justify-center">
              <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Arrow paths -->
    <div class="absolute top-1/3 right-1/6 transform rotate-45 group">
      <div class="w-16 h-16 border-l-4 border-t-4 border-yellow-400 transition-all duration-500 group-hover:border-yellow-300">
        <div class="absolute -top-2 -left-2 w-4 h-4 arrow-tip rotate-45 animate-pulse"></div>
      </div>
      <div class="absolute top-1/2 left-full w-8 h-0.5 arrow-tail animate-pulse"></div>
    </div>
    
    <div class="absolute bottom-1/4 left-1/3 transform -rotate-45 group">
      <div class="w-16 h-16 border-r-4 border-b-4 border-yellow-400 transition-all duration-500 group-hover:border-yellow-300">
        <div class="absolute -bottom-2 -right-2 w-4 h-4 arrow-tip rotate-45 animate-pulse"></div>
      </div>
    </div>
    
    <div class="absolute bottom-1/3 right-1/3 transform rotate-45 group">
      <div class="w-16 h-16 border-l-4 border-b-4 border-yellow-400 transition-all duration-500 group-hover:border-yellow-300">
        <div class="absolute -bottom-2 -left-2 w-4 h-4 arrow-tip rotate-45 animate-pulse"></div>
      </div>
    </div>

    <!-- Horse silhouettes -->
    <div class="absolute top-10 right-20 opacity-30 animate-float">
      <svg class="w-12 h-12 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.8 12c-.6 0-1.2.2-1.7.5-.3-2.1-1.9-3.8-4-4.2V7c0-1.7-1.3-3-3-3s-3 1.3-3 3v1.3c-2.1.4-3.7 2.1-4 4.2-.5-.3-1.1-.5-1.7-.5C2.6 12 2 12.6 2 13.4s.6 1.4 1.4 1.4c.4 0 .7-.1 1-.3.3 2.1 1.9 3.8 4 4.2V20c0 .6.4 1 1 1s1-.4 1-1v-1.3c2.1-.4 3.7-2.1 4-4.2.3.2.6.3 1 .3.8 0 1.4-.6 1.4-1.4S21.6 12 20.8 12z"/>
      </svg>
    </div>
    
    <div class="absolute bottom-20 left-20 opacity-20 animate-float" style="animation-delay: 2s;">
      <svg class="w-10 h-10 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </div>
  </div>

  <!-- Hidden Admin Access (Secret) -->
  <div class="absolute top-4 left-4 z-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
    <div class="text-xs text-white/20 hover:text-white/60 cursor-help" title="Admin Access">
      <div class="w-2 h-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors"></div>
    </div>
  </div>

  <!-- Secret Admin Login Trigger (Double click on logo) -->
  <button 
    on:dblclick={() => dispatch('openAdminLogin')}
    class="absolute top-6 right-6 z-30 opacity-0 hover:opacity-30 transition-opacity duration-300 text-white/20 hover:text-white/40 text-xs"
    title="Double click for admin access"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  </button>

  <!-- Main Content -->
  <div 
    class="text-center text-white z-20 px-6 max-w-6xl mx-auto transition-all duration-1000 py-16"
    class:opacity-100={mounted}
    class:opacity-0={!mounted}
    class:translate-y-0={mounted}
    class:translate-y-12={!mounted}
    style="transform: translateY({scrollPosition * 0.05}px)"
  >
    <!-- Animated Logo/Badge with Secret Admin Access -->
    <div class="mb-8 flex justify-center">
      <div class="relative">
        <button
          on:dblclick={() => dispatch('openAdminLogin')}
          class="w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow hover:scale-105 transition-transform cursor-pointer"
          title="Double-click 5 times for admin access"
        >
          <svg class="w-10 h-10 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </button>
        <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-ping opacity-20"></div>
      </div>
    </div>

    <!-- Main Title with Advanced Typography -->
    <h1 class="mb-8 leading-tight">
      <span class="block text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-wider mb-2">
        <span class="inline-block bg-gradient-to-r from-white via-gray-100 to-yellow-100 bg-clip-text text-transparent animate-shimmer">
          AMOEBAS
        </span>
      </span>
      <span class="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider">
        <span class="inline-block bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
          ARCHERY
        </span>
      </span>
    </h1>

    <!-- Enhanced Decorative Elements -->
    <div class="flex items-center justify-center mb-8">
      <div class="flex items-center space-x-4">
        <div class="w-12 h-px bg-gradient-to-r from-transparent to-yellow-400"></div>
        <div class="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
        <div class="w-24 h-px bg-gradient-to-r from-yellow-400 to-yellow-300"></div>
        <div class="w-3 h-3 bg-yellow-300 rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
        <div class="w-12 h-px bg-gradient-to-l from-transparent to-yellow-400"></div>
      </div>
    </div>

    <!-- Dynamic Subtitle with Text Animation -->
    <div class="mb-8 h-20 flex items-center justify-center">
      <p class="text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto font-light leading-relaxed">
        <span class="text-yellow-400 font-semibold">Kuda & Panah</span>
        <br />
        <span 
          class="transition-all duration-300 inline-block"
          class:opacity-100={!isTyping}
          class:opacity-0={isTyping}
          class:translate-y-0={!isTyping}
          class:translate-y-2={isTyping}
        >
          {dynamicTexts[currentTextIndex]}
        </span>
      </p>
    </div>

    <!-- Action Buttons with Enhanced Design -->
    <div class="flex flex-col sm:flex-row gap-6 items-center justify-center mb-12">
      <button
        on:click={() => scrollToSection('#services')}
        class="group relative bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-blue-900 font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg overflow-hidden"
      >
        <div class="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
        <div class="relative flex items-center space-x-3">
          <span>Jelajahi Layanan</span>
          <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </button>
      
      <button
        on:click={openVideoModal}
        class="group relative border-2 border-white/40 hover:border-yellow-400 text-white hover:text-yellow-400 font-semibold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/10 hover:bg-white/20 shadow-lg"
      >
        <div class="flex items-center space-x-3">
          <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <span>Watch Video</span>
        </div>
      </button>
    </div>

    <!-- Stats/Features Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
      <div class="flex flex-col items-center space-y-2 p-6 feature-card rounded-2xl border-white-10 hover-effect transition-all duration-300 transform hover:scale-105">
        <div class="w-12 h-12 icon-bg-yellow rounded-full flex items-center justify-center mb-2">
          <svg class="w-6 h-6 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-yellow-400">Expert Instructors</h3>
        <p class="text-sm text-gray-300 text-center">Professional certified trainers</p>
      </div>
      
      <div class="flex flex-col items-center space-y-2 p-6 feature-card rounded-2xl border-white-10 hover-effect transition-all duration-300 transform hover:scale-105">
        <div class="w-12 h-12 icon-bg-blue rounded-full flex items-center justify-center mb-2">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-blue-400">Flexible Schedule</h3>
        <p class="text-sm text-gray-300 text-center">Book sessions anytime</p>
      </div>
      
      <div class="flex flex-col items-center space-y-2 p-6 feature-card rounded-2xl border-white-10 hover-effect transition-all duration-300 transform hover:scale-105">
        <div class="w-12 h-12 icon-bg-green rounded-full flex items-center justify-center mb-2">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-green-400">Modern Equipment</h3>
        <p class="text-sm text-gray-300 text-center">Latest gear and facilities</p>
      </div>
    </div>
  </div>

  <!-- Enhanced Scroll Indicator -->
  <!-- <div class="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
    <div class="flex flex-col items-center space-y-3 animate-bounce">
      <span class="text-yellow-400 text-xs font-medium tracking-widest opacity-80">SCROLL TO EXPLORE</span>
      <div class="relative">
        <div class="w-6 h-12 scroll-border rounded-full flex justify-center overflow-hidden">
          <div class="w-1 h-4 bg-yellow-400 rounded-full mt-2 animate-scroll-indicator"></div>
        </div>
        <div class="absolute inset-0 w-6 h-12 scroll-border-pulse rounded-full animate-pulse"></div>
      </div>
      <svg class="w-4 h-4 text-yellow-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </div> -->
</section>

<style>
  /* Animation keyframes */
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-10px) rotate(1deg); }
    50% { transform: translateY(-20px) rotate(0deg); }
    75% { transform: translateY(-10px) rotate(-1deg); }
  }
  
  @keyframes shooting-star {
    0% { 
      transform: translateX(0) translateY(0) scale(1);
      opacity: 0;
    }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { 
      transform: translateX(300px) translateY(100px) scale(0);
      opacity: 0;
    }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.5); }
    50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.8), 0 0 60px rgba(251, 191, 36, 0.3); }
  }
  
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes scroll-indicator {
    0% { transform: translateY(-100%); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(200%); opacity: 0; }
  }
  
  /* Animation classes */
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-shooting-star {
    animation: shooting-star 8s linear infinite;
  }
  
  .animate-shimmer {
    background-size: 200% 100%;
    animation: shimmer 3s ease-in-out infinite;
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }
  
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
  
  .animate-scroll-indicator {
    animation: scroll-indicator 2s ease-in-out infinite;
  }

  /* Background gradients */
  .hero-overlay-1 {
    background: linear-gradient(to top right, rgba(234, 179, 8, 0.1), transparent, rgba(245, 158, 11, 0.05));
  }
  
  .hero-overlay-2 {
    background: linear-gradient(to bottom left, transparent, rgba(30, 64, 175, 0.2), rgba(22, 78, 99, 0.1));
  }
  
  .hero-mesh-1 {
    background: linear-gradient(to right, rgba(37, 99, 235, 0.2), rgba(147, 51, 234, 0.2));
  }
  
  .hero-mesh-2 {
    background: linear-gradient(to left, rgba(234, 179, 8, 0.1), rgba(249, 115, 22, 0.1));
  }

  /* Particle system */
  .particle-glow {
    background: linear-gradient(to right, rgba(251, 191, 36, 0.4), rgba(245, 158, 11, 0.4));
  }

  /* Target elements */
  .target-ring-1 {
    border: 4px solid rgba(251, 191, 36, 0.6);
  }
  
  .target-ring-2 {
    border: 2px solid rgba(251, 191, 36, 0.4);
  }
  
  .target-ring-3 {
    border: 1px solid rgba(251, 191, 36, 0.3);
  }
  
  .target-center {
    background-color: rgba(251, 191, 36, 0.2);
  }

  /* Arrow elements */
  .arrow-tip {
    background-color: rgba(251, 191, 36, 0.6);
  }
  
  .arrow-tail {
    background: linear-gradient(to right, #fbbf24, transparent);
  }

  /* Feature cards */
  .feature-card {
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  .border-white-10 {
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .hover-effect:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  /* Icon backgrounds */
  .icon-bg-yellow {
    background: linear-gradient(to right, #fbbf24, #f59e0b);
  }
  
  .icon-bg-blue {
    background: linear-gradient(to right, #60a5fa, #06b6d4);
  }
  
  .icon-bg-green {
    background: linear-gradient(to right, #34d399, #10b981);
  }

  /* Scroll indicator */
  .scroll-border {
    border: 2px solid rgba(251, 191, 36, 0.6);
  }
  
  .scroll-border-pulse {
    border: 2px solid rgba(251, 191, 36, 0.3);
  }
</style>