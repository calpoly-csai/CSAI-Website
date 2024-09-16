<script lang="ts">
	import { goto } from '$app/navigation';
	import {isDrawerOpen, toggleDrawer} from '$lib/merch/stores/cartDrawerStore';
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

	$: items = $cartItems; // subscribing to the cart store
	console.log($cartItems);
</script>

<div class="drawer" class:open={$isDrawerOpen}>
	{#if items.length > 0}
		{#each items as item (item.id)}
			<CartItem {item} {increaseQuantity} {decreaseQuantity} {removeFromCart} />
		{/each}
	{:else}
		<p>Your cart is empty</p>
	{/if}
	<div class= "checkout">
		<button class="checkout-button" on:click={goToCart}>
			Checkout
		</button>
	</div>
</div>

{#if $isDrawerOpen}
	<div class="drawer-overlay open" on:click={toggleDrawer} />
{/if}

<style>
	.drawer {
		position: fixed;
		top: 0;
		right: 0;
		width: 300px;
		height: 100%;
		background-color: rgb(225, 233, 240);
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

	/* checkout button  */
	.checkout{
		margin: 0px 20px 60px 60px;
		position: fixed;
		bottom: 0;
	}

	.checkout-button{
		/* margin-top: 40px; */
		display: flex;
		align-items: center;
		border-radius: 30px;
		background-color: rgb(80, 129, 80);
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
</style>
