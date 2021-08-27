<script>
	import { onMount } from 'svelte';
	import particlesConfig from '../../modules/particle-config';
	import scrollTrackable from '../../modules/scrollTrackable';
	let ParticlesComponent;
	let scrollP = 0;
	$: isOnscreen = scrollP < 0.99;
	$: console.log(isOnscreen);
	onMount(async () => {
		const module = await import('svelte-particles');
		ParticlesComponent = module.default;
	});
</script>

<section class="Hero" id="hero" use:scrollTrackable={(progress) => (scrollP = progress)}>
	{#if isOnscreen}
		<svelte:component
			this={ParticlesComponent}
			options={particlesConfig}
			id="particle-background"
		/>
	{/if}

	<div class="content">
		<div class="logo-frame">
			<img class="logo" src="static/images/logo-white.png" alt="CSAI Logo" />
		</div>
		<h1>CS + AI</h1>
		<p class="club-descriptor">Computer Science and Artifical Intellgence Club</p>
	</div>
</section>

<style lang="scss">
	@import '../../scss/utils.scss';
	:global(#particle-background) {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	.Hero {
		background-color: transparent;
	}

	.content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		flex-direction: column;
		max-width: 100%;
		max-height: 100%;
	}

	h1 {
		margin: 0;
		margin-top: 15px;
	}

	$logo-size: 150px;
	.logo-frame {
		display: grid;
		place-items: center;
		width: $logo-size + 60px;
		height: $logo-size + 60px;
		border-radius: 50%;
		background-color: var(--color-primary-variant);

		.logo {
			height: $logo-size;
		}
	}

	.club-descriptor {
		padding: 0;
		margin: 0;
	}
</style>
