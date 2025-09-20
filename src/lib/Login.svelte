<script>
  import { login } from '$lib/auth';
  
  let email = '';
  let password = '';
  let error = '';
  let isLoading = false;

  const handleLogin = async () => {
    try {
      isLoading = true;
      error = '';
      await login(email, password);
      // Login successful, bisa redirect atau tutup modal
    } catch (err) {
      error = err.message;
    } finally {
      isLoading = false;
    }
  };
</script>

<div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold text-blue-900 mb-6 text-center">Admin Login</h2>
  
  {#if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {error}
    </div>
  {/if}
  
  <form on:submit|preventDefault={handleLogin} class="space-y-4">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input
        type="email"
        id="email"
        bind:value={email}
        required
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="admin@amoebas.com"
      />
    </div>
    
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <input
        type="password"
        id="password"
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
        Logging in...
      {:else}
        Login
      {/if}
    </button>
  </form>
</div>