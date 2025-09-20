<script>
	import "../app.css";
  import { onMount } from 'svelte';
  import { initAuth, isAdmin, logout } from '$lib/auth';
  import LoginModal from '$lib/components/LoginModal.svelte';
  
  let adminStatus = false;
  let loginModal;
  
  onMount(() => {
    initAuth();
    
    // Subscribe to admin status
    const unsubscribe = isAdmin.subscribe(value => {
      adminStatus = value;
    });
    
    return () => unsubscribe();
  });
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
</script>

<svelte:head>
  <title>Amoebas Archery - Berkuda & Memanah</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Admin Header Bar -->
  {#if adminStatus}
    <div class="bg-yellow-400 text-blue-900 py-2 px-4">
      <div class="container mx-auto flex justify-between items-center">
        <span class="font-semibold">👑 Mode Admin</span>
        <button on:click={handleLogout} class="text-blue-900 hover:text-blue-700 text-sm">
          Logout
        </button>
      </div>
    </div>
  {:else}
    <div class="bg-blue-900 text-white py-2 px-4">
      <div class="container mx-auto flex justify-end">
        <button on:click={() => loginModal.open()} class="text-sm hover:text-yellow-300">
          Admin Login
        </button>
      </div>
    </div>
  {/if}
  
  <slot />
  
  <LoginModal bind:this={loginModal} />
</div>