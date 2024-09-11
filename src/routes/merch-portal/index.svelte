<script>
    import {onMount} from 'svelte';
    import {db} from '../../../src/lib/utils/firebase.js';
    import {collection, getDocs} from 'firebase/firestore';
    import ProductDisplayGrid from '$lib/merch/product/ProductDisplayGrid.svelte';
    import CartDrawer from '$lib/merch/cart/CartDrawer.svelte';

    let products = [];

    onMount(async () =>{
        try{
            const querySnapshot = await getDocs(collection(db, "merchandise"));
            products = querySnapshot.docs.map(doc => {
                const data = doc.data();
                console.log("doc data", data);
                return{
                    id: doc.id,
                    images: data.imgURLS,
                    price: data.price,
                    name: data.productName,
                    description: data.productDescription
                };
            });
        }catch(error){
            console.log("failed fetching");
        }
    });
</script>

<svelte:head>
	<title>CSAI Merch</title>
	<meta name="theme-color" content="#2992e5" />
	<meta
		name="description"
		content="The CSAI merch is available to order here."
	/>
</svelte:head>

<div class="top">
    <CartDrawer />          
</div>

<ProductDisplayGrid {products} />


<style lang="scss" global>
	@import '../../scss/global.scss';
	@import '../../scss/utils.scss';

    .top {
        margin-top: 100px;
    }
</style>