<!-- payment section + submit button for final checkout page -->
<!-- TODO: responsive -->
<script>
	import { cartItems } from '$lib/merch/stores/cartStore';
	$: items = $cartItems;
	$: subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
</script>

<div class="payments">
	<span>PAYMENT</span>
	<div class="details">
		<span>Subtotal:</span>
		<span>${subtotal.toFixed(2)}</span>
		<!-- {#if discountApplied}
			<span>Discount:</span>
			<span>-$5.00</span>
		{/if} -->
	</div>
</div>

<style>
	/* payment details - subtotal, discount, etc */
	.payments .details {
		max-width: 500px;
		display: grid;
		grid-template-columns: 10fr 1fr;
		padding: 0px;
		gap: 5px;
	}

	/* subtotal & discount headings */
	.payments .details span:nth-child(odd) {
		font-size: 12px;
		font-weight: 600;
		color: #1a1818;
	}

	/* subtotal & discount amounts */
	.payments .details span:nth-child(even) {
		font-size: 13px;
		font-weight: 600;
		color: #203c89;
	}

</style>
