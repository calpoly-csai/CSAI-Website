<!-- ui for a single item in the cart -->
<script lang="ts">
	export let item;
	export let increaseQuantity;
	export let decreaseQuantity;
	export let removeFromCart;
	export let readOnly = false;  //used for form page where increase/decrease quantity is disabled
	import { PlusIcon, MinusIcon, TrashIcon } from 'svelte-feather-icons';

	// calculate total price for the specific item
	$: specificItemTotalPrice = (item.price * item.quantity).toFixed(2);
</script>

<div class="product-info">
	<img src={item.images[0]} alt={item.name} class="size-12 object-cover rounded mr-4" />
	<div class = "details">
		<p class='item-name'>{item.name}</p>
		<p>${item.price.toFixed(2)}</p>
		<p>SIZE: {item.size}</p>
		<!-- quantity controls and delete button -->
		{#if !readOnly}
			<div class="quantity-and-delete">
				<button on:click={() => decreaseQuantity(item.id, item.size)}>
					<MinusIcon size="15" />
				</button>
				<span>{item.quantity}</span>
				<button on:click={() => increaseQuantity(item.id, item.size)}>
					<PlusIcon size="15"/>
				</button>
				<button class="trash-button" on:click={() => removeFromCart(item.id, item.size)}>
					<TrashIcon size="15"/>
				</button>
			</div>
		{:else}	
			<!-- Show static quantity info if readonly -->
			<p>Quantity: {item.quantity}</p>
		{/if}
	</div>
	<p class="total-price"> ${specificItemTotalPrice}</p>
</div>


<style>
/* product info section */
	.product-info {
		display: flex;
		align-items: flex-start;
	}
	.product-info .item-name{
		font-weight: 500;
		font-size: 17px;
	}

	.product-info img {
		width: 80px;
		height: 80px;
		object-fit: cover;
		border-radius: 8px;
		margin-right: 12px;
	}

	.product-info p {
		margin: 0;
		font-size: 14px;
		color: #333;
	}
	.product-info .total-price{
		margin-left: 120px;
		font-style: normal;
	}
	.details {
		display: flex;
		flex-direction: column;
	}
	

/* quantity controls + delete button */
	.quantity-and-delete {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 10px;
		max-width: 200px;
		width: 100%;
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
</style>
