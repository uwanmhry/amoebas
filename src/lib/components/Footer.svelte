<footer class="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16 overflow-hidden">
  <!-- Background Elements -->
  <div class="absolute inset-0 opacity-5">
    {#each Array(10) as _, i}
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

  <div class="container mx-auto px-4 relative z-10">
    <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <!-- Brand Section -->
      <div>
        <h3 class="text-2xl font-black mb-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
          AMOEBAS ARCHERY
        </h3>
        <p class="mb-6 text-gray-300 leading-relaxed">
          Tempat yang nyaman untuk belajar berkuda dan memanah dengan suasana santai dan ramah.
        </p>
        <div class="flex space-x-4">
          <!-- TikTok -->
          <a href="https://tiktok.com/@amoebas.archery" target="_blank" class="group w-10 h-10 bg-slate-800/50 hover:bg-black rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110">
            <svg class="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
            </svg>
          </a>
          
          <!-- Instagram -->
          <a href="https://instagram.com/@amoebas.archery" target="_blank" class="group w-10 h-10 bg-slate-800/50 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110">
            <svg class="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
            </svg>
          </a>
          
          <!-- YouTube -->
          <a href="https://youtube.com/@amoebasarchery" target="_blank" class="group w-10 h-10 bg-slate-800/50 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110">
            <svg class="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
        </div>
      </div>
      
      <!-- Quick Links -->
      <div>
        <h4 class="text-lg font-bold mb-4 text-yellow-400">Tautan Cepat</h4>
        <ul class="space-y-3">
          <li>
            <a href="#about" class="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
              <div class="w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              Tentang Kami
            </a>
          </li>
          <li>
            <a href="#pricing" class="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
              <div class="w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              Paket Harga
            </a>
          </li>
          <li>
            <a href="#gallery" class="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
              <div class="w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              Galeri
            </a>
          </li>
          <li>
            <a href="#contact" class="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
              <div class="w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              Kontak
            </a>
          </li>
        </ul>
      </div>
      
      <!-- Contact Info -->
      <div>
        <h4 class="text-lg font-bold mb-4 text-yellow-400">Kontak</h4>
        <div class="space-y-3 text-gray-300">
          <div class="flex items-start gap-3">
            <svg class="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            <span>0811 2101 290</span>
          </div>
          <div class="flex items-start gap-3">
            <svg class="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>Cae, Kiangroke, Kec. Banjaran, Kab. Bandung, Jawa Barat 40377</span>
          </div>
        </div>
        
        <div class="mt-6 pt-6 border-t border-white/10">
          <p class="text-sm text-gray-400">
            © 2024 Amoebas Archery. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </div>
</footer>