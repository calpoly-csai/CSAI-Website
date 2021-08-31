<script lang="ts">
	import TextField from '$lib/TextField.svelte';
	import { encode } from '../../../modules/utils';

	export let formType: 'member' | 'partner' | 'speaker';
	function onSubmit(e: Event) {
		// Send off form data
		const formData = new FormData(e.target as HTMLFormElement);
		const body = encode(formData);
		// TODO: Hook this up to Netlify
		// fetch('/', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		// 	body
		// }).catch(console.error);
	}
</script>

<form on:submit|preventDefault={onSubmit} class={formType}>
	<input type="hidden" name="formType" value={formType} />
	{#if formType == 'member'}
		<div style="grid-area: title">
			<h3>Tell Us About Yourself</h3>
		</div>
		<div style="grid-area: name">
			<TextField name="name" label="Name" />
		</div>
		<div style="grid-area: email">
			<TextField name="email" label="Email" type="email" />
		</div>

		<div class="reason">
			<span style="margin-left:5px">Area of Interest</span>
			<textarea name="reason" />
		</div>
		<div style="grid-area: submit">
			<input type="submit" value="Say Hi 👋" />
		</div>
	{:else if formType == 'partner'}
		<div style="grid-area: title">
			<h3>We're Interested in Collaborating</h3>
		</div>
		<div style="grid-area: name">
			<TextField name="name" label="Organization Name" />
		</div>
		<div style="grid-area: email">
			<TextField name="email" label="Email" type="email" />
		</div>

		<div class="reason">
			<span style="margin-left:5px">Message</span>
			<textarea name="reason" />
		</div>
		<div style="grid-area: submit">
			<input type="submit" value="Propose Project 🧠" />
		</div>
	{:else}
		<div style="grid-area: title">
			<h3>Share Your Knowledge</h3>
		</div>
		<div style="grid-area: name">
			<TextField name="name" label="Name" />
		</div>
		<div style="grid-area: email">
			<TextField name="email" label="Email" type="email" />
		</div>

		<div style="grid-area: topic">
			<TextField name="topic" label="Topic" type="text" />
		</div>

		<div class="reason">
			<span style="margin-left:5px">Description</span>
			<textarea name="description" />
		</div>
		<div style="grid-area: submit">
			<input type="submit" value="Pitch Workshop 🔨" />
		</div>
	{/if}
</form>

<style lang="scss">
	@import '../../../scss/utils.scss';
	form {
		display: grid;
		gap: 15px 20px;
		width: 100%;
		height: auto;
		background-color: white;
		border-radius: 8px;
		padding: 30px;
		color: var(--color-text-dark);
		text-align: left;
		grid-template-rows: repeat(4, auto);
		grid-template-columns: 1fr 1fr;
		grid-template-areas: 'title title' 'name reason' 'email reason' 'submit submit';

		@include viewport(small) {
			grid-template-rows: repeat(5, auto);

			grid-template-columns: 1fr;
			grid-template-areas: 'title ' 'name' 'email' 'reason' 'submit';
		}

		&.speaker {
			grid-template-rows: repeat(5, auto);
			grid-template-areas: 'title title' 'name reason' 'email reason' 'topic reason' 'submit submit';

			@include viewport(small) {
				grid-template-rows: repeat(6, auto);
				grid-template-columns: 1fr;
				grid-template-areas: 'title ' 'name' 'email' 'topic' 'reason' 'submit';
			}
		}
	}

	h3 {
		color: var(--color-text-dark);
		text-align: left;
	}

	input {
		display: block;
	}

	input[type='submit'] {
		margin: auto;
	}

	.reason {
		grid-area: reason;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;

		span {
			margin-bottom: 5px;
		}

		textarea {
			resize: none;
			display: block;
			width: 100%;
			height: 100%;
		}
	}
</style>
