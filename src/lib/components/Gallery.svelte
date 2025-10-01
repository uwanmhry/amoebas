<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { supabase } from '$lib/supabaseClient';
  import { isAdmin } from '$lib/auth';
  
  // UI state
  let images = []; // { name, url, created_at? }
  let isLoading = true;

  // Admin & subscription
  let adminStatus = false;
  let unsubscribeAdmin;

  // Upload modal state
  let showUploadModal = false;
  let newImage = { title: '', description: '', file: null };
  let uploadProgress = 0;
  let uploadError = '';

  // Delete modal state
  let showDeleteModal = false;
  let imageToDelete = null;
  let deleting = false;

  // Delete ALL modal state
  let showDeleteAllModal = false;
  let deletingAll = false;

  // Toast notification
  let toastMsg = '';
  let toastType = 'success'; // 'success' | 'error'
  let showToast = false;
  const showNotification = (msg, type = 'success', ms = 2500) => {
    toastMsg = msg;
    toastType = type;
    showToast = true;
    setTimeout(() => (showToast = false), ms);
  };

  // ---------- Fetch images ----------
  async function fetchImages() {
    isLoading = true;
    try {
      const { data, error } = await supabase.storage
        .from('gallery-images')
        .list('gallery', { limit: 100, offset: 0 });

      if (error) throw error;

      const files = (data || []).slice();
      files.sort((a, b) => {
        const ta = a?.created_at ? new Date(a.created_at).getTime() : 0;
        const tb = b?.created_at ? new Date(b.created_at).getTime() : 0;
        return tb - ta;
      });

      images = files.map(f => {
        const { data: { publicUrl } } = supabase.storage
          .from('gallery-images')
          .getPublicUrl(`gallery/${f.name}`);
        return {
          name: f.name,
          url: publicUrl,
          created_at: f.created_at ?? f.updated_at ?? null
        };
      });
    } catch (err) {
      console.error('Failed fetching images:', err);
      images = [];
      showNotification('Gagal memuat galeri', 'error');
    } finally {
      isLoading = false;
    }
  }

  // ---------- File selection ----------
  function handleFileSelect(e) {
    uploadError = '';
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      newImage.file = null;
      return;
    }
    if (!file.type.startsWith('image/')) {
      uploadError = 'File harus berupa gambar';
      newImage.file = null;
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      uploadError = 'Ukuran file maksimal 5MB';
      newImage.file = null;
      return;
    }
    newImage.file = file;
  }

  // ---------- Upload image ----------
  async function uploadImage() {
    if (!newImage.file) {
      uploadError = 'Pilih file gambar terlebih dahulu';
      return;
    }

    uploadError = '';
    uploadProgress = 10;

    try {
      const fileExt = newImage.file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2,8)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      uploadProgress = 30;

      const { error: uploadErr } = await supabase.storage
        .from('gallery-images')
        .upload(filePath, newImage.file, { cacheControl: '3600', upsert: false });

      if (uploadErr) throw uploadErr;

      uploadProgress = 65;

      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(filePath);

      try {
        const { error: dbErr } = await supabase
          .from('gallery')
          .insert([{
            image_url: publicUrl,
            title: newImage.title || null,
            description: newImage.description || null,
            uploaded_by: (await supabase.auth.getUser()).data.user?.email ?? null
          }]);
        if (dbErr) throw dbErr;
      } catch (dbInsertErr) {
        console.warn('DB insert warning (non-fatal):', dbInsertErr.message || dbInsertErr);
      }

      uploadProgress = 100;
      showNotification('Upload berhasil 🎉', 'success');
      newImage = { title: '', description: '', file: null };
      showUploadModal = false;
      await fetchImages();
    } catch (err) {
      console.error('Upload failed:', err);
      uploadError = err.message || 'Terjadi kesalahan saat upload';
      showNotification('Upload gagal 😢', 'error');
    } finally {
      setTimeout(() => (uploadProgress = 0), 500);
    }
  }

  function cancelUpload() {
    newImage = { title: '', description: '', file: null };
    showUploadModal = false;
    uploadError = '';
    uploadProgress = 0;
  }

  // ---------- Delete one ----------
  function confirmDelete(image) {
    imageToDelete = image;
    showDeleteModal = true;
  }

  async function deleteImage() {
    if (!imageToDelete) return;
    deleting = true;
    try {
      const { error: storageErr } = await supabase.storage
        .from('gallery-images')
        .remove([`gallery/${imageToDelete.name}`]);
      if (storageErr) throw storageErr;

      try {
        const { error: dbErr } = await supabase
          .from('gallery')
          .delete()
          .eq('image_url', imageToDelete.url);
        if (dbErr) throw dbErr;
      } catch (dbDeleteErr) {
        console.warn('DB delete warning (non-fatal):', dbDeleteErr.message || dbDeleteErr);
      }

      images = images.filter(img => img.name !== imageToDelete.name);
      showNotification('Foto berhasil dihapus', 'success');
    } catch (err) {
      console.error('Failed to delete image:', err);
      showNotification('Gagal menghapus foto', 'error');
    } finally {
      deleting = false;
      showDeleteModal = false;
      imageToDelete = null;
    }
  }

  function cancelDelete() {
    showDeleteModal = false;
    imageToDelete = null;
  }

  // ---------- Delete all ----------
  function confirmDeleteAll() {
    showDeleteAllModal = true;
  }

  async function deleteAllImages() {
    if (images.length === 0) return;
    deletingAll = true;
    try {
      const paths = images.map(img => `gallery/${img.name}`);
      const { error: storageErr } = await supabase.storage
        .from('gallery-images')
        .remove(paths);
      if (storageErr) throw storageErr;

      try {
        const { error: dbErr } = await supabase
          .from('gallery')
          .delete()
          .in('image_url', images.map(img => img.url));
        if (dbErr) throw dbErr;
      } catch (dbDeleteErr) {
        console.warn('DB deleteAll warning (non-fatal):', dbDeleteErr.message || dbDeleteErr);
      }

      images = [];
      showNotification('Semua foto berhasil dihapus', 'success');
    } catch (err) {
      console.error('Failed to delete all images:', err);
      showNotification('Gagal menghapus semua foto', 'error');
    } finally {
      deletingAll = false;
      showDeleteAllModal = false;
    }
  }

  function cancelDeleteAll() {
    showDeleteAllModal = false;
  }

  // Handle escape key - hanya di browser
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      if (showUploadModal) cancelUpload();
      if (showDeleteModal) cancelDelete();
      if (showDeleteAllModal) cancelDeleteAll();
    }
  }

  // Handle click outside modal
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      if (showUploadModal) cancelUpload();
      if (showDeleteModal) cancelDelete();
      if (showDeleteAllModal) cancelDeleteAll();
    }
  }

  // ---------- lifecycle ----------
  onMount(async () => {
    // Hanya jalankan di browser
    if (browser) {
      unsubscribeAdmin = isAdmin.subscribe(v => adminStatus = !!v);
      await fetchImages();
      window.addEventListener('keydown', handleKeydown);
    }
  });

  onDestroy(() => {
    // Hanya jalankan di browser
    if (browser) {
      if (unsubscribeAdmin) unsubscribeAdmin();
      window.removeEventListener('keydown', handleKeydown);
    }
  });
