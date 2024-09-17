<!-- checkout page  -->
<script>
    import CartItem from './CartItem.svelte';
    import {
		cartItems,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity
	} from '$lib/merch/stores/cartStore';

    // subscribing to the cart store
	$: items = $cartItems; 
	$: totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
    $: totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
</script>

<div class= "main-page">
    <div class="order-details">
        <div class= "top-section"> 
            <h2> YOUR ORDER</h2>
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
                    <CartItem {item} {increaseQuantity} {decreaseQuantity} {removeFromCart} />
                </div>
                {/each}
            {:else}
                <p>Your cart is empty</p>
            {/if}
        </div>
    </div>
    <div class= "order-summary">
        <div class="order-box">
            <h4>ORDER SUMMARY</h4>
            <div class="summary-items">{totalItems} items</div>
            <div class="subtotal">
                <p> SUBTOTAL</p>
                <b> ${totalPrice}</b>
            </div>

            <div class="member-info">
                <h5>CSAI MEMBERSHIP</h5>
                <p>Have you purchased the CSAI Membership? If so there is a $5 discount on your order.</p>
            </div>

            <div class="member-discount">

            </div>
        </div>
       
        
    </div>
</div>

<style>
/* top section */
	.titles{
		display:flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.top-section .divider{
        width: 100%;
		height: 1px;
		background-color: #ccc;
		margin: 20px 0;
		margin-top: 0px;
		padding-top: 0px;
	}
    .top-section h2{
        font-weight: 600;
        font-style: italic;
    }
	h5{
		font-weight: 300;
	}

    .main-page{
        margin-top: 180px;
        padding: 0px 0px 220px 220px;
        display: grid;
        grid-template-columns: 1fr 1fr; 
    }

/* order-details */
    .order-details {
        max-width: 500px;	
		display: flex;
		flex-direction: column;
	}
	.cart-items {
		flex-grow: 1;
		overflow-y: auto;
		padding-right: 10px;
	}
	.item{
		margin-bottom: 30px;
	}
/* order summary */
    .order-summary{
        margin-top: 40px;
    }
    .order-box{
        background-color: #EDEDEC;
        max-width: 400px;
        padding: 4rem;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
    }
    .summary-items{
        display: flex;
        justify-content: space-between;
        color: rgb(94, 94, 121);
        border-bottom: 0.1rem solid rgba(2, 8, 38, 0.08);
    }
    .subtotal{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    b{
        margin: 1rem;
    }
/* membership details */
    .member-info{
        margin-top: 20px;
        padding: 15px;
        border-style: dotted;
        border-radius: 10px;
        border-color: #ccc;
    }

    .member-info h5{
        font-weight: 800;
    }

</style>