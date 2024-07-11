<script lang="ts">
	import DotGrid from '$lib/DotGrid.svelte';
	import { onMount } from 'svelte';
	import OfficerCard from './_components/OfficerCard.svelte';

	interface MemberData {
		login: string; // Username
		id: number;
		node_id: string;
		avatar_url: string; // Profile Picture
		html_url: string; // URL to personal GitHub page
	}

	const officerPath = '/images/officers/';
	// const executiveBoard = [
	// 	{ name: 'Leo Horwitz', title: 'President', image: 'Leo Horwitz.jpg' },
	// 	{ name: 'Hannah Moshtaghi', title: 'External Vice President', image: 'HannahMoshtaghi.JPG' },
	// 	{ name: 'Jason Jelincic', title: 'Internal Vice President', image: 'Jason Jelincic.jpg' },
	// 	{ name: 'Thomas Spieler', title: 'Administrator', image: 'ThomasSpieler.jpg'}
	// ];
	const officers = [
		{ name: 'Leo Horwitz', title: 'President', image: 'Leo Horwitz.jpg' },
		{ name: 'Hannah Moshtaghi', title: 'External Vice President', image: 'HannahMoshtaghi.JPG' },
		{ name: 'Jason Jelincic', title: 'Internal Vice President', image: 'Jason Jelincic.jpg' },
		{ name: 'Thomas Spieler', title: 'Administrator', image: 'ThomasSpieler.jpg'},
		{ name: 'Ameer Arsala', title: 'Research Lead', image: 'Ameer Arsala.jpg' },
		{ name: 'David Hernandez', title: 'Research Lead', image: 'David_Hernandez.png' },
		{ name: 'Ishan Meher', title: 'Research Lead', image: 'Ishan_Meher.jpg' },
		{ name: 'Belal Elshenety', title: 'Meeting Facilitator Lead', image: 'Belal Elshenety.jpeg' },	
    	{ name: 'Logan Barker', title: 'Meeting Facilitator Lead', image: 'LoganBarker.jpeg'},
		{ name: 'Parker Jones', title: 'Meeting Facilitator', image: 'ParkerJones.jpg' },
		{ name: 'Muzart Tuman', title: 'Meeting Facilitator', image: 'Muzart Tuman.jpg' },
		// { name: 'Misha Bandi', title: 'Meeting Facilitator', image: '' },
		{ name: 'Weston Patrick', title: 'Meeting Facilitator', image: 'WestonPatrick.jpg'},
   		{ name: 'Matthew Huang', title: 'Project Lead', image: 'MatthewHuang.jpg'},
    	{ name: 'Min Hset Hliang', title: 'Project Lead', image: 'Min Hset Hlaing.JPG'},
		{ name: 'Sharon Liang', title: 'Webmaster', image: 'SharonLiang.jpeg' },
		{ name: 'Isha', title: 'Outreach Officer', image: 'IshaVarrier.png'},
    	// { name: 'Dak', title: 'Social Media Lead', image: 'Dak.jpg'},
    	{ name: 'Harini Baskar', title: 'Social Media Lead', image: 'HariniBaskar.png'},
    	{ name: 'Rachana Raju', title: 'Event Coordinator', image: 'RachanaRaju.jpg'}
    
	];

	let members: MemberData[] = [];

	async function getMembers() {
		try {
			let res = await fetch('https://api.github.com/orgs/calpoly-csai/members');
			members = await res.json();
		} catch {
			return;
		}
	}

	onMount(getMembers);
</script>

<svelte:head>
	<title>CSAI Team</title>
	<meta name="theme-color" content="#2992e5" />
	<meta
		name="description"
		content="The CSAI team works on open-source projects and competitions to grow as data scientists."
	/>
</svelte:head>

<article class="Team">
	<div class="backdrop">
		<div class="top-dots">
			<DotGrid rows={7} columns={12} />
		</div>

		<div class="bottom-dots">
			<DotGrid rows={5} columns={11} />
		</div>
		<div class="arcs">
			<img src="/images/arcs.svg" alt="arcs" />
		</div>
	</div>
	<section class="officers">
		<h2>CSAI Officers</h2>
		<p class="description">
			The officer team is available to assist members on their AI learning paths, advise development
			leaders on community projects, and carry out the administrative processes of the club.
		</p>

		<!-- <h3> Executive Board </h3>
		<ul class="officer-list">
		{#each executiveBoard as { name, title, image}}
			<OfficerCard {name} {title} image={officerPath + image} />
		{/each}
		</ul> -->

		<ul class="officer-list">
			{#each officers as { name, title, image }}
				<OfficerCard {name} {title} image={officerPath + image} />
			{/each}
		</ul>
	</section>
	<section class="Contributors">
		<h2>Contributors</h2>
		<p class="description">
			CSAI community members apply their software engineering skills to large-scale collaborative
			projects. Thank you to everyone who has contributed.
		</p>

		<ul class="contributor-list">
			{#each members as member}
				<li>
					<a href={member.html_url} target="_blank">{member.login}</a>
				</li>
			{/each}
		</ul>
	</section>
</article>

<style lang="scss" global>
	@import '../../scss/global.scss';
	@import '../../scss/utils.scss';

	.Team {
		min-height: 100vh;
		width: 100%;
		background-color: var(--color-background-light);
	}

	section {
		position: relative;
		min-height: min-content;
		width: 100%;
		padding: 100px;
		overflow-x: hidden;
		@include viewport(small) {
			padding: 30px;
		}
	}

	section.officers {
		padding-top: 160px;

		@include viewport(small) {
			padding-top: 120px;
		}
	}

	section.contributors {
		padding-top: 0;
	}

	p {
		max-width: 500px;
	}

	h2 {
		margin: 0;
		margin-bottom: 10px;
	}

	.description {
		margin: 0;
	}
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.top-dots {
		position: absolute;
		top: 0;
		right: 0;
	}

	.bottom-dots {
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.arcs {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 50%;
	}

	.officer-list {
		display: flex;
		flex-wrap: wrap;

		margin: 0;
		margin-top: 50px;
		padding: 0;
		list-style: none;
	}

	.contributor-list {
		list-style: none;
		width: 100%;
		margin: 30px 0;
		padding: 0;
		a {
			display: block;
			color: var(--color-primary);
			text-decoration: none;
			margin: 10px;
			padding: 11px 30px;
			border-left: 4px solid var(--color-primary);
			font-size: 16px;
			background-color: var(--color-background-mid);
			cursor: pointer;
			transition: all 0.5s;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

			&:hover {
				color: white;
				background-color: var(--color-primary);
			}
		}
		li {
			display: inline-block;
			margin: 0;
			padding: 0;
		}
	}
</style>
