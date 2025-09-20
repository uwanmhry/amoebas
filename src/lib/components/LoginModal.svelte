<script>
  import { login } from '$lib/auth';
  
  let email = '';
  let password = '';
  let error = '';
  let isLoading = false;
  let isVisible = false;

  // Export function untuk show/hide modal
  export function open() {
    isVisible = true;
  }
  
  export function close() {
    isVisible = false;
    email = '';
    password = '';
    error = '';
  }

  const handleLogin = async () => {
    try {
      isLoading = true;
      error = '';
      await login(email, password);
      close(); // Tutup modal setelah login berhasil
    } catch (err) {
      error = err.message;
    } finally {
      isLoading = false;
    }
  };

  // Handle keyboard events
  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
    if (e.key === 'Escape') {
      close();
    }
  };
</script>

{#if isVisible}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" on:keydown={handleKeypress}>
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-blue-900">Admin Login</h3>
          <button on:click={close} class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        {#if error}
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        {/if}
        
        <form on:submit|preventDefault={handleLogin} class="space-y-4">
          <div>
            <label for="login-email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="login-email"
              bind:value={email}
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="admin@amoebas.com"
            />
          </div>
          
          <div>
            <label for="login-password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="login-password"
              bind:value={password}
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            class="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors disabled:opacity-50"
          >
            {#if isLoading}
              <span class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            {:else}
              Login
            {/if}
          </button>
        </form>
      </div>
    </div>
  </div>
{/if}