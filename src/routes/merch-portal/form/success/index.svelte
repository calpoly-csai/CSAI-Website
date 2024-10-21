<!-- rough thank you page, plan to add more css soon -->
<script>
	import { onMount } from 'svelte';
	import particlesConfig from '../../../../../src/modules/particle-config';
	let ParticlesComponent;
	let scrollP = 0;
	$: isOnscreen = scrollP < 0.99;
	onMount(async () => {
		const module = await import('svelte-particles');
		ParticlesComponent = module.default;
	});
</script>

<svelte:head>
	<title>CSAI Order Success</title>
	<meta name="theme-color" content="#2992e5" />
	<meta name="description" content="CSAI merch order successful." />
</svelte:head>

<div>
	{#if isOnscreen}
		<svelte:component
			this={ParticlesComponent}
			options={particlesConfig}
			id="particle-background"
		/>
	{/if}
</div>
<div class="container">
	<div class="right-section">
		<div class="note">
			<h2>THANKS FOR SUPPORTING CSAI</h2>
			<h1>Your order was completed <br /> successfully!</h1>
			<p>
				We appreciate you for your support. To receive your order, talk to Leo Horwitz or Thomas
				Spieler at our next meeting to pay with cash or Venmo. We look forward to seeing you! (If
				you don't know our faces, feel free to check out our photos on the "Team" page)
			</p>
		</div>
	</div>
</div>

<style>
	/* general  */
	@import '../../../../scss/global.scss';
	@import '../../../../scss/utils.scss';
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

	.container {
		margin-top: 180px;
		margin-left: 50px;
		display: grid;
		grid-template-columns: 0.9fr 0.1fr;
		padding: 150px;
		min-height: calc(140vh - 180px - 180px - 100px);
		position: relative;
		z-index: 1;
	}

	.right-section {
		position: relative;
	}

	.note {
		border: 2px solid rgba(6, 61, 119, 0.8);
		border-radius: 10px;
		padding: 30px;
		background-color: rgba(255, 255, 255, 0.9);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	.right-section h2 {
		font-size: 29px;
		color: #333;
	}
	.right-section h1 {
		font-size: 50px;
		font-weight: 100;
		color: #222;
	}

	.right-section p {
		color: #555;
		line-height: 1.5;
	}

	/* Media Queries */
	@media (max-width: 768px) {
		.container {
			margin-left: 20px;
			padding: 100px;
			grid-template-columns: 1fr;
		}

		.note {
			padding: 20px;
		}

		.right-section h2 {
			font-size: 24px;
		}
		.right-section h1 {
			font-size: 36px;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 50px;
		}

		.note {
			padding: 15px;
		}

		.right-section h2 {
			font-size: 20px;
		}
		.right-section h1 {
			font-size: 28px;
		}

		p {
			font-size: 14px;
		}
	}
</style>
