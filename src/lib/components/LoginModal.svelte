<script>
  import { login } from '$lib/auth';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let email = '';
  let password = '';
  let error = '';
  let isLoading = false;
  let isVisible = false;
  let showPassword = false;
  let modalElement;

  // Export function untuk show/hide modal
  export function open() {
    isVisible = true;
    // Focus trap untuk accessibility
    setTimeout(() => {
      const firstInput = modalElement?.querySelector('input[type="email"]');
      firstInput?.focus();
    }, 100);
  }
  
  export function close() {
    isVisible = false;
    email = '';
    password = '';
    error = '';
    showPassword = false;
    dispatch('close');
  }

  const handleLogin = async () => {
    try {
      isLoading = true;
      error = '';
      await login(email, password);
      dispatch('loginSuccess');
      close(); // Tutup modal setelah login berhasil
    } catch (err) {
      error = err.message;
    } finally {
      isLoading = false;
    }
  };

  const togglePassword = () => {
    showPassword = !showPassword;
  };

  // Handle keyboard events
  const handleKeypress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleLogin();
    }
    if (e.key === 'Escape') {
      close();
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  // Prevent scroll when modal is open
  $: if (typeof window !== 'undefined') {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
</script>

<svelte:window on:keydown={handleKeypress} />

{#if isVisible}
  <!-- Backdrop with blur effect -->
  <div 
    class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
    on:click={handleBackdropClick}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <!-- Modal Container -->
    <div 
      bind:this={modalElement}
      class="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md transform animate-modal-enter border border-white/20"
      on:click|stopPropagation
    >
      <!-- Modal Header -->
      <div class="relative p-6 pb-4">
        <div class="flex items-center justify-between">
          <!-- Icon and Title -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 id="modal-title" class="text-xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                Admin Login
              </h3>
              <p class="text-xs text-gray-500 mt-0.5">Access your dashboard</p>
            </div>
          </div>
          
          <!-- Close Button -->
          <button 
            on:click={close}
            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 transform hover:scale-110"
            aria-label="Close modal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Modal Body -->
      <div class="px-6 pb-6">
        <!-- Error Alert with Animation -->
        {#if error}
          <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-lg animate-shake">
            <div class="flex items-center">
              <svg class="w-4 h-4 text-red-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <p class="text-red-700 text-sm font-medium">{error}</p>
            </div>
          </div>
        {/if}
        
        <!-- Login Form -->
        <form on:submit|preventDefault={handleLogin} class="space-y-5">
          <!-- Email Field -->
          <div class="space-y-2">
            <label for="login-email" class="block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                id="login-email"
                bind:value={email}
                required
                disabled={isLoading}
                class="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white disabled:opacity-50 text-sm"
                placeholder="admin@amoebas.com"
                autocomplete="email"
              />
            </div>
          </div>
          
          <!-- Password Field -->
          <div class="space-y-2">
            <label for="login-password" class="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="login-password"
                bind:value={password}
                required
                disabled={isLoading}
                class="w-full pl-9 pr-11 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white disabled:opacity-50 text-sm"
                placeholder="Enter your password"
                autocomplete="current-password"
              />
              <button
                type="button"
                on:click={togglePassword}
                disabled={isLoading}
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {#if showPassword}
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                {:else}
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                {/if}
              </button>
            </div>
          </div>
          
          <!-- Submit Button -->
          <div class="pt-2">
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl focus:ring-4 focus:ring-blue-200"
            >
              {#if isLoading}
                <div class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </div>
              {:else}
                <div class="flex items-center justify-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign In</span>
                </div>
              {/if}
            </button>
          </div>
        </form>
        
        <!-- Footer Info -->
        <div class="mt-6 pt-4 border-t border-gray-200 text-center">
          <p class="text-xs text-gray-500 flex items-center justify-center space-x-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secured by Amoebas Archery</span>
          </p>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes modal-enter {
    from { 
      opacity: 0; 
      transform: scale(0.95) translateY(-20px); 
    }
    to { 
      opacity: 1; 
      transform: scale(1) translateY(0); 
    }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.2s ease-out;
  }
  
  .animate-modal-enter {
    animation: modal-enter 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }
</style>