</script>

<!-- TOAST -->
{#if showToast}
  <div class="fixed top-6 right-6 z-50 animate-fadeInScale">
    <div class="px-6 py-4 rounded-2xl shadow-2xl text-white font-semibold backdrop-blur-sm border border-white/20"
         class:bg-gradient-to-r={toastType === 'success'} 
         class:from-green-500={toastType === 'success'}
         class:to-emerald-600={toastType === 'success'}
         class:from-red-500={toastType === 'error'}
         class:to-rose-600={toastType === 'error'}>
      {toastMsg}
    </div>
  </div>
{/if}

<section id="gallery" class="relative py-32 overflow-hidden">
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
    <!-- Header -->
    <div class="text-center mb-20">
      <div class="flex justify-center items-center gap-3 mb-4">
        <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <span class="text-yellow-400 text-sm font-semibold tracking-widest uppercase">Galeri Kegiatan</span>
        <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>
      
      <h2 class="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
        Momen
        <span class="inline-block bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
          Berkesan
        </span>
      </h2>
      
      <div class="flex justify-center items-center gap-3 mb-6">
        <div class="w-16 h-1 bg-gradient-to-r from-yellow-400 to-transparent"></div>
        <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
        <div class="w-16 h-1 bg-gradient-to-l from-yellow-400 to-transparent"></div>
      </div>
      
      <p class="text-xl text-gray-300 max-w-3xl mx-auto">
        Potret momen berkuda & memanah bersama Amoebas Archery.
      </p>

      {#if adminStatus}
        <div class="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            class="group relative bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-blue-900 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg overflow-hidden"
            on:click={() => showUploadModal = true}
          >
            <div class="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            <div class="relative flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              <span>Upload Foto Baru</span>
            </div>
          </button>

          {#if images.length > 0}
            <button
              class="group relative bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg overflow-hidden"
              on:click={confirmDeleteAll}
            >
              <div class="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <div class="relative flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6"/>
                </svg>
                <span>Hapus Semua</span>
              </div>
            </button>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Loading -->
    {#if isLoading}
      <div class="flex justify-center items-center h-64">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin"></div>
          <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin" style="animation-duration: 1.5s"></div>
        </div>
      </div>
    {:else}
      {#if images.length === 0}
        <!-- Empty state -->
        <div class="text-center py-20">
          <div class="relative inline-block mb-6">
            <div class="w-32 h-32 bg-gradient-to-br from-slate-800/50 to-blue-900/50 backdrop-blur-sm border border-white/10 rounded-3xl flex items-center justify-center">
              <svg class="w-16 h-16 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                <path d="M8 11l2 2 4-4"></path>
              </svg>
            </div>
            <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">Belum ada foto di galeri</h3>
          <p class="text-gray-400 text-lg max-w-md mx-auto">Nanti akan muncul momen-momen seru di sini — sabar ya! 😊</p>
        </div>
      {:else}
        <!-- Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {#each images as img}
            <div class="group relative bg-gradient-to-br from-slate-800/50 to-blue-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 transform hover:scale-[1.03]">
              <div class="relative overflow-hidden">
                <img
                  src={img.url}
                  alt={img.name}
                  class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {#if adminStatus}
                  <button
                    class="absolute top-3 right-3 bg-gradient-to-r from-red-600 to-rose-700 text-white p-2.5 rounded-full shadow-2xl 
                           opacity-90 hover:opacity-100 transform hover:scale-110 transition-all duration-200 border border-white/20"
                    on:click={() => confirmDelete(img)}
                    title="Hapus gambar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6"/>
                    </svg>
                  </button>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    {/if}
  </div>

  <!-- Upload Modal -->
  {#if showUploadModal}
    <div class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4" 
         on:click={handleBackdropClick}>
      <div class="bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 animate-fadeInScale">
        <div class="p-6">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white">Upload Foto Baru</h3>
            </div>
            <button 
              class="text-gray-400 hover:text-white transition-colors"
              on:click={cancelUpload}
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Form Content -->
          <div class="space-y-4">
            <!-- Title -->
            <div>
              <label class="block text-sm text-gray-300 mb-2 font-medium">Judul (opsional)</label>
              <input
                type="text"
                bind:value={newImage.title}
                class="w-full px-4 py-2.5 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-sm"
                placeholder="Judul foto (opsional)"
              />
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm text-gray-300 mb-2 font-medium">Deskripsi (opsional)</label>
              <textarea
                bind:value={newImage.description}
                rows="2"
                class="w-full px-4 py-2.5 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none text-sm"
                placeholder="Deskripsi singkat (opsional)"
              ></textarea>
            </div>

            <!-- File Upload -->
            <div>
              <label class="block text-sm text-gray-300 mb-2 font-medium">Pilih Foto</label>
              <div class="relative">
                <input
                  type="file"
                  accept="image/*"
                  on:change={handleFileSelect}
                  class="w-full px-4 py-2.5 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-yellow-500 file:text-blue-900 hover:file:bg-yellow-400"
                />
                <p class="text-xs text-gray-400 mt-1">Format: JPG/PNG/GIF — maksimal 5MB</p>
              </div>
              {#if newImage.file}
                <div class="mt-2 p-2 bg-green-500/10 border border-green-400/20 rounded-lg">
                  <p class="text-green-400 text-xs font-medium">✓ File terpilih: {newImage.file.name}</p>
                </div>
              {/if}
            </div>

            <!-- Error Message -->
            {#if uploadError}
              <div class="bg-red-500/10 border border-red-400/20 px-3 py-2 rounded-lg">
                <p class="text-red-400 text-sm font-medium">{uploadError}</p>
              </div>
            {/if}

            <!-- Progress Bar -->
            {#if uploadProgress > 0}
              <div class="space-y-2">
                <div class="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div class="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full transition-all duration-300" style={`width: ${uploadProgress}%`}></div>
                </div>
                <p class="text-center text-gray-400 text-xs font-medium">Upload: {uploadProgress}%</p>
              </div>
            {/if}
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 mt-6 pt-4 border-t border-white/10">
            <button
              class="px-4 py-2 text-gray-300 hover:text-white font-medium transition-all disabled:opacity-50 rounded-lg hover:bg-white/5 text-sm"
              on:click={cancelUpload}
              disabled={uploadProgress > 0 && uploadProgress < 100}
            >
              Batal
            </button>
            <button
              class="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-blue-900 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 text-sm"
              on:click={uploadImage}
              disabled={!newImage.file || (uploadProgress > 0 && uploadProgress < 100)}
            >
              {uploadProgress > 0 ? 'Mengupload...' : 'Upload'}
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Delete One Modal -->
  {#if showDeleteModal}
    <div class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4" 
         on:click={handleBackdropClick}>
      <div class="bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center animate-fadeInScale">
        <div class="w-16 h-16 bg-gradient-to-br from-red-600 to-rose-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Hapus Gambar?</h3>
        <p class="text-gray-400 text-sm mb-6">Gambar ini akan dihapus permanen dari storage.</p>
        <div class="flex justify-center space-x-3">
          <button 
            class="px-4 py-2 border border-white/20 text-gray-300 rounded-lg hover:text-white hover:bg-white/5 transition-all disabled:opacity-50 text-sm" 
            on:click={cancelDelete} 
            disabled={deleting}
          >
            Batal
          </button>
          <button 
            class="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-lg hover:from-red-500 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 text-sm" 
            on:click={deleteImage} 
            disabled={deleting}
          >
            {deleting ? 'Menghapus...' : 'Hapus'}
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Delete ALL Modal -->
  {#if showDeleteAllModal}
    <div class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4" 
         on:click={handleBackdropClick}>
      <div class="bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center animate-fadeInScale">
        <div class="w-16 h-16 bg-gradient-to-br from-red-600 to-rose-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Hapus Semua Gambar?</h3>
        <p class="text-gray-400 text-sm mb-6">Semua gambar akan dihapus permanen dari storage.</p>
        <div class="flex justify-center space-x-3">
          <button 
            class="px-4 py-2 border border-white/20 text-gray-300 rounded-lg hover:text-white hover:bg-white/5 transition-all disabled:opacity-50 text-sm" 
            on:click={cancelDeleteAll} 
            disabled={deletingAll}
          >
            Batal
          </button>
          <button 
            class="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-lg hover:from-red-500 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 text-sm" 
            on:click={deleteAllImages} 
            disabled={deletingAll}
          >
            {deletingAll ? 'Menghapus...' : 'Hapus Semua'}
          </button>
        </div>
      </div>
    </div>
  {/if}
</section>

<style>
  @keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fadeInScale { animation: fadeInScale 0.3s ease-out; }
</style>