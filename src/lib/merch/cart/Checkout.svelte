<!-- checkout page  -->
<script>
    import CartItem from './CartItem.svelte';
    import {
		cartItems,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity
	} from '$lib/merch/stores/cartStore';
    import { goto } from '$app/navigation';

    function goToForm(){
        goto('/merch-portal/form');
    }

    // subscribing to the cart store
	$: items = $cartItems; 
	$: totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
    $: totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

</script>

<div class= "main-page">
    <div class="order-details">
        <div class= "top-section"> 
            <h3> CONFIRM YOUR ORDER</h3>
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
                    <CartItem {item} {increaseQuantity} {decreaseQuantity} {removeFromCart}/>
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
                <p><strong>${totalPrice}</strong></p>
            </div>

            <div class="member-info">
                <h5>ARE YOU A CSAI DONOR?</h5>
                <p> Dont forget that if you make a donation of $5 or more, you qualify for donor benefits, including $5 off one merch order! </p>
            </div>
        </div>
        <div class= "checkout">
			<button class="checkout-button" on:click={goToForm}>
				Checkout
			</button>
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
	h5{
		font-weight: 300;
	}

    .main-page{
        /* margin-top: 180px; */
        padding: 0px 0px 220px 220px;
        display: grid;
        grid-template-columns: 1fr 1fr; 
        gap: 40px;
    }

/* order-details */
    .order-details {
        max-width: 500px;	
        max-height: 800px;
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
/* membership details */
    .member-info{
        margin-top: 20px;
        padding: 15px;
        border-style: dotted;
        border-radius: 10px;
        /* border-color: #ccc; */
        background-color: rgb(195, 229, 242, 0.3);
		/* border: 2px solid rgba(6, 61, 119, 0.8);  */
    }

    .member-info h5{
        font-weight: 800;
        color:  rgb(58, 127, 154);
    }

/* checkout button */
    .checkout-button{
        margin-top: 50px;
		text-align: center;
		width: 400px;
        height: 60px;
		border-radius: 30px;
		background-color: rgb(40, 46, 87);
	}
    /* mobile */
    @media only screen and (min-width: 200px) and (max-width: 820px) {
        .main-page {
            padding: 0px 30px;
            display: grid;
            grid-template-columns: 1fr; 
            gap: 30px;
        }

        .order-summary { 
            margin-top: 0px;
            margin-bottom: 40px;
        }

        .checkout-button {
            width: 100%; 
        }

        .order-details {
            margin: 0px 20px;
            max-height: 350px; 
        }
    }

    /* ipads -- TODO fix this*/
    @media (min-width: 821px) and (max-width: 1024px) {
        .main-page {
            padding: 0px 50px;
            display: grid;
            grid-template-columns: 0.6fr 0.4fr; 
            gap: 30px;
            min-height: 70vh;
        }

        .order-summary { 
            margin-top: 0px;
            margin-bottom: 40px;
        }

        .checkout-button {
            width: 100%; 
        }

        .order-details {
            margin: 0px 20px;
            max-height: 650px; 
        }
    }

</style>