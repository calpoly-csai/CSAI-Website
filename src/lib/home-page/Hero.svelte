
<script lang="ts">
import { onMount } from "svelte";
    
let ParticlesComponent;
onMount(async () => {
    const module = await import("svelte-particles");

    ParticlesComponent = module.default;
  });

  let particlesConfig = {
    particles: {
      color: {
        value: "#000",
      },
      links: {
        enable: true,
        color: "#000",
      },
      move: {
        enable: true,
      },
    },
  };





</script>


<style lang="scss">
    #particle-background {
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
</style>

<section>
  <div id="particle-background">
    <svelte:component
  this="{ParticlesComponent}"
  options="{particlesConfig}"
/>
  </div>
    
</section>