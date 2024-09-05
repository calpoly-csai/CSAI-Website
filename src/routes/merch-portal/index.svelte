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

<div class="grid-container">
    {#each products as product}
        <div class = "product-card">
            <a href={`/merch-portal/products/${product.id}`}>
                <div class = "image-container">
                    <img src = {product.images[0]} alt={product.name}/>
                </div> 
                <h2>{product.name}</h2>
                <p>${product.price}</p>
            </a>
        </div>
    {/each}
</div>

<style lang="scss" global>
	@import '../../scss/global.scss';
	@import '../../scss/utils.scss';
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    .grid-container{
        margin-top: 80px;
        padding: 96px;
        display: grid;
        grid-template-columns: repeat(3, 0.33fr);
        font-family: 'Inter', sans-serif;
        gap: 50px;
    }

    .product-card{
        padding: 10px;
        text-align: center;
    }

    .product-card a{
        text-decoration: none;
        color: inherit;
    }

    .product-card img {
        width: 100%;
        height: width;
        margin-bottom: 8px;
        object-fit: contain;
    }

    .product-card h2 {
        margin: 0;
        font-size: 21px;
    }

    .image-container {
        width: 100%;
        padding-top: 100%;
        position: relative;
        background-color: #fff;
        overflow: hidden;
    }

    .image-container img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 100%;
        max-height: 100%;
    }
</style>