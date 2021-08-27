<script lang="ts">
	import Hero from '$lib/home-page/Hero.svelte';
	import WhoWeAre from '$lib/home-page/WhoWeAre.svelte';
	import WhatWeDo from '$lib/home-page/WhatWeDo.svelte';
	import Projects from '$lib/home-page/Projects/Projects.svelte';
	import GetInvolved from '$lib/home-page/GetInvolved/GetInvolved.svelte';
	import { onMount } from 'svelte';

	function handleWaypointNavigation() {
		let waypoint = window.location.hash;
		if (!waypoint) return;
		let el = document.querySelector(waypoint);
		el?.scrollIntoView({ behavior: 'smooth' });
	}

	onMount(handleWaypointNavigation);
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<article class="Home">
	<Hero />
	<WhoWeAre />
	<WhatWeDo />
	<Projects />
	<GetInvolved />
</article>

<style lang="scss" global>
	* {
		box-sizing: border-box;
	}

	:root {
		--color-primary: #2447a1;
		--color-primary-variant: #2992e5;
		--color-secondary: #f2c75c;
		--color-secondary-variant: #3a913f;
		--color-background-mid: #d6e3f2;
		--color-background-light: #fff;
		--color-background-dark: #151a47;
		--color-text-light: #fff;
		--color-text-dark: #323232;
	}

	html,
	body {
		font-family: 'IBM Plex Sans', sans-serif;
		color: var(--color-text-dark);
		margin: 0;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-weight: 800;
		margin: 0;
		margin-bottom: 18px;
	}

	h1 {
		font-size: 80px;
	}
	h2 {
		font-size: 50px;
	}

	h3 {
		font-size: 30px;
	}

	h4 {
		font-size: 20px;
	}

	button,
	input[type='submit'] {
		transform: scale(1);
		transition: transform 0.4s;
		border: none;
		border-radius: 11px;
		background-color: var(--color-primary-variant);
		padding: 12px 30px;
		color: white;
		font-weight: 700;
		font-size: 17px;
		cursor: pointer;

		&.wrapper {
			margin: 0;
			padding: 0;
			background-color: transparent;
		}

		&:active {
			transform: scale(0.95);
		}
	}

	input,
	textarea {
		display: block;
		border-radius: 12px;
		background-color: #ededed;
		border: 1px solid #cdcdcd;
		padding: 10px;
		font-family: 'IBM Plex Sans', sans-serif;
		color: var(--color-text-dark);
	}

	.Home section {
		position: relative;
		height: 100vh;
		min-height: min-content;
		width: 100%;
		padding: 50px;
		background-color: var(--color-background-light);
		overflow-x: hidden;
	}
</style>
