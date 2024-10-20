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

	export let product;

	let selectedSize = null;

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
		} else {
			alert('Please select a size');
		}
	};

	const handleBack = () => {
		window.history.back();
	};
</script>

<!--individual product page: size, prod description, price, etc-->
<!-- TODO: readjust the size of ONE-SIZE button - low priority -->
<!-- TODO: create carousel for images : low/mid-->


<div class="product-header">
	<button class="back-button" on:click={handleBack}>
		<ArrowLeftIcon />
	</button>
</div>
<CartDrawer />
<div class="product-display">
	<div class="product-image">
		<img src={product.imgURLS[0]} alt={product.productName} class="main-image" />
		<img src={product.imgURLS[1]} alt="{product.productName} Zoomed" class="zoomed-image" />
	</div>
	<div class="product-details">
		<h1>{product.productName}</h1>
		<p>{product.productDescription}</p>
		<div class="sizes">
			{#each product.sizes as size}
				<button
					class="larger-size-button"
					on:click={() => (selectedSize = size)}
					class:selected={selectedSize === size}>{size}</button
				>
			{/each}
		</div>
		<div class="price-add-to-cart">
			<span class="total-price">Price: ${product.price}</span>
			<button
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

	// outline size when selected
	.sizes button:focus {
		outline: none;
		border: 2px solid #666;
	}

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

	.product-image .zoomed-image {
		position: absolute;
		top: 20px;
		left: 50px;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.product-image:hover .zoomed-image {
		opacity: 1;
	}

	.product-image .main-image {
		transition: opacity 0.3s ease;
	}

	.product-image:hover .main-image {
		opacity: 0;
	}

	.carousel-button {
		background-color: #ccc;
		border: none;
		padding: 10px;
		cursor: pointer;
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

	.price-add-to-cart button:hover {
		background-color: #8cce74;
	}

	@media (max-width: 768px) {

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

		.larger-size-button {
			width: 70px;
			height: 70px;
			font-size: 16px;
		}

		.total-price {
			margin-left: 16px;
			margin-right: 32px;
			font-size: 18px;
		}

		.price-add-to-cart {
			width: 100%;
			max-width: 250px;
			margin: 36px 0px;
			background-color: #dfdfef;
			border-radius: 24px;
			
		}

		.total-price {
			margin-left: 4px;
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


	@media (min-width: 769px) and (max-width: 1024px) {
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

		.product-details h1 {
			font-size: 40px;
		}


		.product-details {
			display: flex;
			flex-direction: column;
			justify-content: flex-start; 
			margin-top: 10px;
		}

		.product-image {
			margin-top: 20px;
			width: 70%; 
			height: auto;
		}

		.product-image .zoomed-image {
			width: 100%; 
			height: auto;
		}

		.product-details h1 {
			font-size: 36px; 
		}

		.product-details p {
			font-size: 18px; 
		}

		.sizes {
			gap: 12px; 
			margin-top: 32px;
		}

		.sizes button {
			width: 50px; 
			height: 50px; 
			font-size: 16px;
		}

		.larger-size-button {
			width: 80px;
			height: 80px;
			font-size: 18px;
		}

		.total-price {
			margin-left: 24px; 
			margin-right: 36px;
			font-size: 20px; 
		}

		.price-add-to-cart {
			width: 100%;
			max-width: 300px; 
			margin: 40px 0px;
			background-color: #dfdfef;
			border-radius: 24px;
		}

		.price-add-to-cart button {
			margin: 12px;
			margin-left: 0;
			padding: 14px 28px; 
			background-color: #c0e1b4;
			border: none;
			border-radius: 15px;
			font-size: 14px;
			cursor: pointer;
		}
	}

</style>
