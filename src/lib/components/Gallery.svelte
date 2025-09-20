<script>
  import { onMount, onDestroy } from 'svelte';
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

  // ---------- Fetch images from Supabase Storage ----------
  async function fetchImages() {
    isLoading = true;
    try {
      // list files under folder "gallery"
      const { data, error } = await supabase.storage
        .from('gallery-images')
        .list('gallery', { limit: 100, offset: 0 });

      if (error) throw error;

      // sort by created_at if available (desc)
      const files = (data || []).slice();
      files.sort((a, b) => {
        const ta = a?.created_at ? new Date(a.created_at).getTime() : 0;
        const tb = b?.created_at ? new Date(b.created_at).getTime() : 0;
        return tb - ta;
      });

      // map to objects with public URL
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

  // ---------- File selection handler ----------
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

      // upload to storage
      const { error: uploadErr } = await supabase.storage
        .from('gallery-images')
        .upload(filePath, newImage.file, { cacheControl: '3600', upsert: false });

      if (uploadErr) throw uploadErr;

      uploadProgress = 65;

      // get public url
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(filePath);

      // Try to insert metadata to table 'gallery' if present.
      // If this fails (e.g. missing columns), we swallow the error but still show success for storage upload.
      try {
        // we only insert common columns; if table doesn't have them, this may throw (caught below)
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
        // don't block — log and notify softly
        console.warn('DB insert warning (non-fatal):', dbInsertErr.message || dbInsertErr);
      }

      uploadProgress = 100;
      showNotification('Upload berhasil 🎉', 'success');
      // reset form
      newImage = { title: '', description: '', file: null };
      showUploadModal = false;

      // refresh gallery
      await fetchImages();
    } catch (err) {
      console.error('Upload failed:', err);
      uploadError = err.message || 'Terjadi kesalahan saat upload';
      showNotification('Upload gagal 😢', 'error');
    } finally {
      // reset progress after a bit
      setTimeout(() => (uploadProgress = 0), 500);
    }
  }

  function cancelUpload() {
    newImage = { title: '', description: '', file: null };
    showUploadModal = false;
    uploadError = '';
    uploadProgress = 0;
  }

  // ---------- Delete flow (storage + db row if exists) ----------
  function confirmDelete(image) {
    imageToDelete = image;
    showDeleteModal = true;
  }

  async function deleteImage() {
    if (!imageToDelete) return;
    deleting = true;
    try {
      // remove from storage
      const { error: storageErr } = await supabase.storage
        .from('gallery-images')
        .remove([`gallery/${imageToDelete.name}`]);
      if (storageErr) throw storageErr;

      // remove from DB if any rows match image_url
      try {
        const { error: dbErr } = await supabase
          .from('gallery')
          .delete()
          .eq('image_url', imageToDelete.url);
        if (dbErr) throw dbErr;
      } catch (dbDeleteErr) {
        // non-fatal: warn only
        console.warn('DB delete warning (non-fatal):', dbDeleteErr.message || dbDeleteErr);
      }

      // update local UI
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

  // ---------- lifecycle ----------
  onMount(async () => {
    unsubscribeAdmin = isAdmin.subscribe(v => adminStatus = !!v);
    await fetchImages();
  });

  onDestroy(() => {
    if (unsubscribeAdmin) unsubscribeAdmin();
  });
</script>

<!-- TOAST -->
{#if showToast}
  <div class="fixed top-6 right-6 z-50">
    <div class="px-4 py-2 rounded shadow-lg text-white"
         style="background:{toastType === 'success' ? '#059669' : '#DC2626'}">
      {toastMsg}
    </div>
  </div>
{/if}

<section id="gallery" class="py-20 bg-white">
  <div class="container mx-auto px-4">
    <!-- Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-blue-900 mb-3">Galeri Kegiatan</h2>
      <div class="w-16 h-1 bg-yellow-500 mx-auto mb-4"></div>
      <p class="text-gray-600 max-w-3xl mx-auto">Potret momen berkuda & memanah bersama Amoebas Archery.</p>

      {#if adminStatus}
        <div class="mt-6">
          <button
            class="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded-lg transition"
            on:click={() => showUploadModal = true}
          >
            + Upload Foto Baru
          </button>
        </div>
      {/if}
    </div>

    <!-- Loading -->
    {#if isLoading}
      <div class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    {:else}
      {#if images.length === 0}
        <!-- Empty state -->
        <div class="text-center py-12">
          <!-- inline simple SVG illustration -->
          <svg class="w-24 h-24 mx-auto mb-4 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="5" width="18" height="14" rx="2"></rect>
            <path d="M8 11l2 2 4-4"></path>
          </svg>
          <h3 class="text-lg font-semibold text-gray-700">Belum ada foto di galeri</h3>
          <p class="text-gray-500 mt-2">Nanti akan muncul momen-momen seru di sini — sabar ya! 😊</p>
        </div>
      {:else}
        <!-- Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {#each images as img}
            <div class="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
              <img
                src={img.url}
                alt={img.name}
                class="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />

              {#if adminStatus}
                <!-- trash icon button -->
                <button
                  class="absolute top-3 right-3 bg-red-600/85 hover:bg-red-700 text-white p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
                  on:click={() => confirmDelete(img)}
                  title="Hapus gambar"
                >
                  <!-- trash SVG -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6"/>
                  </svg>
                </button>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    {/if}
  </div>

  <!-- Upload Modal (backdrop blur + opacity 50%) -->
  {#if showUploadModal}
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 animate-fadeInScale">
        <div class="p-6">
          <h3 class="text-xl font-bold text-blue-900 mb-4">Upload Foto Baru</h3>

          <div class="space-y-4">
            <!-- optional title/description kept for DB metadata (but not shown in grid) -->
            <div>
              <label class="block text-sm text-gray-700 mb-1">Judul (opsional)</label>
              <input
                type="text"
                bind:value={newImage.title}
                class="w-full px-3 py-2 border rounded-md"
                placeholder="Judul foto (opsional)"
              />
            </div>

            <div>
              <label class="block text-sm text-gray-700 mb-1">Deskripsi (opsional)</label>
              <textarea
                bind:value={newImage.description}
                rows="3"
                class="w-full px-3 py-2 border rounded-md"
                placeholder="Deskripsi singkat (opsional)"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm text-gray-700 mb-1">Pilih Foto</label>
              <input
                type="file"
                accept="image/*"
                on:change={handleFileSelect}
                class="w-full px-3 py-2 border rounded-md"
              />
              <p class="text-xs text-gray-500 mt-1">Format: JPG/PNG/GIF — maksimal 5MB</p>
              {#if newImage.file}
                <p class="text-sm text-green-600 mt-1">File terpilih: {newImage.file.name}</p>
              {/if}
            </div>

            {#if uploadError}
              <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                {uploadError}
              </div>
            {/if}

            {#if uploadProgress > 0}
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full transition-all" style={`width: ${uploadProgress}%`}></div>
              </div>
              <p class="text-sm text-gray-600 text-center">Upload: {uploadProgress}%</p>
            {/if}
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              class="px-4 py-2 text-gray-600 hover:text-gray-800"
              on:click={cancelUpload}
              disabled={uploadProgress > 0 && uploadProgress < 100}
            >
              Batal
            </button>
            <button
              class="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 disabled:opacity-50"
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

  <!-- Delete Confirmation Modal -->
  {#if showDeleteModal}
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center transform transition-all duration-300 animate-fadeInScale">
        <svg class="w-12 h-12 text-red-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6"/>
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Hapus Gambar?</h3>
        <p class="text-gray-600 mb-6">Gambar ini akan dihapus permanen dari storage.</p>
        <div class="flex justify-center space-x-4">
          <button class="px-4 py-2 border rounded-md text-gray-600 hover:text-gray-800" on:click={cancelDelete} disabled={deleting}>
            Batal
          </button>
          <button class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700" on:click={deleteImage} disabled={deleting}>
            {deleting ? 'Menghapus...' : 'Hapus'}
          </button>
        </div>
      </div>
    </div>
  {/if}
</section>

<style>
  @keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.98); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fadeInScale {
    animation: fadeInScale 0.22s ease-out forwards;
  }

  input[type="file"]::file-selector-button {
    background: #f0f0f0;
    border: 1px solid #d1d5db;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    border-radius: 0.375rem;
    cursor: pointer;
  }
  input[type="file"]::file-selector-button:hover {
    background: #e5e7eb;
  }
</style>
