<!--individual product page: size, prod description, price, etc-->
<script context="module">
	import { db } from '../../../../src/lib/utils/firebase.js';
	import { doc, getDoc } from 'firebase/firestore';

	// load products from firebase collection
	export async function load({ params }) {
		const productId = params.id;
		const productRef = doc(db, 'merchandise', productId);
		const productDoc = await getDoc(productRef);

		if (!productDoc.exists()) {
			return {
				status: 404,
				error: new Error('product not found')
			};
		}
		return {
			props: {
				product: {
					id: productId,
					...productDoc.data()
				}
			}
		};
	}
</script>

<script>
	// @ts-ignore
	import { addToCart } from '$lib/merch/stores/cartStore';
	import { toggleDrawer } from '$lib/merch/stores/cartDrawerStore';
	import { ArrowLeftIcon } from 'svelte-feather-icons';
	import CartDrawer from '$lib/merch/cart/CartDrawer.svelte';
	import { onMount } from 'svelte';
	// import particlesConfig from '../../../modules/particle-config-lightblue';

	// // cool particle bg!
	// let ParticlesComponent;
	// let scrollP = 0;
	// $: isOnscreen = scrollP < 0.99;
	// onMount(async () => {
	// 	const module = await import('svelte-particles');
	// 	ParticlesComponent = module.default;
	// });

	export let product;

	let selectedSize = null;
	let buttonGlows = false;
	let currentImageIndex = 0;

	const triggerGlow = () =>{
		if(selectedSize){
			buttonGlows = true;
		}

		setTimeout(() => {
			buttonGlows = false;
		}, 2500);
	}

	const handleAddToCart = () => {
		if (selectedSize) {
			console.log(`size selected!${selectedSize}`);
			const productToAdd = {
				id: product.id,
				name: product.productName,
				images: product.imgURLS,
				price: product.price,
				size: selectedSize,
				quantity: 1
			};

			addToCart(productToAdd);
			console.log(`Added ${productToAdd.name} to cart`);
			selectedSize = null; // reset after added
			buttonGlows = false;
		} else {
			alert('Please select a size');
		}
	};

	const handleBack = () => {
		window.history.back();
	};

	const nextImage = () => {
		currentImageIndex = (currentImageIndex + 1) % product.imgURLS.length;
	};

	const prevImage = () => {
		currentImageIndex = (currentImageIndex - 1 + product.imgURLS.length) % product.imgURLS.length;
	};

	const selectImage = (index) => {
		currentImageIndex = index;
	};


</script>

