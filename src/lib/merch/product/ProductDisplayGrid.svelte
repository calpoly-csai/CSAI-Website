<script>
    import ProductCard from "./ProductCard.svelte";
    export let products;
</script>

<div class="grid-container">
    {#each products as product}
      <ProductCard {product} />
    {/each}
</div>

<style>
    .grid-container{
        margin-top: 10px;
        padding: 0px 120px 96px 120px;
        display: grid;
        grid-template-columns: repeat(3, 0.33fr);
        font-family: 'Inter', sans-serif;
        gap: 50px;
    }
</style>