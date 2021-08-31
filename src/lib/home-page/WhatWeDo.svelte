<script lang="ts">
	import { assets } from '$app/paths';
	import { onMount, onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	const activities = [
		{
			title: 'Competitions',
			description: 'Team up with fellow members and build models to solve data science problems.',
			icon: assets + '/images/competition-icon.svg'
		},

		{
			title: 'Guest Speakers',
			description: 'Network with and learn from industry professionals.',
			icon: assets + '/images/competition-icon.svg'
		},
		{
			title: 'Hangouts',
			description:
				'At our core, we are a commmunity. Members meet up weekly to talk about life and de-stress.',
			icon: assets + '/images/competition-icon.svg'
		},
		{
			title: 'Workshops',
			description: 'Learn about and apply new machine learning techniques.',
			icon: assets + '/images/competition-icon.svg'
		},
		{
			title: 'Projects',
			description: 'Create software solutions for challenges in the SLO community and beyond.',
			icon: assets + '/images/competition-icon.svg'
		}
	];
	let activeIndex = 0;
	let activityUpdateInterval: NodeJS.Timer;
	let intervalDuration = 4000;
	let currentActivity: typeof activities[number];
	let activitesList: HTMLUListElement;
	$: {
		currentActivity = activities[activeIndex];
		if (activitesList) {
			let offsetX = (activitesList?.children[activeIndex] as HTMLElement).offsetLeft - 30;
			activitesList?.scrollTo({ left: offsetX, behavior: 'smooth' });
		}
	}

	function resetInterval() {
		clearInterval(activityUpdateInterval);
		activityUpdateInterval = setInterval(() => {
			activeIndex = (activeIndex + 1) % activities.length;
		}, intervalDuration);
	}

	onMount(resetInterval);
	onDestroy(() => clearInterval(activityUpdateInterval));

	function selectActivity(index: number) {
		activeIndex = index;
		resetInterval();
	}
</script>

<section class="WhatWeDo" id="what-we-do">
	<h2>What We Do</h2>
	<ul class="activity-list" bind:this={activitesList}>
		{#each activities as activity, i}
			<button class="wrapper" class:active={i === activeIndex} on:click={() => selectActivity(i)}
				>{activity.title}</button
			>
		{/each}
	</ul>
	<div class="activity-wrapper">
		{#key currentActivity}
			<div
				class="activity-display"
				in:fly={{ y: 15, duration: 700, delay: 400 }}
				out:fly={{ y: 15, duration: 300 }}
			>
				<img src={currentActivity.icon} alt={currentActivity.title} />
				<p>{currentActivity.description}</p>
			</div>
		{/key}
	</div>
</section>

<style lang="scss">
	@import '../../scss/utils.scss';
	.WhatWeDo {
		text-align: center;
		min-height: initial;
	}
	h2 {
		margin: 0;
	}

	.activity-list {
		margin: auto;
		padding: 0;
		list-style: none;
		margin-bottom: 30px;
		display: flex;
		flex-wrap: nowrap;
		overflow-x: auto;
		width: min-content;
		max-width: 100%;

		button {
			color: rgb(177, 177, 177);
			display: block;
			background-color: transparent;
			margin: 10px;
			font-size: 22px;
			transition: all 0.4s;
			white-space: nowrap;
		}

		.active {
			font-weight: 700;
			color: var(--color-primary-variant);
		}
	}

	.activity-wrapper {
		position: relative;
		height: 400px;
		width: 400px;
		max-width: 100%;
		margin: auto;
		margin-top: 50px;
	}

	.activity-display {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		img {
			max-height: 80%;
			height: 300px;
		}
		p {
			margin: auto;
		}
	}
</style>
