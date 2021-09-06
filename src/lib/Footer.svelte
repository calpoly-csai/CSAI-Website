<script>
	import { GithubIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from 'svelte-feather-icons';

	const socialMedia = [
		{ label: 'Github', icon: GithubIcon, link: 'https://github.com/calpoly-csai' },
		{
			label: 'LinkedIn',
			icon: LinkedinIcon,
			link: 'https://www.linkedin.com/school/csai-cal-poly/mycompany/'
		},
		{ label: 'Instagram', icon: InstagramIcon, link: 'https://www.instagram.com/calpolycsai/' },
		{
			label: 'Youtube',
			icon: YoutubeIcon,
			link: 'https://www.youtube.com/channel/UCAJUPERHzznsXHyFSACpjJw'
		}
	];

	const footerNav = [
		{ title: 'Home', link: '/' },
		{ title: 'Team', link: '/team' },
		{ title: 'Projects', link: '/#projects' },
		{ title: 'Contact Us', link: '/#get-involved' }
	];
</script>

<footer>
	<img class="logo" src="/images/logo-black.png" alt="CSAI Logo" />
	<nav>
		<h3>Navigation</h3>
		<ul>
			{#each footerNav as { title, link }}
				<li><a href={link}>{title}</a></li>
			{/each}
		</ul>
	</nav>
	<ul class="social-media">
		{#each socialMedia as { icon, link, label }}
			<button class="wrapper" aria-label={label}>
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
				width: 30px;
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
