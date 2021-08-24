<script lang="ts">
	import { assets } from '$app/paths';
	import { onMount, onDestroy } from 'svelte';
	import { fade, fly } from 'svelte/transition';
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
	$: currentActivity = activities[activeIndex];

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

<section class="WhatWeDo">
	<h2>What We Do</h2>
	<ul class="activity-list">
		{#each activities as activity, i}
			<button class="wrapper" class:active={i === activeIndex} on:click={() => selectActivity(i)}
				>{activity.title}</button
			>
		{/each}
	</ul>
	{#key currentActivity}
		<div
			class="activity-display"
			in:fly={{ y: 15, duration: 1000, delay: 300 }}
			out:fly={{ y: 15, duration: 300 }}
		>
			<img src={currentActivity.icon} alt={currentActivity.title} />
			<p>{currentActivity.description}</p>
		</div>
	{/key}
</section>

<style lang="scss">
	.WhatWeDo {
		text-align: center;
	}
	h2 {
		margin: 0;
	}

	.activity-list {
		margin: 0;
		padding: 0;
		list-style: none;
		margin-bottom: 30px;

		button {
			color: rgb(177, 177, 177);
			display: inline-block;
			background-color: transparent;
			margin: 10px;
			font-size: 22px;
			transition: all 0.4s;
		}

		.active {
			font-weight: 700;
			color: var(--color-primary-variant);
		}
	}

	.activity-display {
		img {
			max-height: 80%;
			height: 300px;
		}
	}
</style>
