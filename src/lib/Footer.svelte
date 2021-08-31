<script>
	import { GithubIcon, InstagramIcon, LinkedinIcon } from 'svelte-feather-icons';

	const socialMedia = [
		{ icon: GithubIcon, link: 'https://github.com/calpoly-csai' },
		{ icon: LinkedinIcon, link: 'https://www.linkedin.com/school/csai-cal-poly/mycompany/' },
		{ icon: InstagramIcon, link: 'https://www.instagram.com/calpolycsai/' }
	];

	const footerNav = [
		{ title: 'Home', link: '/' },
		{ title: 'Team', link: '/team' },
		{ title: 'Projects', link: '/#projects' },
		{ title: 'Contact Us', link: '/#get-involved' }
	];
</script>

<footer>
	<img class="logo" src="static/images/logo-black.png" alt="CSAI Logo" />
	<nav>
		<h3>Navigation</h3>
		<ul>
			{#each footerNav as { title, link }}
				<li><a href={link}>{title}</a></li>
			{/each}
		</ul>
	</nav>
	<ul class="social-media">
		{#each socialMedia as { icon, link }}
			<button class="wrapper">
				<a href={link} target="_blank"><svelte:component this={icon} /></a>
			</button>
		{/each}
	</ul>
</footer>

<style lang="scss">
	@import '../scss/utils.scss';
	footer {
		position: relative;
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: auto auto 1fr auto;
		align-items: flex-start;
		z-index: 20;
		width: 100%;
		padding: 50px;
		background-color: white;
		box-shadow: 0 0 20px #00000012;

		@include viewport(small) {
			padding: 35px;
		}

		h3 {
			font-size: 25px;
			margin-bottom: 10px;
		}

		ul {
			list-style: none;
			margin: 0;
			padding: 0;
		}

		.logo {
			height: 90px;
		}

		nav {
			max-width: 250px;
			margin-left: 40px;

			a {
				display: block;

				color: var(--color-text-dark);
				text-decoration: underline;
				font-family: inherit;
				margin: 5px 0;

				&:visited {
					color: rgb(131, 131, 131);
				}
			}
		}

		.social-media {
			align-self: flex-end;
			justify-self: flex-end;
			text-align: right;

			button {
				display: inline-block;
				margin: 0 10px;

				height: 30px;

				@include viewport(small) {
					display: block;
					margin: 10px 0;
				}
			}

			a {
				color: var(--color-primary);
				&:hover {
					color: var(--color-primary-variant);
				}
			}
		}
	}
</style>
