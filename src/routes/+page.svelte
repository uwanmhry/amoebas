<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import About from '$lib/components/About.svelte';
  import Services from '$lib/components/Services.svelte';
  import Pricing from '$lib/components/Pricing.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>Amoebas Archery - Professional Archery & Horse Riding</title>
  <meta name="description" content="Experience professional archery and horse riding at Amoebas Archery. Modern facilities with expert instructors." />
  <meta name="keywords" content="archery, horse riding, professional training, Amoebas Archery" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<!-- Integrated Navbar with Admin System -->
<Navbar />

<main class="font-sans">
  <!-- Hero Section with proper spacing for fixed navbar -->
  <section id="home">
    <Hero />
  </section>
  
  <!-- About Section -->
  <section id="about">
    <About />
  </section>
  
  <!-- Services Section -->
  <section id="services">
    <Services />
  </section>
  
  <!-- Pricing Section -->
  <section id="pricing">
    <Pricing />
  </section>
  
  <!-- Gallery Section -->
  <section id="gallery">
    <Gallery />
  </section>
  
  <!-- Contact Section -->
  <section id="contact">
    <Contact />
  </section>
  
  <!-- Footer -->
  <Footer />
</main>

<style>
  /* Ensure smooth scrolling for the whole page */
  :global(html) {
    scroll-behavior: smooth;
  }
  
  /* Add padding to account for fixed navbar */
  :global(body) {
    margin: 0;
    padding: 0;
  }
  
  /* Ensure sections have proper spacing */
  section {
    scroll-margin-top: 80px; /* Adjust based on navbar height */
  }
</style>