<!-- <div>
    {#if isOnscreen}
		<svelte:component
			this={ParticlesComponent}
			options={particlesConfig}
			id="particle-background"
		/>
	{/if}
</div> -->
<div class="product-header">
	<button class="back-button" on:click={handleBack}>
		<ArrowLeftIcon />
	</button>
</div>
<CartDrawer />
<div class="product-display">
	<div class="product-image">
		<img src={product.imgURLS[currentImageIndex]} alt={product.productName} class="main-image" />
		<div class="image-navigation">
			<button on:click={prevImage}>❮</button>
			<div class="dots">
				{#each product.imgURLS as _, index}
					<span
						class="dot"
						class:selected={currentImageIndex === index}
						on:click={() => selectImage(index)}
					/>
				{/each}
			</div>
			<button on:click={nextImage}>❯</button>
		</div>
	</div>
	<div class="product-details">
		<h1>{product.productName}</h1>
		<p>{product.productDescription}</p>
		<div class="sizes">
			{#each product.sizes as size}
				<button
					class="larger-size-button"
					on:click={() => {
						selectedSize = size;
						triggerGlow();
					  }}
					class:selected={selectedSize === size}>{size}</button
				>
			{/each}
		</div>
		<div class="price-add-to-cart">
			<span class="total-price">Price: ${product.price}</span>
			<button class={buttonGlows ? 'glow' : ''} disabled={!selectedSize}
				on:click={() => {
					handleAddToCart();
					toggleDrawer();
				}}>Add to cart</button
			>
		</div>
	</div>
</div>

<style lang="scss" global>
	@import '../../../scss/global.scss';
	@import '../../../scss/utils.scss';
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

	.product-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		left: 0px;
		padding-left: 50px;
		margin-top: 80px;
	}

	.back-button {
		// margin-left: 190px;
		margin-top: 40px;
		background: transparent;
		border: none;
		color: black;
		cursor: pointer;
	}

	.back-button:hover {
		background-color: rgba(107, 110, 167, 0.1);
		border-radius: 50%;
	}

	.product-display {
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding: 0px 96px 96px 96px;
		border-radius: 10px;
		font-family: 'Inter', sans-serif;
		max-width: 1200px;
		margin: 0 auto;
		gap: 140px;
		min-height: 70vh;
	}

	.product-details {
		margin-top: 27px;
		justify-content: center;
	}

	//product name
	.product-details h1 {
		font-size: 50px;
		top: 0;
		font-weight: bold;
		font-style: italic;
		margin-bottom: 3px;
	}

	.product-details p {
		margin: 16px 0px 0px 0px;
		font-size: 15px;
		color: #666;
		line-height: 1.2;
	}

	//product sizes
	.sizes {
		display: flex;
		gap: 16px;
		margin-top: 32px;
	}

	.sizes button {
		width: 47px;
		height: 47px;
		background-color: #ccc;
		border-radius: 50%;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		color: #333;
		font-weight: bold;
		cursor: pointer;
		box-sizing: border-box;
		padding: 0;
	}

	// larger size button specific styling
	.larger-size-button {
		width: 90px;
		height: 90px;
		font-size: 18px;
	}

	.sizes button:hover {
		background-color: #bbb;
	}

	.sizes button.selected {
		outline: none;
		border: 2px solid rgb(47, 113, 156);
		background-color: rgb(96, 156, 206);
	}

	// outline size when selected
	// .sizes button:focus {
	// 	outline: none;
	// 	border: 2px solid rgb(81, 81, 81);
	// 	background-color: rgb(169, 168, 168);
	// }

	.product-image {
		position: relative;
		width: 100%;
		max-width: 600px;
		margin: 40px 0px;
	}

	.product-image img {
		width: 100%;
		height: auto;
		display: block;
	}

	.image-navigation {
		display: flex;
		justify-content: center;
		margin-top: 10px;
	}

	.image-navigation button {
		width: 10px;
		padding: 5px 4px 2px 1px;
		font-size: 20px;
		background-color: transparent;
		color: rgb(156, 199, 219);
		border: none;
		cursor: pointer;
		margin: 0px 20px;
	}

	.prev-button,
	.next-button {
		width: 10px;
		height: 10px;
		background-color: rgba(255, 255, 255, 0.7);
		border: none;
		cursor: pointer;
		margin: 0 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0;
	}

	.dots {
		text-align: center;
		margin-top: 10px;
	}

	.dot {
		height: 10px;
		width: 10px;
		margin: 0 4px;
		background-color: #bbb;
		border-radius: 50%;
		display: inline-block;
		cursor: pointer;
	}

	.dot.selected {
		background-color: #717171;
	}
	.product-image img {
		width: 100%;
		height: auto;
		display: block;
	}

	.price-add-to-cart {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-width: 350px;
		margin-top: 56px;
		background-color: #dfdfef;
		border-radius: 24px;
	}

	.total-price {
		margin-left: 24px;
		margin-right: 48px;
		font-size: 20px;
		font-weight: bold;
		font-style: italic;
	}

	.price-add-to-cart button {
		margin: 16px;
		margin-left: 0;
		padding: 12px 24px;
		background-color: #c0e1b4;
		border: none;
		border-radius: 15px;
		font-size: 16px;
		cursor: pointer;
	}

	.price-add-to-cart button.glow{
		opacity: 1;
		animation: glow 1.5s infinite alternate;
	}

	// .price-add-to-cart button:hover {
	// 	background-color: #8cce74;
	// }

	@keyframes glow {
		from {
			box-shadow: 0 0 10px #8fbb8f, 0 0 20px #8fbb8f, 0 0 30px #8fbb8f;
		}
		to {
			box-shadow: 0 0 20px #79b076, 0 0 40px #5b845b, 0 0 60px #617f61;
		}
	}

	@media (max-width: 767px) {
		.product-display {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.5px;
			padding: 0px 50px;
			min-height: 90vh;
		}

		.product-header {
			padding: 0 10px;
		}

		.product-details {
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin-top: 10px;
			padding: 0px 20px;
		}

		.product-image {
			margin-top: 20px;
			width: 90%;
			height: auto;
		}

		.product-image .zoomed-image {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 90%;
			height: auto;
			opacity: 0;
			transition: opacity 0.3s ease;
			transform: translate(-50%, -50%);
		}

		.product-details h1 {
			font-size: 30px;
		}

		.product-details p {
			font-size: 16px;
		}

		.sizes {
			gap: 8px;
			margin-top: 24px;
		}

		.sizes button {
			width: 40px;
			height: 40px;
			font-size: 14px;
		}

		// .sizes button:focus {
		// 	outline: none;
		// 	border: 2px solid rgb(47, 113, 156);
		// 	background-color: rgb(96, 156, 206);
		// }

		.sizes button.selected {
			outline: none;
			border: 2px solid rgb(47, 113, 156);
			background-color: rgb(96, 156, 206);
		}

		.total-price {
			margin-left: 16px;
			margin-right: 32px;
			font-size: 18px;
		}

		.price-add-to-cart {
			width: 100%;
			max-width: 350px;
			margin: 36px 0px;
			background-color: #dfdfef;
			border-radius: 24px;
		}

		.total-price {
			margin-left: 20px;
			margin-right: 8px;
			font-size: 15px;
			font-weight: bold;
			font-style: italic;
		}

		.price-add-to-cart button {
			margin: 10px;
			margin-left: 10px;
			padding: 12px 24px;
			background-color: #c0e1b4;
			border: none;
			border-radius: 15px;
			font-size: 12px;
			cursor: pointer;
		}
	}

	// ipad
	@media (min-width: 768px) and (max-width: 1024px) {
		.product-display {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 20px;
			padding: 0 50px;
			min-height: 85vh;
		}

		.product-header {
			padding: 0 20px;
		}

		.product-details {
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin-top: 10px;
			padding: 0px 90px;
			// width: 100%;
		}

		.product-image {
			margin-top: 20px;
			width: 60%;
			height: auto;
		}

		.product-details h1 {
			font-size: 44px;
		}

		.product-details p {
			font-size: 18px;
		}

		.sizes {
			width: 100%;
			gap: 8px;
			margin-top: 20px;
		}

		.sizes button {
			width: 60px;
			height: 60px;
			font-size: 20px;
		}

		// .sizes button:focus {
		// 	outline: none;
		// 	border: 2px solid rgb(47, 113, 156);
		// 	background-color: rgb(96, 156, 206);
		// }

		// testing for mobile
		.sizes button.selected {
			outline: none;
			border: 2px solid rgb(47, 113, 156);
			background-color: rgb(96, 156, 206);
		}

		.total-price {
			margin-left: 24px;
			margin-right: 36px;
			font-size: 20px;
		}

		.price-add-to-cart {
			width: 100%;
			max-width: 500px;
			margin: 30px 0px;
			background-color: #dfdfef;
			border-radius: 24px;
			display: flex;
			justify-content: space-between;
			padding: 10px;
		}

		.price-add-to-cart .total-price {
			font-size: 25px;
		}

		.price-add-to-cart button {
			margin: 16px;
			padding: 20px 30px;
			background-color: #c0e1b4;
			border: none;
			border-radius: 15px;
			font-size: 24px;
			cursor: pointer;
		}
	}
</style>
