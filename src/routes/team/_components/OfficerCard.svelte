<script>
	export let image = '';
	export let name = '';
	export let title = '';
</script>

<li class="OfficerCard">
	<img src={image} alt={name} />
	<div class="officer-info">
		<h3 class="name">{name}</h3>
		<p class="title">{title}</p>
	</div>
</li>

<style lang="scss">
	@import '../../../scss/utils.scss';
	.OfficerCard {
		position: relative;
		list-style: none;
		display: grid;
		grid-template-columns: auto 1fr;
		margin: 20px;

		width: 400px;
		background-color: white;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		border-radius: 7px;
		overflow: hidden;
	}

	img {
		object-fit: cover;
		height: 150px;
		width: 150px;
		object-position: center;

		@include viewport(small) {
			width: 125px;
		}
	}

	.officer-info {
		justify-self: center;
		align-self: center;
		padding: 20px;
	}

	.name {
		font-weight: bold;
		font-size: 20px;
		margin: 0;
		margin-bottom: 3px;
	}

	.title {
		font-size: 15px;
		font-weight: normal;
		margin: 0;
	}
</style>
