<script>
    import Checkout from "$lib/merch/cart/Checkout.svelte";
    import { ArrowLeftIcon } from 'svelte-feather-icons';

    const handleBack = () => {
		window.history.back();
	};
</script>

<div class="top">
    <button class="back-button" on:click={handleBack}>
        <ArrowLeftIcon />
    </button>
    <Checkout/>
</div>

<style>
    @import '../../../scss/global.scss';
	@import '../../../scss/utils.scss';

    .top{
        margin-top: 90px;
    }

    .back-button {
		background: transparent;
		border: none;
		color: black;
		cursor: pointer;
        margin-left: 50px;
	}

	.back-button:hover {
		background-color: rgba(107, 110, 167, 0.1);
		border-radius: 50%;
	}

    @media (max-width: 1020px) {
		.back-button {
            left: 0;
            margin-left: 0;
            margin-bottom: 30px;
	    }
    }

</style>