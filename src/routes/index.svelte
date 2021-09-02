<script lang="ts">
	import Hero from '$lib/home-page/Hero.svelte';
	import WhoWeAre from '$lib/home-page/WhoWeAre.svelte';
	import WhatWeDo from '$lib/home-page/WhatWeDo.svelte';
	import Meetings from '$lib/home-page/Meetings.svelte';
	import Projects from '$lib/home-page/Projects/Projects.svelte';
	import GetInvolved from '$lib/home-page/GetInvolved/GetInvolved.svelte';
	import { onMount } from 'svelte';

	export const prerender = true;

	function handleWaypointNavigation() {
		let waypoint = window.location.hash;
		if (!waypoint) return;
		let el = document.querySelector(waypoint);
		el?.scrollIntoView({ behavior: 'smooth' });
	}

	onMount(handleWaypointNavigation);
</script>

<svelte:head>
	<title>Cal Poly CSAI</title>
	<meta
		name="description"
		content="CSAI is a Cal Poly SLO club that uses artificial intelligence to solve impactful engineering problems."
	/>
</svelte:head>

<article class="Home">
	<Hero />
	<WhoWeAre />
	<WhatWeDo />
	<Meetings />
	<Projects />
	<GetInvolved />
</article>

<style lang="scss" global>
	@import '../scss/global.scss';
	@import '../scss/utils.scss';
	.Home section {
		position: relative;
		width: 100%;
		min-height: 100vh;
		padding: 100px 50px;
		background-color: var(--color-background-light);
		overflow-x: hidden;

		@media screen and (min-height: 1400px) {
			min-height: auto;
		}

		@include viewport(small) {
			padding: 75px 25px;

			h2,
			h3 {
				text-align: left;
			}
		}
	}
</style>
