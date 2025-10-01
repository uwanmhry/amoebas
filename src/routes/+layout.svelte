<script>
  import "../app.css";
  import { onMount } from 'svelte';
  import { initAuth } from '$lib/auth';
  
  onMount(() => {
    initAuth();
  });
</script>

<svelte:head>
  <title>Amoebas Archery - Berkuda & Memanah</title>
</svelte:head>

<div class="min-h-screen">
  <slot />
</div>