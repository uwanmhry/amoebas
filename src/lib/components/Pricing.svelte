<script>
  import { onMount } from 'svelte';
  
  let mounted = false;
  let scrollPosition = 0;
  
  onMount(() => {
    mounted = true;
    
    const handleScroll = () => {
      scrollPosition = window.scrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const horseRidingPrices = [
    { type: "TRIAL", price: "180K", description: "per pertemuan, @ 45 menit" },
    { type: "MEMBER", price: "1.250K", description: "10 pertemuan, @ 45 menit, sertifikat" }
  ];

  const horsebackArcheryPrices = [
    { type: "TRIAL", price: "150K", description: "per pertemuan, @ 45 menit" },
    { type: "MEMBER", price: "1.400K", description: "10 pertemuan, @ 45 menit, sertifikat" }
  ];

  const groupPrices = [
    { type: "PENGENALAN & MENUNGGANG", price: "450K", description: "per 1 kuda, 3 jam, 10 orang" },
    { type: "PEMANTAPAN", price: "450K", description: "per 1 kuda, 3 jam, 5 orang" }
  ];

  const otherPrices = [
    { type: "FUN RIDING", price: "15K", description: "2 helling circle track" },
    { type: "ENDURANCE AND TRACKING", price: "Hubungi CP", description: "Penawaran khusus" }
  ];

  const archeryWithCoach = [
    { type: "TRIAL", price: "45K", description: "bawa alat sendiri" },
    { type: "BASIC", price: "400K", description: "10 pertemuan" },
    { type: "COMPETITION", price: "65K", description: "bawa alat sendiri" }
  ];

  const archeryWithoutCoach = [
    { type: "MANDIRI", price: "15K", description: "per 2 jam, bawa alat sendiri" }
  ];

  const equipmentRental = [
    { type: "SEWA ALAT", price: "25K", description: "per 1 jam, busur + 6 arrow + quiver" }
  ];
</script>

<section id="pricing" class="relative py-32 overflow-hidden">
  <!-- Multi-layer Background -->
  <div class="absolute inset-0">
    <!-- Base gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
    
    <!-- Overlay gradients -->
    <div class="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 via-transparent to-amber-500/5"></div>
    <div class="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-800/20 to-cyan-900/10"></div>
  </div>

  <!-- Animated Background Elements -->
  <div class="absolute inset-0 opacity-10">
    {#each Array(20) as _, i}
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
  <div class="absolute top-20 right-10 opacity-5">
    <div class="w-32 h-32 border-4 border-yellow-400 rounded-full animate-spin-slow"></div>
  </div>
  <div class="absolute bottom-20 left-10 opacity-5">
    <div class="w-24 h-24 border-4 border-blue-400 rounded-full animate-spin-slow" style="animation-direction: reverse;"></div>
  </div>

  <div class="container mx-auto px-6 relative z-10">
    <!-- Section Title -->
    <div class="text-center mb-20">
      <div class="flex justify-center items-center gap-3 mb-4">
        <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <span class="text-yellow-400 text-sm font-semibold tracking-widest uppercase">Paket Harga</span>
        <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>
      
      <h2 class="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
        Pilih Paket
        <span class="inline-block bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
          Terbaik Anda
        </span>
      </h2>
      
      <div class="flex justify-center items-center gap-3 mb-6">
        <div class="w-16 h-1 bg-gradient-to-r from-yellow-400 to-transparent"></div>
        <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
        <div class="w-16 h-1 bg-gradient-to-l from-yellow-400 to-transparent"></div>
      </div>
      
      <p class="text-xl text-gray-300 max-w-3xl mx-auto">
        Pilih paket yang sesuai dengan kebutuhan Anda. Diskon khusus tersedia untuk grup dan member jangka panjang.
      </p>
    </div>

    <div 
      class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      class:opacity-100={mounted}
      class:opacity-0={!mounted}
    >
      <!-- Horse Riding -->
      <div class="group relative bg-gradient-to-br from-slate-800/50 to-blue-900/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 transform hover:scale-[1.02]">
        <div class="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="relative p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white">HORSE RIDING</h3>
          </div>
          <div class="space-y-6">
            {#each horseRidingPrices as item}
              <div class="flex justify-between items-center py-4 border-b border-white/10 group-hover:border-yellow-400/20 transition-colors">
                <div>
                  <h4 class="font-bold text-white text-lg">{item.type}</h4>
                  <p class="text-gray-400 text-sm mt-1">{item.description}</p>
                </div>
                <span class="text-yellow-400 font-black text-xl">{item.price}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Horseback Archery -->
      <div class="group relative bg-gradient-to-br from-slate-800/50 to-blue-900/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 transform hover:scale-[1.02]">
        <div class="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="relative p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white">HORSEBACK ARCHERY</h3>
          </div>
          <div class="space-y-6">
            {#each horsebackArcheryPrices as item}
              <div class="flex justify-between items-center py-4 border-b border-white/10 group-hover:border-yellow-400/20 transition-colors">
                <div>
                  <h4 class="font-bold text-white text-lg">{item.type}</h4>
                  <p class="text-gray-400 text-sm mt-1">{item.description}</p>
                </div>
                <span class="text-yellow-400 font-black text-xl">{item.price}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Group Packages -->
      <div class="group relative bg-gradient-to-br from-slate-800/50 to-blue-900/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 transform hover:scale-[1.02]">
        <div class="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="relative p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white">PAKET GRUP</h3>
          </div>
          <div class="space-y-6">
            {#each groupPrices as item}
              <div class="flex justify-between items-center py-4 border-b border-white/10 group-hover:border-yellow-400/20 transition-colors">
                <div>
                  <h4 class="font-bold text-white text-lg">{item.type}</h4>
                  <p class="text-gray-400 text-sm mt-1">{item.description}</p>
                </div>
                <span class="text-yellow-400 font-black text-xl">{item.price}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Other Services -->
      <div class="group relative bg-gradient-to-br from-slate-800/50 to-blue-900/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 transform hover:scale-[1.02]">
        <div class="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="relative p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white">LAYANAN LAINNYA</h3>
          </div>
          <div class="space-y-6">
            {#each otherPrices as item}
              <div class="flex justify-between items-center py-4 border-b border-white/10 group-hover:border-yellow-400/20 transition-colors">
                <div>
                  <h4 class="font-bold text-white text-lg">{item.type}</h4>
                  <p class="text-gray-400 text-sm mt-1">{item.description}</p>
                </div>
                <span class="text-yellow-400 font-black text-xl">{item.price}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Archery with Coach -->
      <div class="group relative bg-gradient-to-br from-slate-800/50 to-blue-900/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 transform hover:scale-[1.02]">
        <div class="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="relative p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white">ARCHERY (Dengan Pelatih)</h3>
          </div>
          <div class="space-y-6">
            {#each archeryWithCoach as item}
              <div class="flex justify-between items-center py-4 border-b border-white/10 group-hover:border-yellow-400/20 transition-colors">
                <div>
                  <h4 class="font-bold text-white text-lg">{item.type}</h4>
                  <p class="text-gray-400 text-sm mt-1">{item.description}</p>
                </div>
                <span class="text-yellow-400 font-black text-xl">{item.price}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Archery without Coach & Equipment -->
      <div class="group relative bg-gradient-to-br from-slate-800/50 to-blue-900/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 transform hover:scale-[1.02]">
        <div class="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="relative p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white">ARCHERY (Tanpa Pelatih & Sewa)</h3>
          </div>
          <div class="space-y-6">
            {#each archeryWithoutCoach as item}
              <div class="flex justify-between items-center py-4 border-b border-white/10 group-hover:border-yellow-400/20 transition-colors">
                <div>
                  <h4 class="font-bold text-white text-lg">{item.type}</h4>
                  <p class="text-gray-400 text-sm mt-1">{item.description}</p>
                </div>
                <span class="text-yellow-400 font-black text-xl">{item.price}</span>
              </div>
            {/each}
            {#each equipmentRental as item}
              <div class="flex justify-between items-center py-4 border-b border-white/10 group-hover:border-yellow-400/20 transition-colors">
                <div>
                  <h4 class="font-bold text-white text-lg">{item.type}</h4>
                  <p class="text-gray-400 text-sm mt-1">{item.description}</p>
                </div>
                <span class="text-yellow-400 font-black text-xl">{item.price}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Note -->
    <div class="mt-16 text-center">
      <p class="text-gray-400">* Harga dapat berubah sewaktu-waktu. Hubungi kami untuk informasi terbaru.</p>
    </div>
  </div>
</section>