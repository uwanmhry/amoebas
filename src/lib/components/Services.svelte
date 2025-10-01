<script>
  import { onMount } from 'svelte';
  
  let mounted = false;
  let hoveredCard = null;

  onMount(() => {
    mounted = true;
  });

  const services = [
    {
      id: 'riding',
      title: 'Berkuda',
      subtitle: 'Horse Riding',
      icon: 'M20.8 12c-.6 0-1.2.2-1.7.5-.3-2.1-1.9-3.8-4-4.2V7c0-1.7-1.3-3-3-3s-3 1.3-3 3v1.3c-2.1.4-3.7 2.1-4 4.2-.5-.3-1.1-.5-1.7-.5C2.6 12 2 12.6 2 13.4s.6 1.4 1.4 1.4c.4 0 .7-.1 1-.3.3 2.1 1.9 3.8 4 4.2V20c0 .6.4 1 1 1s1-.4 1-1v-1.3c2.1-.4 3.7-2.1 4-4.2.3.2.6.3 1 .3.8 0 1.4-.6 1.4-1.4S21.6 12 20.8 12z',
      description: 'Pelajari seni berkuda dari dasar hingga mahir dengan instruktur bersertifikat. Program kami dirancang untuk semua usia dan tingkat pengalaman.',
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        'Kelas trial untuk pemula',
        'Program member dengan sertifikat',
        'Kelas kelompok dan keluarga',
        'Peralatan safety standar internasional'
      ]
    },
    {
      id: 'archery',
      title: 'Memanah',
      subtitle: 'Archery',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      description: 'Temukan ketepatan dan fokus melalui seni memanah. Program kami mencakup semua tingkat dari pemula hingga kompetisi.',
      gradient: 'from-yellow-500 to-amber-500',
      features: [
        'Dengan pendampingan pelatih',
        'Latihan mandiri',
        'Sewa peralatan lengkap',
        'Program persiapan kompetisi'
      ]
    }
  ];
</script>

