<script>
	import DotGrid from '$lib/components/DotGrid.svelte';
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
		},
		{
			title: 'CS+AI Discord Bot',
			description: 'The goated discord bot of the CS+AI discord server!',
			icon: MessageCircleIcon,
			repositoryLink: 'https://github.com/calpoly-csai/CSAI-Discord-Bot'
		},
		{
			title: 'Pseudocode LLM Project',
			description: 'A LLM pipeline to mimic reasoning models with non-reasoning models. Red Light, Blue Light: A recreation of the mini-game from Squid Games with computer vision and player tracking.',
			icon: MessageCircleIcon,
			repositoryLink: 'https://github.com/calpoly-csai/RedLight-BlueLight'
		},
				{
			title: 'MealPrepAI',
			description: 'An AI assistant to make the most out of your fridge and optimize your meal prep.',
			icon: MessageCircleIcon,
			repositoryLink: 'https://github.com/calpoly-csai/MealPrepAI'
		},
				{
			title: 'NoteVision',
			description: 'An AI platform to get the most out of your notes.',
			icon: MessageCircleIcon,
			repositoryLink: 'https://github.com/calpoly-csai/NoteVision'
		},
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
