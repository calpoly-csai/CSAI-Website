<script>
	import DotGrid from '$lib/DotGrid.svelte';
	import Card from './Card.svelte';
	import { CloudIcon, MapIcon, MessageCircleIcon } from 'svelte-feather-icons';

	let cards = [
		{
			title: 'Argo',
			description: 'An immersive panoramic tour that guides users around the Cal Poly campus.',
			icon: MapIcon,
			repositoryLink: 'https://github.com/calpoly-csai/virtual-tour-concept'
		},
		{
			title: 'Nimbus',
			description:
				'A voice assistant to help Cal Poly students navigate academics and campus life.',
			icon: CloudIcon,
			repositoryLink: 'https://github.com/calpoly-csai/api'
		},
		{
			title: 'Swanton Chatbot',
			description: 'An interactive chat bot for visitors of the Swanton Pacific Ranch.',
			icon: MessageCircleIcon,
			repositoryLink: 'https://github.com/calpoly-csai/swanton'
		}
	];
</script>

<section class="Projects" id="projects">
	<h2>Projects</h2>
	<img
		class="chart-backdrop"
		src="/images/chart-backdrop.svg"
		aria-hidden="true"
		alt="chart-backdrop"
	/>
	<div class="dots">
		<DotGrid rows={4} columns={15} color="white" />
	</div>
	<ul class="cards">
		{#each cards as card}
			<Card {...card}>
				<svelte:component this={card.icon} slot="icon" />
			</Card>
		{/each}
	</ul>
</section>

<style lang="scss">
	@import '../../../scss/utils';
	.Projects {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	h2 {
		text-align: center;
		margin-bottom: 60px;
		@include viewport(small) {
			margin-bottom: 40px;
		}
	}
	.chart-backdrop {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.dots {
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 20px;
	}

	.cards {
		align-self: center;
		list-style: none;
		padding: 0;
		margin: 0;
		height: min-content;
		display: flex;
		align-items: stretch;
		justify-content: center;
		flex-wrap: wrap;

		@include viewport(small) {
			align-items: center;
			flex-direction: column;
		}
	}
</style>
