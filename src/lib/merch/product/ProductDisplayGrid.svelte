<!-- product display grid -->
<script>
	import ProductCard from './ProductCard.svelte';
	export let products;
</script>

<div class="grid-container">
	{#each products as product}
		<ProductCard {product} />
	{/each}
</div>

<style>
	.grid-container {
		margin-top: 10px;
		padding: 0px 120px 96px 120px;
		display: grid;
		grid-template-columns: repeat(3, 0.33fr);
		font-family: 'Inter', sans-serif;
		gap: 50px;
	}

	/* desktop monitors */
	@media (min-width: 1540px) {
		.grid-container {
			padding: 0px 200px 96px 200px;
			grid-template-columns: repeat(4, 1fr);
			gap: 70px;
		}
	}

	/* tablets */
	@media (max-width: 1024px) {
		.grid-container {
			padding: 20px 60px 96px 60px;
			grid-template-columns: repeat(2, 1fr);
		}
	}

	/* phones */
	@media (max-width: 896px) {
		.grid-container {
			padding: 0px 40px 106px 40px;
			grid-template-columns: 1fr;
		}
	}
</style>
