<!-- cart sliding drawer -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { isDrawerOpen, toggleDrawer } from '$lib/merch/stores/cartDrawerStore';
	import {
		cartItems,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity
	} from '$lib/merch/stores/cartStore';
	import CartItem from './CartItem.svelte';

	// redirects to cart page
	function goToCart() {
		goto('/merch-portal/cart');
	}

	// subscribing to the cart store
	$: items = $cartItems;
	$: totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
</script>

<div class="drawer" class:open={$isDrawerOpen}>
	<div class="top-section">
		<h3>YOUR CART</h3>
		<div class="titles">
			<h5>PRODUCT</h5>
			<h5>TOTAL</h5>
		</div>
		<div class="divider" />
	</div>
	<div class="cart-items">
		{#if items.length > 0}
			{#each items as item (item.id + '-' + item.size)}
				<div class="item">
					<CartItem {item} {increaseQuantity} {decreaseQuantity} {removeFromCart} />
				</div>
			{/each}
		{:else}
			<p>Your cart is empty</p>
		{/if}
	</div>

	<div class="bottom">
		<div class="divider" />
		<div class="total">
			<p>TOTAL</p>
			<p>{totalPrice}USD</p>
		</div>
		<div class="checkout">
			<button class="checkout-button" on:click={goToCart}> Checkout </button>
		</div>
	</div>
</div>

{#if $isDrawerOpen}
	<div class="drawer-overlay open" on:click={toggleDrawer} />
{/if}

<style>
	/* top section */
	.titles {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.top-section .divider {
		margin-top: 0px;
		padding-top: 0px;
	}
	h5 {
		font-weight: 300;
	}

	/* drawer */
	.drawer {
		position: fixed;
		top: 0;
		right: 0;
		width: 500px;
		height: 100%;
		background-color: rgb(240, 242, 245);
		box-shadow: -4px 0 8px rgba(0, 0, 0, 0.2);
		display: flex;
		padding: 20px;
		flex-direction: column;
		z-index: 100;
		transform: translateX(100%);
		transition: transform 0.3s ease-in-out;
	}

	.drawer.open {
		transform: translateX(0);
	}

	button:hover {
		color: #aabdcc;
	}

	/* items */
	.cart-items {
		flex-grow: 1;
		overflow-y: auto;
		padding-right: 10px;
	}
	.item {
		margin-bottom: 30px;
	}

	/*bottom section */
	.divider {
		width: 100%;
		height: 1px;
		background-color: #ccc;
		margin: 20px 0;
		bottom: 0;
	}
	.bottom {
		position: relative;
		bottom: 0;
	}

	.total {
		display: flex;
		justify-content: space-between;
		margin: 0px 20px;
		align-items: center;
	}

	.total p {
		font-weight: 300;
	}

	.checkout-button {
		text-align: center;
		width: 470px;
		border-radius: 30px;
		background-color: rgb(40, 46, 87);
	}

	/* dims overlay when drawer is open */
	.drawer-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 99;
		display: none;
	}

	.drawer-overlay.open {
		display: block;
	}

    /* phones -- WIP */
    @media (max-width: 768px) {
        .drawer{
			max-width: 300px;
		}
		.bottom{
			max-width: 300px;
		}
		.checkout-button{
			max-width: 270px;
		}	
    }

</style>
