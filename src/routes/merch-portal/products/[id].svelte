<script context="module">
  import {db} from '/src/firebase.js';
  import {doc, getDoc} from 'firebase/firestore';
  
  export async function load({params}){
    const productId = params.id;
    const productRef = doc(db, "merchandise", productId);
    const productDoc = await getDoc(productRef);

    if (!productDoc.exists()){
      return{
        status: 404, 
        error: new Error('product not found')
      };
    }
    return{
      props: {
        product: {
          id: productId, 
          ...productDoc.data(),
        },
      },
    };
  }
</script>

<script>
  import {addToCart} from '../../../stores/cartStore';
  
  export let product;

  let selectedSize = null;
  
  const handleAddToCart = () => {
    if(selectedSize){

      console.log(`size selected!${selectedSize}`);
      const productToAdd = {
        id: product.id,
        name: product.productName,
        price: product.price,
        size: selectedSize,
        quantity: 1
      };

      addToCart(productToAdd);
      console.log(`Added ${productToAdd.name} to cart`); 
    }else{
      alert('Please select a size');
    }
  };
</script>

<div class="product-display">
  <div class="product-details">
    <h1>{product.productName}</h1>
    <p>{product.productDescription}</p>
    <div class="sizes">
      <button on:click={() => selectedSize = 'S'} class:selected={selectedSize==='S'}>S</button>
      <button on:click={() => selectedSize = 'M'} class:selected={selectedSize==='M'}>M</button>
      <button on:click={() => selectedSize = 'L'} class:selected={selectedSize==='L'}>L</button>
      <button on:click={() => selectedSize = 'XL'} class:selected={selectedSize==='XL'}>XL</button>
    </div>
    <div class="price-add-to-cart">
      <span class="total-price">Price: ${product.price}</span> 
      <button on:click={handleAddToCart}>Add to cart</button>
    </div>
  </div>
  <div class="product-image">
    <img src={product.imgURLS[0]} alt="{product.productName}" class="main-image" />
    <img src={product.imgURLS[1]} alt="{product.productName} Zoomed" class="zoomed-image" />
  </div>
</div>


<style lang="scss" global>
  @import '../../../scss/global.scss';
  @import '../../../scss/utils.scss';
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  
  .product-display {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 96px;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .product-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    word-break: break-word; 
    padding-right: 32px;
  }

  .product-details h1 { /* product name */
    font-size: 50px;
    font-weight: bold;
    font-style: italic;
    margin-bottom: 3px;
    word-break: break-all;
  }

  .product-details p { /* product description */
    margin: 16px 0;
    font-size: 19px;
    color: #666;
  }

  .sizes {
    display: flex;
    gap: 16px;
    margin-top: 32px;
  }

  .sizes button {
    width: 47px; 
    height: 47px;
    background-color: #ccc;
    border-radius: 50%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #333;
    font-weight: bold;
    cursor: pointer;
    box-sizing: border-box;
    padding: 0;

  }

  .sizes button:hover {
    background-color: #bbb;
  }

  .sizes button:focus { /*outline when selected*/
    outline: none;
    border: 2px solid #666;
  }  

  .product-image {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 40px 0px;
  }

  .product-image img {
    width: 100%;
    height: auto;
    display: block;
  }

  .product-image .zoomed-image {
    position: absolute; 
    top: 20px;
    left: 50px;
    width: 410px;
    height: auto;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .product-image:hover .zoomed-image {
    opacity: 1;
  }

  .product-image .main-image {
    transition: opacity 0.3s ease;
  }

  .product-image:hover .main-image {
    opacity: 0;
  }

  .price-add-to-cart {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 350px;
    margin-top: 50px;
    background-color: #DFDFEF;
    border-radius: 24px;
  }
  
  .total-price {
    margin-left: 24px;
    margin-right: 48px;
    font-size:20px;
    font-weight: bold;
    font-style: italic;
  }

  .price-add-to-cart button {
    margin: 16px;
    margin-left: 0;
    padding: 12px 24px;
    background-color: #C0E1B4;
    border: none;
    border-radius: 15px;
    font-size: 16px;
    cursor: pointer;
  }

  .price-add-to-cart button:hover {
    background-color: #8CCE74;
  }
</style>
