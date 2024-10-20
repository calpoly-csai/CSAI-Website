<!-- final checkout form before submitting order-->
<script>
	import { cartItems, clearCart} from '$lib/merch/stores/cartStore';
	import CartItems from '$lib/merch/cart/CartItems.svelte';
	import OrderForm from '$lib/merch/cart/OrderForm.svelte';
	import { goto } from '$app/navigation';

	// firebase
	import { collection, addDoc} from 'firebase/firestore';
	import { db } from '$lib/utils/firebase';

	let userData = {};
	let cartData = [];
	let subtotal = 0;
	let isLoading = false;
	let orderForm; // ref to OrderForm component
	
	// subscribe to get current items in cart
	$: cartItems.subscribe(value =>{
		cartData = value;
		subtotal = cartData.reduce((acc, item) => acc + (item.price * item.quantity), 0);
	});

	function goToSuccessfulCheckout(){
		goto('/merch-portal/form/success');
		clearCart();
	}

	function gotToFailedCheckout(){
		goto('/merch-portal/form/failure');
	}

	// function that executes when user clicks submit
	async function submitOrder() {

		userData = orderForm.getUserData();
		if (!userData || cartData.length === 0) {
			console.error("User data is incomplete!");
			return; // set error state to notify user (later)
		}

		isLoading = true;
		
		const productsForFirestore = cartData.map((item) => ({
			productName : item.name,
			productRef : `/merchandise/${item.id}`,
			price: item.price,
			quantity: item.quantity, 
			size: item.size,
			total: item.price * item.quantity
		}));
	
		//order object
		const order = {
			...userData, 
			orderDate : new Date(),
			products: productsForFirestore,
			totalAmount: subtotal
		}
		try{
			const docRef = await addDoc(collection(db, 'orders'), order);
			goToSuccessfulCheckout();
			console.log("order written w/ ID: ", docRef.id)
			// direct to sucessfully submitted order
		}catch(error){
			gotToFailedCheckout();
			console.error("error adding order: ", error)
			// direct to error page
		}finally{
			isLoading = false;
		}
	}
</script>
<div class="container">
	<OrderForm bind:this={orderForm} />
	<div class="cart-items">
		<div class="items">
			<CartItems />
		</div>
		<div class="payments">
			<span>PAYMENT</span>
			<div class="details">
				<span>Subtotal:</span>
				<span>${subtotal.toFixed(2)}</span>
			</div>
		</div>
		<div class="checkout">
			<div class="footer">
				<p class="price">${subtotal.toFixed(2)}</p>
				<button on:click={submitOrder} class="checkout-btn" disabled={isLoading}>
					{#if isLoading}
						<span class="loader"></span> 
					{:else}
						Submit
					{/if}
				</button>
			</div>
		</div>
		<p> 
	</div>
</div>

<style>
	/* general  */
	@import '../../../scss/global.scss';
	@import '../../../scss/utils.scss';
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

	.container {
		margin-top: 180px;
		margin-left: 50px;
		display: grid;
		grid-template-columns: repeat(2, 0.5fr);
		padding: 60px;
		gap: 40px;
	}
	/* cart items + summary*/
	.items {
		padding: 25px; 
		max-width: 500px;
		width: 100%;
		border-style: dashed;
		border-color: rgb(14, 74, 137, 0.3);
		height: 500px;
		overflow-y: auto;
	}
	/* styling the scrollbar */
	.items::-webkit-scrollbar {
		width: 10px;
	}

	.items::-webkit-scrollbar-thumb {
		background-color: rgba(6, 46, 88, 0.5);
		border-radius: 5px;
	}

	.items::-webkit-scrollbar-thumb:hover {
		background-color: rgba(6, 23, 41, 0.8);
	}


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


/* totalPrice + checkout/submit section */
	.checkout {
		max-width: 500px;
		width: 100%;
	}

	.checkout .footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.price {
		font-size: 22px;
		color: #153e6a;
		font-weight: 900;
	}

	.checkout .checkout-btn {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 150px;
		height: 36px;
		background: #1b2e5c;
		border-radius: 7px;
		color: #ffffff;
		font-size: 13px;
		font-weight: 600;
		transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
	}

	.checkout .checkout-btn:hover {
		background-color: #1044a5;
	}

/* loading spinner */
	.loader {
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        width: 20px; 
        height: 20px;
        animation: spin 1s linear infinite;
        display: inline-block; 
        margin-right: 5px; 
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

	@media (min-width: 769px) and (max-width: 1200px){
		.container{
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0px 20px;
			min-height: 90vh;
			margin: 180px 20px;
		}
	}
	@media (max-width: 768px){
		.container{
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0px 20px;
			min-height: 90vh;
			margin: 180px 20px;
		}	

	}

</style>
