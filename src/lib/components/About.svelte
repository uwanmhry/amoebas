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
</script>

<section id="about" class="relative overflow-hidden py-32">
	<!-- Multi-layer Background -->
	<div class="absolute inset-0">
		<!-- Base gradient -->
		<div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>

		<!-- Overlay gradients -->
		<div
			class="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 via-transparent to-amber-500/5"
		></div>
		<div
			class="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-800/20 to-cyan-900/10"
		></div>
	</div>

	<!-- Animated Background Elements -->
	<div class="absolute inset-0 opacity-10">
		{#each Array(20) as _, i}
			<div
				class="animate-float absolute rounded-full bg-yellow-400"
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
		<div class="animate-spin-slow h-32 w-32 rounded-full border-4 border-yellow-400"></div>
	</div>
	<div class="absolute bottom-20 left-10 opacity-5">
		<div
			class="animate-spin-slow h-24 w-24 rounded-full border-4 border-blue-400"
			style="animation-direction: reverse;"
		></div>
	</div>

	<div class="relative z-10 container mx-auto px-6">
		<div
			class="flex flex-col items-center gap-16 lg:flex-row"
			class:opacity-100={mounted}
			class:opacity-0={!mounted}
		>
			<!-- Image Section -->
			<div class="w-full lg:w-1/2">
				<div class="group relative">
					<!-- Main Image Container -->
					<div
						class="relative transform overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:scale-[1.02]"
					>
						<!-- Light overlay instead of blur -->
						<div
							class="absolute inset-0 z-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10"
						></div>

						<!-- Actual Image -->
						<img
							src="img/hba.jpg"
							alt="Amoebas Archery - Berkuda dan Memanah"
							class="h-[500px] w-full object-cover"
						/>

						<!-- Overlay gradient on hover -->
						<div
							class="absolute inset-0 z-20 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
						></div>
					</div>

					<!-- Floating Badge -->
					<div
						class="absolute -right-8 -bottom-8 z-30 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
					>
						<div class="relative">
							<div
								class="rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 p-8 text-blue-900 shadow-2xl"
							>
								<span class="block text-4xl font-black tracking-tight">Berkuda</span>
								<span class="block text-2xl font-bold">& Memanah</span>
							</div>
							<div
								class="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 opacity-50 blur-xl"
							></div>
						</div>
					</div>

					<!-- Decorative corner elements -->
					<div
						class="absolute -top-4 -left-4 z-20 h-8 w-8 border-t-4 border-l-4 border-yellow-400 opacity-50"
					></div>
					<div
						class="absolute -right-4 -bottom-4 z-20 h-8 w-8 border-r-4 border-b-4 border-yellow-400 opacity-50"
					></div>
				</div>
			</div>

			<!-- Content Section -->
			<div class="w-full lg:w-1/2">
				<!-- Section Title -->
				<div class="mb-8">
					<div class="mb-4 flex items-center gap-3">
						<div class="h-2 w-2 animate-pulse rounded-full bg-yellow-400"></div>
						<span class="text-sm font-semibold tracking-widest text-yellow-400 uppercase"
							>Tentang Kami</span
						>
						<div class="h-px flex-grow bg-gradient-to-r from-yellow-400/50 to-transparent"></div>
					</div>

					<h2 class="mb-4 text-4xl leading-tight font-black text-white lg:text-5xl">
						Selamat Datang di
						<span
							class="inline-block bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent"
						>
							Amoebas Archery
						</span>
					</h2>

					<div class="mb-6 flex items-center gap-3">
						<div class="h-1 w-16 bg-gradient-to-r from-yellow-400 to-transparent"></div>
						<div class="h-2 w-2 rounded-full bg-yellow-400"></div>
					</div>
				</div>

				<!-- Description -->
				<div class="mb-10 space-y-6">
					<p class="text-lg leading-relaxed text-gray-300">
						Amoebas Archery adalah tempat yang nyaman untuk belajar berkuda dan memanah. 
						Kami menawarkan <span class="font-semibold text-yellow-400">pengalaman menyenangkan</span> 
						yang menggabungkan kedua aktivitas ini dalam suasana yang santai dan ramah.
					</p>
					<p class="text-lg leading-relaxed text-gray-300">
						Dengan peralatan yang memadai dan tempat yang sesuai, kami membuat olahraga berkuda 
						dan panahan bisa dinikmati oleh <span class="font-semibold text-blue-400">semua usia</span>, 
						dari yang baru mencoba sampai yang ingin berlatih lebih serius.
					</p>
				</div>

				<!-- Feature Cards -->
				<div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
					<!-- Card 1 -->
					<div
						class="group relative transform overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-yellow-400/50"
					>
						<div
							class="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
						></div>
						<div class="relative flex items-start gap-4 p-6">
							<div
								class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg"
							>
								<svg
									class="h-6 w-6 text-blue-900"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
									></path>
								</svg>
							</div>
							<div>
								<h3 class="mb-1 text-lg font-bold text-white">Pengalaman Bertahun-tahun</h3>
								<p class="text-sm text-gray-400">
									Tim yang berpengalaman dalam berkuda dan memanah
								</p>
							</div>
						</div>
					</div>

					<!-- Card 2 -->
					<div
						class="group relative transform overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-blue-400/50"
					>
						<div
							class="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
						></div>
						<div class="relative flex items-start gap-4 p-6">
							<div
								class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg"
							>
								<svg
									class="h-6 w-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
									></path>
								</svg>
							</div>
							<div>
								<h3 class="mb-1 text-lg font-bold text-white">Fasilitas Lengkap</h3>
								<p class="text-sm text-gray-400">
									Peralatan dan area yang nyaman untuk berlatih
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- CTA Button -->
				<div class="flex gap-4">
					<button
						class="group relative transform overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 px-8 py-4 font-bold text-blue-900 shadow-lg transition-all duration-300 hover:scale-105 hover:from-yellow-400 hover:to-amber-400 hover:shadow-2xl"
					>
						<div
							class="absolute inset-0 translate-x-full transform bg-white/20 transition-transform duration-300 group-hover:translate-x-0"
						></div>
						<div class="relative flex items-center gap-2">
							<span>Lihat Kegiatan Kami</span>
							<svg
								class="h-5 w-5 transform transition-transform group-hover:translate-x-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 7l5 5m0 0l-5 5m5-5H6"
								/>
							</svg>
						</div>
					</button>
				</div>
			</div>
		</div>
	</div>
</section>