<script>
  import { onMount } from 'svelte';
  
  let mounted = false;
  let name = '';
  let email = '';
  let message = '';
  
  onMount(() => {
    mounted = true;
  });
  
  function handleSubmit() {
    // Format pesan untuk WhatsApp
    const whatsappMessage = `Halo Amoebas Archery!%0A%0ANama: ${name}%0AEmail: ${email}%0APesan: ${message}%0A%0ASaya tertarik dengan layanan berkuda dan memanah di Amoebas Archery.`;
    
    // Nomor WhatsApp yang benar
    const phoneNumber = '628112101290';
    
    // Redirect ke WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
    
    // Reset form
    name = '';
    email = '';
    message = '';
  }
</script>

<section id="contact" class="relative py-24 overflow-hidden">
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
    {#each Array(15) as _, i}
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
  <div class="absolute top-10 right-6 opacity-5">
    <div class="w-24 h-24 border-4 border-yellow-400 rounded-full animate-spin-slow"></div>
  </div>
  <div class="absolute bottom-10 left-6 opacity-5">
    <div class="w-20 h-20 border-4 border-blue-400 rounded-full animate-spin-slow" style="animation-direction: reverse;"></div>
  </div>

  <div class="container mx-auto px-4 relative z-10">
    <!-- Section Title -->
    <div class="text-center mb-16">
      <div class="flex justify-center items-center gap-3 mb-4">
        <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <span class="text-yellow-400 text-sm font-semibold tracking-widest uppercase">Hubungi Kami</span>
        <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>
      
      <h2 class="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
        Mari
        <span class="inline-block bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
          Terhubung
        </span>
      </h2>
      
      <div class="flex justify-center items-center gap-3 mb-6">
        <div class="w-12 h-1 bg-gradient-to-r from-yellow-400 to-transparent"></div>
        <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
        <div class="w-12 h-1 bg-gradient-to-l from-yellow-400 to-transparent"></div>
      </div>
      
      <p class="text-lg text-gray-300 max-w-2xl mx-auto">
        Punya pertanyaan atau ingin mendaftar? Hubungi kami melalui WhatsApp atau kunjungi langsung.
      </p>
    </div>
    
    <div 
      class="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
      class:opacity-100={mounted}
      class:opacity-0={!mounted}
    >
      <!-- Contact Information -->
      <div class="space-y-6">
        <!-- Contact Card -->
        <div class="group relative bg-gradient-to-br from-slate-800/50 to-blue-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-yellow-500/10 transition-all duration-300">
          <div class="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative p-6">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white">Informasi Kontak</h3>
            </div>
            
            <div class="space-y-4">
              <!-- Phone -->
              <div class="flex items-start gap-3 group/item transition-all duration-200">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0 mt-1">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-white">Telepon / WhatsApp</h4>
                  <p class="text-gray-300 text-sm mt-1">0811 2101 290</p>
                </div>
              </div>
              
              <!-- Location -->
              <div class="flex items-start gap-3 group/item transition-all duration-200">
                <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0 mt-1">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-white">Lokasi</h4>
                  <p class="text-gray-300 text-sm mt-1">Cae, Kiangroke, Kec. Banjaran, Kab. Bandung, Jawa Barat 40377</p>
                </div>
              </div>
              
              <!-- Social Media -->
              <div class="flex items-start gap-3 group/item transition-all duration-200">
                <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0 mt-1">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-white">Media Sosial</h4>
                  <div class="flex gap-3 mt-2">
                    <a href="https://tiktok.com/@amoebas.archery" target="_blank" class="group/social w-9 h-9 bg-slate-700/50 hover:bg-black rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110">
                      <svg class="w-4 h-4 text-gray-300 group-hover/social:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                      </svg>
                    </a>
                    
                    <a href="https://instagram.com/@amoebas.archery" target="_blank" class="group/social w-9 h-9 bg-slate-700/50 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110">
                      <svg class="w-4 h-4 text-gray-300 group-hover/social:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                      </svg>
                    </a>
                    
                    <a href="https://youtube.com/@amoebasarchery" target="_blank" class="group/social w-9 h-9 bg-slate-700/50 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110">
                      <svg class="w-4 h-4 text-gray-300 group-hover/social:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Contact Form -->
      <div class="group relative bg-gradient-to-br from-slate-800/50 to-blue-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-yellow-500/10 transition-all duration-300">
        <div class="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="relative p-6">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white">Kirim Pesan</h3>
          </div>
          
          <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-semibold text-gray-300 mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                id="name" 
                bind:value={name}
                class="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all" 
                placeholder="Masukkan nama lengkap Anda"
                required
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-semibold text-gray-300 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                bind:value={email}
                class="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all" 
                placeholder="Masukkan alamat email Anda"
                required
              />
            </div>
            
            <div>
              <label for="message" class="block text-sm font-semibold text-gray-300 mb-2">Pesan</label>
              <textarea 
                id="message" 
                bind:value={message}
                rows="4" 
                class="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none" 
                placeholder="Tulis pesan Anda di sini..."
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              class="group relative w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-blue-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg overflow-hidden"
            >
              <div class="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <div class="relative flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
                <span class="text-lg">Kirim Pesan</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>