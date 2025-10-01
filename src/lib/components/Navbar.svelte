<script>
  import LoginModal from './LoginModal.svelte';
  import { onMount } from 'svelte';
  import { isAdmin, logout } from '$lib/auth';

  let logoClickCount = 0;
  let logoClickTimeout;
  let isMenuOpen = false;
  let scrollY = 0;
  let lastScrollY = 0;
  let showNavbar = true;
  let loginModal;
  let adminStatus = false;

  // default aktifin home
  let activeSection = '#home';

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  onMount(() => {
    const unsubscribe = isAdmin.subscribe(value => {
      adminStatus = value;
    });

    // perbaikan observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activeSection = `#${entry.target.id}`;
          }
        });
      },
      {
        threshold: [0.3, 0.6],
        rootMargin: "0px 0px -30% 0px"
      }
    );

    navItems.forEach(item => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => {
      unsubscribe();
      observer.disconnect();
    };
  });
  
  const handleLogoClick = () => {
    logoClickCount++;
    clearTimeout(logoClickTimeout);
    
    if (logoClickCount === 1) {
      logoClickTimeout = setTimeout(() => {
        scrollToHome();
        logoClickCount = 0;
      }, 800);
    } else if (logoClickCount === 3) {
      clearTimeout(logoClickTimeout);
      if (!adminStatus) {
        loginModal?.open();
      }
      logoClickCount = 0;
    } else if (logoClickCount > 3) {
      logoClickCount = 0;
    }
  };
  
  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    isMenuOpen = false;
  };
  
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };

  const handleLogout = async () => {
    try {
      await logout();
      adminStatus = false;
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLoginSuccess = () => {
    console.log('Admin login successful!');
    adminStatus = true;
  };

  // Navbar hide/show
  $: {
    if (scrollY > lastScrollY && scrollY > 80) {
      showNavbar = false;
    } else {
      showNavbar = true;
    }
    lastScrollY = scrollY;
  }
</script>

<svelte:window bind:scrollY />

<!-- Navbar -->
<nav 
  class="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
  class:navbar-scrolled={scrollY > 50}
  class:translate-y-0={showNavbar}
  class:-translate-y-full={!showNavbar}
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 lg:h-20">
      
      <!-- Logo Section -->
      <div class="flex items-center space-x-3">
        <button
          on:click={handleLogoClick}
          class="group relative flex items-center space-x-3 focus:outline-none rounded-lg p-2"
          title="Click for home, triple-click for admin"
        >
          <div class="relative">
            <div 
              class="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg"
            >
              <svg 
                class="w-5 h-5 lg:w-6 lg:h-6 text-white"
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
          <div class="hidden sm:block">
            <h1 class="text-lg lg:text-xl font-bold tracking-wide text-white">
              AMOEBAS
            </h1>
            <p class="text-xs lg:text-sm font-medium text-blue-300">
              ARCHERY
            </p>
          </div>
        </button>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-center space-x-8">
        {#each navItems as item}
          <button
            on:click={() => scrollToSection(item.href)}
            class="relative group px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg text-white hover:text-blue-300 {activeSection === item.href ? 'bg-blue-800 bg-opacity-30' : ''}"
          >
            {item.name}
            <div 
              class="absolute bottom-0 left-3 right-3 h-0.5 transition-all duration-300 transform bg-blue-400 {activeSection === item.href ? 'scale-x-100' : 'scale-x-0'}"
            ></div>
          </button>
        {/each}
        
        <!-- Admin Logout Button -->
        {#if adminStatus}
          <button
            on:click={handleLogout}
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 bg-opacity-80 hover:bg-red-700 hover:bg-opacity-90 rounded-lg transition-colors duration-300 backdrop-blur-sm"
          >
            Logout Admin
          </button>
        {/if}
      </div>

      <!-- Mobile Menu Button -->
      <div class="lg:hidden flex items-center space-x-4">
        {#if adminStatus}
          <button
            on:click={handleLogout}
            class="px-3 py-1 text-xs font-medium text-white bg-red-600 bg-opacity-80 hover:bg-red-700 hover:bg-opacity-90 rounded transition-colors duration-300 backdrop-blur-sm"
          >
            Logout
          </button>
        {/if}
        <button
          on:click={toggleMenu}
          class="p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {#if isMenuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            {/if}
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div 
    class="lg:hidden transition-all duration-300 overflow-hidden {isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}"
  >
    <div class="px-4 py-4 space-y-2 border-t border-blue-700 border-opacity-30 pb-6 backdrop-blur-lg bg-blue-900 bg-opacity-50">
      {#each navItems as item}
        <button
          on:click={() => scrollToSection(item.href)}
          class="block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 text-white hover:bg-blue-800 hover:bg-opacity-30 {activeSection === item.href ? 'bg-blue-800 bg-opacity-30' : ''}"
        >
          {item.name}
        </button>
      {/each}
      
      {#if adminStatus}
        <button
          on:click={handleLogout}
          class="w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 text-white bg-red-600 bg-opacity-80 hover:bg-red-700 hover:bg-opacity-90 backdrop-blur-sm"
        >
          Logout Admin
        </button>
      {/if}
      
      <button
        on:click={() => scrollToSection('#contact')}
        class="w-full mt-4 px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 bg-blue-600 bg-opacity-80 hover:bg-blue-700 hover:bg-opacity-90 text-white backdrop-blur-sm"
      >
        Daftar Sekarang
      </button>
    </div>
  </div>
</nav>

<!-- Login Modal -->
<LoginModal bind:this={loginModal} on:loginSuccess={handleLoginSuccess} />

<style>
  nav {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    background-color: rgba(30, 58, 138, 0.5);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .navbar-scrolled {
    background-color: rgba(30, 58, 138, 0.7);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
</style>