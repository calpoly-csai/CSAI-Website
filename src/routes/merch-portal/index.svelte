<script>
    import {onMount} from 'svelte';
    import {db} from '../../../src/firebase.js';
    import {collection, getDocs} from 'firebase/firestore';

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

<div class="product-listing">
    {#each products as product}
        <div class = "product-card">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <img src = {product.images[0]} alt={product.name}/> 
            <p>${product.price}</p>
        </div>
    {/each}
</div>

