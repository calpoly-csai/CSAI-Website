<script lang="ts">
	import { GithubIcon } from 'svelte-feather-icons';
	export let title: string;
	export let description: string;
	export let repositoryLink: string;
</script>

<li class="Card">
	<div class="icon-wrapper"><slot name="icon" /></div>
	<div class="content">
		<h3>{title}</h3>
		<p>{description}</p>
	</div>

	<ul class="resources">
		<li>
			<a href={repositoryLink} target="_blank"><GithubIcon size="34" /></a>
		</li>
	</ul>
</li>

<style lang="scss">
	@import '../../../scss/utils';

	.Card {
		position: relative;
		background-color: var(--color-background-light);
		display: grid;
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.08);
		border-radius: 9px;
		border: 1px solid #dbdbdb;
		padding: 30px;
		padding-top: 50px;
		width: 330px;
		max-width: 90%;
		margin: 30px 15px;

		@include viewport(small) {
			margin: 35px 0;
		}
	}
	.icon-wrapper {
		width: 80px;
		height: 80px;
		display: grid;
		place-items: center;
		padding: 20px;
		background-color: var(--color-secondary-variant);
		position: absolute;
		top: 0;
		left: 40px;
		transform: translate(-50%, -50%);
		color: white;
		border-radius: 50%;
	}

	.resources {
		align-self: flex-end;
		justify-self: flex-end;
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>
