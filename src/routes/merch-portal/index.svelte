<!-- merch main loading/skeleton page -->
<script>
	import { onMount } from 'svelte';
	import { db } from '../../../src/lib/utils/firebase.js';
	import { collection, getDocs } from 'firebase/firestore';
	import ProductDisplayGrid from '$lib/merch/product/ProductDisplayGrid.svelte';
	import CartDrawer from '$lib/merch/cart/CartDrawer.svelte';
	import { ShoppingCartIcon } from 'svelte-feather-icons';
	import { toggleDrawer } from '$lib/merch/stores/cartDrawerStore';
	// import particlesConfig from '../../modules/particle-config-lightblue';

	// let ParticlesComponent;
	// let scrollP = 0;
	// $: isOnscreen = scrollP < 0.99;
	// onMount(async () => {
	// 	const module = await import('svelte-particles');
	// 	ParticlesComponent = module.default;
	// });

	let products = [];

	onMount(async () => {
		try {
			const querySnapshot = await getDocs(collection(db, 'merchandise'));
			products = querySnapshot.docs.map((doc) => {
				const data = doc.data();
				console.log('doc data', data);
				return {
					id: doc.id,
					images: data.imgURLS,
					price: data.price,
					name: data.productName,
					description: data.productDescription
				};
			});
		} catch (error) {
			console.log('failed fetching');
		}
	});
</script>

<svelte:head>
	<title>CSAI Merch</title>
	<meta name="theme-color" content="#2992e5" />
	<meta name="description" content="The CSAI merch is available to order here." />
</svelte:head>

<!-- <div>
    {#if isOnscreen}
		<svelte:component
			this={ParticlesComponent}
			options={particlesConfig}
			id="particle-background"
		/>
	{/if}
</div> -->
<div class="top">
	<div class="cart">
		<button class="cart-button" on:click={toggleDrawer}>
			<ShoppingCartIcon />
		</button>
	</div>
	<CartDrawer />
</div>

<ProductDisplayGrid {products} />

<style lang="scss" global>
	@import '../../scss/global.scss';
	@import '../../scss/utils.scss';

	.top {
		margin-top: 100px;
	}
	/* toggle drawer button */
	.cart {
		display: flex;
		justify-content: right;
		margin-right: 90px;
	}

	.cart-button {
		margin-top: 40px;
		background-color: transparent;
		border-radius: 100px;
		color: #333;
	}

	.cart-button:hover {
		color: rgb(28, 41, 144);
		background-color: rgb(203, 211, 211, 0.3);
		border-radius: 50%;
	}

	/* tablets */
	@media (max-width: 1024px) {
		.cart {
			margin-right: 30px;
		}
	}

	/* phones */
	@media (max-width: 896px) {
		.cart {
			margin-right: 12px;
		}
	}
</style>
