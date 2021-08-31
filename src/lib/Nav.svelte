<script lang="ts">
	import { goto } from '$app/navigation';
	import MediaQuery from 'svelte-media-query';
	import { breakpoints } from '../modules/utils';
	import { MenuIcon, XIcon } from 'svelte-feather-icons';
	import { fly } from 'svelte/transition';
	const routes = [
		{ title: 'Home', href: '/' },
		{ title: 'Team', href: '/team' },
		{ title: 'Projects', href: '/#projects' },
		{ title: 'Contact Us', href: '/#get-involved' }
	];

	let showMenu = false;

	async function logoClicked() {
		if (location.pathname !== '/') {
			await goto('/');
		}
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	async function showMemberForm() {
		if (location.pathname !== '/') {
			await goto('/');
		}
		setTimeout(() => {
			document.getElementById('get-involved').scrollIntoView({ behavior: 'smooth' });
		}, 400);
	}
</script>

<MediaQuery query={breakpoints.small} let:matches>
	{#if matches}
		<!-- Small Nav Menu -->
		<nav class="hamburger-nav">
			<button class="wrapper logo-button" on:click={logoClicked}>
				<img class="logo" src="/images/logo-white.png" alt="CSAI Logo" />
			</button>
			<button class="wrapper" on:click={() => (showMenu = true)}>
				<MenuIcon size="30" />
			</button>
			{#if showMenu}
				<ul class="menu" transition:fly={{ x: 500 }}>
					{#each routes as route}
						<li class="link-wrapper" on:click={() => (showMenu = false)}>
							<a href={route.href}>{route.title}</a>
						</li>
					{/each}
					<button class="wrapper close" on:click={() => (showMenu = false)}
						><XIcon size="30" /></button
					>
				</ul>
			{/if}
		</nav>
	{:else}
		<!-- Large Nav Menu -->
		<nav class="widescreen-nav">
			<div class="left-options">
				<button class="wrapper logo-button">
					<a href="/" class="wrapper">
						<img class="logo" src="/images/logo-white.png" alt="CSAI Logo" />
					</a>
				</button>
				<ul>
					{#each routes as route}
						<li class="link-wrapper">
							<a href={route.href}>{route.title}</a>
						</li>
					{/each}
				</ul>
			</div>
			<div class="right-options">
				<button on:click={showMemberForm}>Join Us</button>
			</div>
		</nav>
	{/if}
</MediaQuery>

<style lang="scss">
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: var(--color-background-dark);
		padding: 20px 60px;
		z-index: 100;

		.left-options,
		.right-options {
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}

		.right-options {
			justify-content: flex-end;
		}
		.logo {
			height: 40px;
			margin-right: 20px;
		}

		ul {
			list-style: none;
			margin: 0;
			padding: 0;
		}
		.link-wrapper {
			display: inline-block;
			margin: 0 15px;
		}

		a {
			text-decoration: none;
			color: white;
			font-size: 17px;

			&:visited {
				color: white;
			}
		}
	}

	.hamburger-nav {
		padding: 15px 30px;
		color: white;

		.menu {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			padding: 50px;
			background-color: var(--color-background-dark);

			li {
				display: block;
				margin: 12px 0;
			}

			a {
				text-decoration: none;
				color: white;
				font-size: 40px;
				font-weight: bold;
				cursor: pointer;

				&:visited {
					color: white;
				}
			}
		}
		.close {
			position: absolute;
			top: 25px;
			right: 25px;
		}
	}
</style>
