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

<div class="top">
    <CartDrawer/>
</div>
<ProductDisplayGrid {products} />

<!-- TODO: implement the scroll feature so navbar can disappear -->

<style lang="scss" global>
	@import '../../scss/global.scss';
	@import '../../scss/utils.scss';

    .top {
        position: relative;
        z-index: 10; /* Ensure this is higher than the navbar's z-index */
        margin-top: 75px;
    }
    .drawer {
        z-index: 1000; /* High enough to sit above other elements */
    }
</style>