<section id="services" class="relative py-32 overflow-hidden">
  <!-- Multi-layer Background -->
  <div class="absolute inset-0">
    <!-- Base gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
    
    <!-- Overlay gradients -->
    <div class="absolute inset-0 bg-gradient-to-tr from-yellow-500/5 via-transparent to-amber-500/10"></div>
    <div class="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-800/10 to-cyan-900/5"></div>
  </div>

  <!-- Animated Background Particles -->
  <div class="absolute inset-0 opacity-10">
    {#each Array(25) as _, i}
      <div 
        class="absolute rounded-full bg-yellow-400 animate-float"
        style="
          left: {Math.random() * 100}%;
          top: {Math.random() * 100}%;
          width: {2 + Math.random() * 3}px;
          height: {2 + Math.random() * 3}px;
          animation-delay: {Math.random() * 5}s;
          animation-duration: {4 + Math.random() * 3}s;
        "
      ></div>
    {/each}
  </div>

  <!-- Decorative Elements -->
  <div class="absolute inset-0 opacity-5">
    <!-- Target circles -->
    <div class="absolute top-20 right-20 w-32 h-32">
      <div class="w-full h-full border-4 border-yellow-400 rounded-full animate-ping"></div>
    </div>
    <div class="absolute bottom-20 left-20 w-24 h-24">
      <div class="w-full h-full border-4 border-blue-400 rounded-full animate-ping" style="animation-duration: 3s;"></div>
    </div>
    
    <!-- Arrow decoration -->
    <div class="absolute top-1/2 left-10 transform -rotate-45">
      <div class="w-20 h-20 border-l-4 border-t-4 border-yellow-400"></div>
    </div>
    <div class="absolute top-1/3 right-10 transform rotate-45">
      <div class="w-16 h-16 border-r-4 border-b-4 border-blue-400"></div>
    </div>
  </div>

  <div class="container mx-auto px-6 relative z-10">
    <!-- Section Header -->
    <div 
      class="text-center mb-20 transition-all duration-1000"
      class:opacity-100={mounted}
      class:opacity-0={!mounted}
      class:translate-y-0={mounted}
      class:translate-y-8={!mounted}
    >
      <div class="flex items-center justify-center gap-3 mb-4">
        <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <span class="text-yellow-400 text-sm font-semibold tracking-widest uppercase">Our Services</span>
        <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
      </div>
      
      <h2 class="text-4xl lg:text-6xl font-black text-white mb-4 leading-tight">
        <span class="inline-block bg-gradient-to-r from-white via-gray-100 to-yellow-100 bg-clip-text text-transparent">
          Layanan
        </span>
        {' '}
        <span class="inline-block bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
          Kami
        </span>
      </h2>
      
      <div class="flex items-center justify-center gap-3 mb-6">
        <div class="h-px w-16 bg-gradient-to-r from-transparent to-yellow-400"></div>
        <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
        <div class="h-px w-24 bg-gradient-to-r from-yellow-400 to-transparent"></div>
      </div>
      
      <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Berbagai pilihan program berkuda dan memanah yang dirancang untuk{' '}
        <span class="text-yellow-400 font-semibold">semua tingkat keahlian</span>
      </p>
    </div>
    
    <!-- Services Grid -->
    <div class="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {#each services as service, index}
        <div
          class="transition-all duration-1000"
          class:opacity-100={mounted}
          class:opacity-0={!mounted}
          class:translate-y-0={mounted}
          class:translate-y-12={!mounted}
          style="transition-delay: {index * 200}ms;"
          on:mouseenter={() => hoveredCard = service.id}
          on:mouseleave={() => hoveredCard = null}
        >
          <div class="group relative h-full">
            <!-- Card Background with Glassmorphism -->
            <div class="relative h-full rounded-3xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-[1.02]">
              <!-- Gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-br {service.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              <!-- Animated background on hover -->
              <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <!-- Content -->
              <div class="relative p-8 lg:p-10 h-full flex flex-col">
                <!-- Icon and Title -->
                <div class="flex items-start gap-5 mb-6">
                  <div class="relative">
                    <div class="w-16 h-16 bg-gradient-to-br {service.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <svg class="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{service.icon}"/>
                      </svg>
                    </div>
                    <!-- Pulsing effect -->
                    <div class="absolute inset-0 w-16 h-16 bg-gradient-to-br {service.gradient} rounded-2xl opacity-0 group-hover:opacity-30 animate-ping"></div>
                  </div>
                  
                  <div class="flex-grow">
                    <h3 class="text-3xl font-black text-white mb-1 group-hover:text-yellow-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p class="text-lg text-gray-400 font-semibold tracking-wide">
                      {service.subtitle}
                    </p>
                  </div>
                </div>
                
                <!-- Decorative line -->
                <div class="flex items-center gap-2 mb-6">
                  <div class="h-px flex-grow bg-gradient-to-r {service.gradient} opacity-30"></div>
                  <div class="w-2 h-2 bg-gradient-to-br {service.gradient} rounded-full"></div>
                </div>
                
                <!-- Description -->
                <p class="text-gray-300 text-lg leading-relaxed mb-8">
                  {service.description}
                </p>
                
                <!-- Features List -->
                <div class="space-y-4 flex-grow">
                  {#each service.features as feature, idx}
                    <div 
                      class="flex items-center gap-3 group/item"
                      style="transition-delay: {hoveredCard === service.id ? idx * 50 : 0}ms;"
                    >
                      <div class="w-6 h-6 bg-gradient-to-br {service.gradient} rounded-lg flex items-center justify-center flex-shrink-0 transform group-hover/item:scale-110 transition-transform duration-300">
                        <svg class="w-4 h-4 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span class="text-gray-300 text-base group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-300">
                        {feature}
                      </span>
                    </div>
                  {/each}
                </div>
                
                <!-- CTA Button -->
                <div class="mt-8 pt-6 border-t border-white/10">
                  <button class="group/btn relative w-full bg-gradient-to-r {service.gradient} hover:shadow-2xl text-blue-900 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                    <div class="absolute inset-0 bg-white/20 transform translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></div>
                    <div class="relative flex items-center justify-center gap-2">
                      <span>Pelajari Lebih Lanjut</span>
                      <svg class="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Glow effect on hover -->
            <div class="absolute inset-0 rounded-3xl bg-gradient-to-br {service.gradient} opacity-0 group-hover:opacity-20 blur-2xl -z-10 transition-opacity duration-500"></div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Bottom CTA Section -->
    <div 
      class="mt-20 text-center transition-all duration-1000 delay-500"
      class:opacity-100={mounted}
      class:opacity-0={!mounted}
      class:translate-y-0={mounted}
      class:translate-y-8={!mounted}
    >
      <div class="inline-block relative">
        <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
        <button class="relative bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-blue-900 font-bold py-5 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
          <div class="flex items-center gap-3">
            <span>Lihat Semua Paket</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-10px) rotate(1deg); }
    50% { transform: translateY(-20px) rotate(0deg); }
    75% { transform: translateY(-10px) rotate(-1deg); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
</style>