<!-- displays the items in cart  in final checkout page (which has no + - delete)-->
<script lang="ts">
	import {
		cartItems,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity
	} from '$lib/merch/stores/cartStore';
	import CartItem from './CartItem.svelte';

	// subscribing to the cart store
	$: items = $cartItems; 

</script>

<div class="container">
	<div class= "top-section"> 
		<h3> YOUR CART</h3>
		<div class="titles">
			<h5>PRODUCT</h5>
			<h5>TOTAL</h5>
		</div>
		<div class="divider"></div>
	</div>
	<div class="cart-items">
		{#if items.length > 0}
			{#each items as item (item.id + '-' + item.size)}
			<div class="item">
				<CartItem {item} {increaseQuantity} {decreaseQuantity} {removeFromCart}readOnly = {true} />
			</div>
			{/each}
		{:else}
			<p>Your cart is empty</p>
		{/if}
	</div>
</div>

<style>
/* cart heading */
	.titles{
		display:flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 0px 24px;
	}

	.top-section .divider{
		width: 100%;
		height: 1px;
		margin: 15px 0px;
		background-color: #ccc;
	}
	/* product + total heading */
	h5{
		font-weight: 300; 
		margin-bottom: 0px;
	}

/* general structure */
	.container {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		height: 100%;
		transform: scale(0.90); 
        transform-origin: top left;
	}
/* items */
	.cart-items {
		flex-grow: 1;
		overflow-y: auto;
		padding-right: 10px;
		
	}
	.item{
		margin-bottom: 30px;
	}

	.cart-items :global(.product-info .total-price){
		margin-left: 180px;
		
	}
	/* smaller phones */
	@media only screen and (min-width: 200px) and (max-width: 430px)  {
		.cart-items :global(.product-info .total-price){
			margin-left: 70px;
			
		}
    }
	/* reg phones  + ipads */
	@media (min-width: 430px) {
        .cart-items :global(.product-info .total-price){
			margin-left: 140px;
			
		}
	}
</style>