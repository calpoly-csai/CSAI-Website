<!-- individual product card for product display grid -->
<script>
	export let product;
</script>

<div class="product-card">
	<a href={`/merch-portal/products/${product.id}`}>
		<div class="image-container">
			<img src={product.images[0]} alt={product.name} />
		</div>
		<h2>{product.name}</h2>
		<p>${product.price}</p>
	</a>
</div>

<style>
	.product-card {
		padding: 10px;
		text-align: center;
	}

	.product-card a {
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

	.product-card:hover {
		transform: scale(1.1);
		box-shadow: rgba(0, 0, 0, 0.2);
		border-color: black;
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
