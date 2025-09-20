<script>
  import { onMount } from 'svelte';
  
  let scrollPosition = 0;
  
  onMount(() => {
    window.addEventListener('scroll', () => {
      scrollPosition = window.scrollY;
    });
  });
</script>

<section class="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-blue-700 to-yellow-500 overflow-hidden">
  <!-- Background dengan efek panah -->
  <div class="absolute inset-0 opacity-10">
    <div class="absolute top-1/4 left-1/4 w-16 h-16 border-r-4 border-t-4 border-yellow-400 transform rotate-45"></div>
    <div class="absolute top-1/3 right-1/4 w-16 h-16 border-l-4 border-t-4 border-yellow-400 transform -rotate-45"></div>
    <div class="absolute bottom-1/4 left-1/3 w-16 h-16 border-r-4 border-b-4 border-yellow-400 transform -rotate-45"></div>
    <div class="absolute bottom-1/3 right-1/3 w-16 h-16 border-l-4 border-b-4 border-yellow-400 transform rotate-45"></div>
  </div>

  <div class="text-center text-white z-10 px-4 transform transition-transform duration-700" style="transform: translateY({scrollPosition * 0.2}px)">
    <h1 class="text-5xl md:text-7xl font-bold mb-4 tracking-wider">AMOEBAS ARCHERY</h1>
    <div class="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
    <p class="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Kuda & Panah - Pengalaman Berkuda dan Memanah Profesional</p>
    <a href="#services" class="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 inline-block">
      Jelajahi Layanan
    </a>
  </div>

  <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
    <svg class="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
    </svg>
  </div>
</section>