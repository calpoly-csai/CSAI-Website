<script lang="ts">
	import DotGrid from '$lib/components/DotGrid.svelte';
	import { onMount } from 'svelte';
	import OfficerCard from './_components/OfficerCard.svelte';

	interface MemberData {
		login: string;
		id: number;
		node_id: string;
		avatar_url: string; 
		html_url: string; 
	}

	const officerPath = '/images/officers/';
	
	// Executive Board
	const executiveBoard = [
		{ name: 'Jason Jelincic', title: 'President', image: 'Jason Jelincic.jpg' },
		{ name: 'Parker Jones', title: 'Director of Meetings', image: 'ParkerJones.jpg' },
		{ name: 'Muzart Tuman', title: 'Director of Projects', image: 'MuzTum_Muzart Tuman.jpeg' },
		{ name: 'Thomas Spieler', title: 'Director of Operations and Finances', image: 'ThomasSpieler.jpg' },
		{ name: 'Isha Varrier', title: 'Director of External Affairs', image: 'IshaVarrier.png' }
	];

	// Officer Positions by Branch
	const externalAffairsBranch = [
		{ name: 'Weston Patrick', title: 'Outreach Officer', image: 'Weston Patrick.JPEG' },
		{ name: 'Hannah Bratten', title: 'Social Media Lead', image: 'Hannah Bratten.jpeg' },
		{ name: 'Rachana Raju', title: 'Event Coordinator', image: 'RachanaRaju.jpg' }
	];

	const meetingsBranch = [
		{ name: 'Sumedha Kadurthi', title: 'Meeting Lead', image: 'Sumedha Kundurthi.jpg' },
		{ name: 'Jacob Timmer', title: 'Meeting Lead', image: 'JacobSelfPortrait_Jacob Timmer.jpg' },
		{ name: 'Harini Baskar', title: 'Meeting Lead', image: 'HariniBaskar.png' },
		{ name: 'Omar Alim Mohamed', title: 'Meeting Lead', image: 'omar_m.png' }
	];

	const projectsBranch = [
		{ name: 'Alexios Sideris', title: 'Associate Director of Projects', image: 'Alexios Sideris.jpg' },
		{ name: 'Logan Barker', title: 'Project Lead', image: 'Logan Barker.jpeg' },
		{ name: 'Gus Flusser', title: 'Project Lead', image: 'gus_flusser.png' },
		{ name: 'Pranav Athreya', title: 'Project Lead', image: 'Pranav Athreya.jpeg' },
		{ name: 'Logan Beard', title: 'Project Lead', image: 'Logan Beard.jpg' },
		{ name: 'Ivan Torriani', title: 'Project Lead', image: '1737017852096_Ivan Torriani.jpg' },
		{ name: 'Zach Mattes', title: 'Project Lead', image: 'IMG_4512_Zachary Mattes.jpg' },
		{ name: 'Misha Bandi', title: 'Project Lead', image: 'MishaBandi.jpg' }
	];

	const administrativeBranch = [
		{ name: 'Sharon Liang', title: 'Webmaster', image: 'SharonLiang.jpg' },
		{ name: 'Ammara Amin', title: 'Associate Webmaster', image: 'Ammara Amin.jpg' }
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
		<h2>CSAI Team</h2>
		<p class="description">
			The officer team is available to assist members on their AI learning paths, advise development leaders on community projects, and carry out the administrative processes of the club.
		</p>

		<div class="branch-section">
			<span class="branch-badge executive">Executive Board</span>
			<ul class="officer-list">
				{#each executiveBoard as { name, title, image }}
					<OfficerCard {name} {title} image={officerPath + image} />
				{/each}
			</ul>
		</div>

		<div class="branch-section">
			<span class="branch-badge administrative">Administrative</span>
			<ul class="officer-list">
				{#each administrativeBranch as { name, title, image }}
					<OfficerCard {name} {title} image={officerPath + image} />
				{/each}
			</ul>
		</div>

		<div class="branch-section">
			<span class="branch-badge external">External Affairs</span>
			<ul class="officer-list">
				{#each externalAffairsBranch as { name, title, image }}
					<OfficerCard {name} {title} image={officerPath + image} />
				{/each}
			</ul>
		</div>

		<div class="branch-section">
			<span class="branch-badge meetings">Meetings</span>
			<ul class="officer-list">
				{#each meetingsBranch as { name, title, image }}
					<OfficerCard {name} {title} image={officerPath + image} />
				{/each}
			</ul>
		</div>

		<div class="branch-section">
			<span class="branch-badge projects">Projects</span>
			<ul class="officer-list">
				{#each projectsBranch as { name, title, image }}
					<OfficerCard {name} {title} image={officerPath + image} />
				{/each}
			</ul>
		</div>
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
		padding: 120px 60px;
		overflow-x: hidden;
		@include viewport(small) {
			padding: 60px 30px;
		}
	}

	section.officers {
		padding-top: 180px;

		@include viewport(small) {
			padding-top: 140px;
		}
	}

	section.Contributors {
		padding-top: 60px;
		background: linear-gradient(135deg, rgba(41, 146, 229, 0.02) 0%, rgba(41, 146, 229, 0.05) 100%);
	}

	p {
		max-width: 600px;
	}

	h2 {
		margin: 0 auto 0px auto;
		font-size: 2.5em;
		color: var(--color-primary);
		text-align: left;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.description {
		margin: 0 0 40px 0;
		text-align: left;
		font-size: 1.1em;
		line-height: 1.6;
		color: var(--color-text-dark);
		opacity: 0.8;
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

	.branch-section {
		margin: 60px auto;
		max-width: 1200px;
		text-align: left;
	}

	.branch-badge {
		display: inline-block;
		padding: 8px 20px;
		border-radius: 20px;
		font-size: 0.9em;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 30px;
		color: white;
	}

	.branch-badge.administrative {
		background-color: #1e3a8a;
	}

	.branch-badge.external {
		background-color: #3b82f6;
	}

	.branch-badge.meetings {
		background-color: #60a5fa;
	}

	.branch-badge.projects {
		background-color: #93c5fd;
	}

	.branch-badge.executive {
		background-color: var(--color-primary);
	}

	.officer-list {
		display: flex;
		flex-wrap: wrap;
		margin: 0;
		padding: 0;
		list-style: none;
		gap: 25px;
		justify-content: flex-start;
	}

	.contributor-list {
		list-style: none;
		width: 100%;
		max-width: 1000px;
		margin: 40px auto 0 auto;
		padding: 0;
		a {
			display: block;
			color: var(--color-primary);
			text-decoration: none;
			margin: 8px;
			padding: 15px 25px;
			border-left: 4px solid var(--color-primary);
			font-size: 16px;
			background-color: var(--color-background-mid);
			cursor: pointer;
			transition: all 0.3s ease;
			box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
			border-radius: 8px;

			&:hover {
				color: white;
				background-color: var(--color-primary);
				transform: translateY(-2px);
				box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
			}
		}
		li {
			display: inline-block;
			margin: 0;
			padding: 0;
		}
	}
</style>
