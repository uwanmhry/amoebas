<script>
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

<section id="pricing" class="py-20 bg-blue-900 text-white">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Paket Harga</h2>
      <div class="w-16 h-1 bg-yellow-500 mx-auto mb-6"></div>
      <p class="text-xl max-w-3xl mx-auto">
        Pilih paket yang sesuai dengan kebutuhan Anda. Diskon khusus tersedia untuk grup dan member jangka panjang.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-10">
      <!-- Horse Riding -->
      <div class="bg-blue-800 p-8 rounded-xl shadow-lg">
        <h3 class="text-2xl font-bold mb-6 text-yellow-400 flex items-center">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          HORSE RIDING
        </h3>
        <div class="space-y-4">
          {#each horseRidingPrices as item}
            <div class="flex justify-between items-center py-3 border-b border-blue-700">
              <div>
                <h4 class="font-semibold">{item.type}</h4>
                <p class="text-sm text-blue-200">{item.description}</p>
              </div>
              <span class="text-yellow-400 font-bold text-xl">{item.price}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Horseback Archery -->
      <div class="bg-blue-800 p-8 rounded-xl shadow-lg">
        <h3 class="text-2xl font-bold mb-6 text-yellow-400 flex items-center">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
          </svg>
          HORSEBACK ARCHERY
        </h3>
        <div class="space-y-4">
          {#each horsebackArcheryPrices as item}
            <div class="flex justify-between items-center py-3 border-b border-blue-700">
              <div>
                <h4 class="font-semibold">{item.type}</h4>
                <p class="text-sm text-blue-200">{item.description}</p>
              </div>
              <span class="text-yellow-400 font-bold text-xl">{item.price}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Group Packages -->
      <div class="bg-blue-800 p-8 rounded-xl shadow-lg">
        <h3 class="text-2xl font-bold mb-6 text-yellow-400 flex items-center">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          PAKET GRUP
        </h3>
        <div class="space-y-4">
          {#each groupPrices as item}
            <div class="flex justify-between items-center py-3 border-b border-blue-700">
              <div>
                <h4 class="font-semibold">{item.type}</h4>
                <p class="text-sm text-blue-200">{item.description}</p>
              </div>
              <span class="text-yellow-400 font-bold text-xl">{item.price}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Other Services -->
      <div class="bg-blue-800 p-8 rounded-xl shadow-lg">
        <h3 class="text-2xl font-bold mb-6 text-yellow-400 flex items-center">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          LAYANAN LAINNYA
        </h3>
        <div class="space-y-4">
          {#each otherPrices as item}
            <div class="flex justify-between items-center py-3 border-b border-blue-700">
              <div>
                <h4 class="font-semibold">{item.type}</h4>
                <p class="text-sm text-blue-200">{item.description}</p>
              </div>
              <span class="text-yellow-400 font-bold text-xl">{item.price}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Archery with Coach -->
      <div class="bg-blue-800 p-8 rounded-xl shadow-lg">
        <h3 class="text-2xl font-bold mb-6 text-yellow-400">ARCHERY (Dengan Pelatih)</h3>
        <div class="space-y-4">
          {#each archeryWithCoach as item}
            <div class="flex justify-between items-center py-3 border-b border-blue-700">
              <div>
                <h4 class="font-semibold">{item.type}</h4>
                <p class="text-sm text-blue-200">{item.description}</p>
              </div>
              <span class="text-yellow-400 font-bold text-xl">{item.price}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Archery without Coach & Equipment -->
      <div class="bg-blue-800 p-8 rounded-xl shadow-lg">
        <h3 class="text-2xl font-bold mb-6 text-yellow-400">ARCHERY (Tanpa Pelatih & Sewa)</h3>
        <div class="space-y-4">
          {#each archeryWithoutCoach as item}
            <div class="flex justify-between items-center py-3 border-b border-blue-700">
              <div>
                <h4 class="font-semibold">{item.type}</h4>
                <p class="text-sm text-blue-200">{item.description}</p>
              </div>
              <span class="text-yellow-400 font-bold text-xl">{item.price}</span>
            </div>
          {/each}
          
          {#each equipmentRental as item}
            <div class="flex justify-between items-center py-3 border-b border-blue-700">
              <div>
                <h4 class="font-semibold">{item.type}</h4>
                <p class="text-sm text-blue-200">{item.description}</p>
              </div>
              <span class="text-yellow-400 font-bold text-xl">{item.price}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div class="mt-12 text-center">
      <p class="text-blue-200">* Harga dapat berubah sewaktu-waktu. Hubungi kami untuk informasi terbaru.</p>
    </div>
  </div>
</section>