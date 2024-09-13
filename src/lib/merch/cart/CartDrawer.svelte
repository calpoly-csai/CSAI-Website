<script lang="ts">
	import {
		cartItems,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity
	} from '$lib/merch/stores/cartStore';
	import { ShoppingCartIcon, PlusIcon, MinusIcon, TrashIcon } from 'svelte-feather-icons';
	import { writable } from 'svelte/store';

	// sidebar shopping cart pop-up
	let isDrawerOpen = writable(false);
	function toggleDrawer() {
		isDrawerOpen.update((n) => !n);
	}

	$: items = $cartItems; // subscribing to the cart store
	console.log($cartItems);
</script>

<div class="cart">
	<button class="cart-button" on:click={toggleDrawer}>
		<ShoppingCartIcon />
	</button>
</div>
<div class="drawer" class:open={$isDrawerOpen}>
	{#if items.length > 0}
		{#each items as item (item.id)}
			<div class="product-info">
				<img src={item.images[0]} alt={item.name} class="size-12 object-cover rounded mr-4" />
				<div>
					<p>{item.name}</p>
					<p>${item.price} each</p>
				</div>
			</div>

			<!-- quantity controls and delete button -->
			<div class="quantity-and-delete">
				<button on:click={() => decreaseQuantity(item.id)}>
					<MinusIcon />
				</button>
				<span>{item.quantity}</span>
				<button on:click={() => increaseQuantity(item.id)}>
					<PlusIcon />
				</button>
				<button class="trash-button" on:click={() => removeFromCart(item.id)}>
					<TrashIcon />
				</button>
			</div>
		{/each}
	{:else}
		<p>Your cart is empty</p>
	{/if}
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

	/* product info section */
	.product-info {
		display: flex;
		align-items: center;
		margin-bottom: 16px;
	}

	.product-info img {
		width: 80px;
		height: 80px;
		object-fit: cover;
		border-radius: 8px;
		margin-right: 12px;
	}

	.product-info div {
		display: flex;
		flex-direction: column;
	}

	.product-info p {
		margin: 0;
		font-size: 14px;
		color: #333;
	}

	/* quantity controls + delete button */
	.quantity-and-delete {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 2px;
	}

	.quantity-and-delete span {
		font-size: 18px;
		margin: 0 10px;
		font-weight: 400;
	}

	button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		color: #333;
	}

	button:hover {
		color: #aabdcc;
	}

	.trash-button:hover {
		color: rgb(206, 68, 68);
	}

	/* toggle drawer button */
	/* .cart{
		display:flex;
		justify-content: right;
		margin-right: 90px;
	} */

	.cart-button {
		margin-top: 40px;
		background-color: transparent;
	}

	.cart-button:hover {
		color: rgb(28, 41, 144);
		background-color: rgb(203, 211, 211, 0.3);
		border-radius: 50%;
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
