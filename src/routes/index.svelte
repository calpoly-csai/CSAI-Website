<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;700&display=swap" rel="stylesheet">
</svelte:head>


<script lang="ts">
import Hero from "$lib/home-page/Hero.svelte"
import WhoWeAre from "$lib/home-page/WhoWeAre.svelte"
</script>

<style lang="scss" global>

    * {
        box-sizing: border-box;
    }

    :root {
        --color-primary: #2447A1;
        --color-primary-variant: #2992E5;
        --color-secondary: #F2C75C;
        --color-secondary-variant: #3A913F;
        --color-background: #D6E3F2;
        --color-background-light: #FFF;
        --color-background-dark: #151A47;
        --color-text-light: #fff;
        --color-text-dark: #323232;
    }

    html,body {
        font-family: 'IBM Plex Sans', sans-serif;
        color: var(--color-text-dark);
        margin:0;
    }
h1,h2,h3,h4,h5,h6 {
        font-weight: 800;
}

h1 {
    font-size: 80px;
}
h2 {
    font-size: 50px;
}

h3 {
    font-size: 30px;
}

h4 {
    font-size: 20px;
}

button {
    transform: scale(1);
    transition: transform 0.4s;
    &.wrapper {
        margin:0;
        padding:0;
        background-color: transparent;
    }

    &:active {
        transform: scale(0.95);
    }
}

#Home section {
    position:relative;
    height: 100vh;
    min-height: min-content;
    max-height: 1400px;
    width: 100%;
    padding: 50px;

}
</style>

<article id="Home">
<Hero/>
<WhoWeAre/>
</article>
