<script lang="ts">
	import TextField from '$lib/components/TextField.svelte';
	import { json_encode } from '../../../modules/utils';
	import { fly } from 'svelte/transition';
	// import {env} from '$env/dynamic/private'
	export let formType: 'member' | 'partner' | 'speaker';
	const apikey = import.meta.env.VITE_ML_KEY;
	let sendCount = 0;
	function onSubmit(e: Event) {
		// Send off form data
		const formData = new FormData(e.target as HTMLFormElement);
		const body = json_encode(formData);
		sendCount++;
		fetch('https://connect.mailerlite.com/api/subscribers', {
			method: 'POST',
			// mode: 'no-cors',
			headers: {
				'Authorization': apikey,
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body
		}).catch(console.error);
	}
</script>

{#key sendCount}
	<form
		on:submit|preventDefault={onSubmit}
		class={formType}
		name={`${formType}-onboarding`}
		method="post"
		in:fly={{ y: 15, duration: 700, delay: 400 }}
		out:fly={{ y: 15, duration: 300 }}
	>
		<!-- Hidden values used in API Call, no Longer relevant -->
		<!-- <input type="hidden" name="u" value="12870b8567f2fb8368e29d083" />
		<input type="hidden" name="id" value="ad52c8dd36" /> -->
		{#if formType == 'member'}
			<div style="grid-area: title">
				<h3>Tell Us About Yourself</h3>
			</div>
			<div style="grid-area: name">
				<TextField name="Name" autocomplete="given-name" label="First Name" required />
			</div>
			<div style="grid-area: lastname">
				<TextField name="Last name" autocomplete="given-name" label="Last Name" required />
			</div>
			<div style="grid-area: email">
				<TextField name="email" label="Email" autocomplete="email" type="email" required />
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
				<TextField name="name" label="Organization Name" autocomplete="organization" required />
			</div>
			<div style="grid-area: email">
				<TextField name="email" label="Email" type="email" autocomplete="email" required />
			</div>

			<div class="reason">
				<span style="margin-left:5px">Message</span>
				<textarea name="reason" required />
			</div>
			<div style="grid-area: submit">
				<input type="submit" value="Propose Project 🧠" />
			</div>
		{:else}
			<div style="grid-area: title">
				<h3>Share Your Knowledge</h3>
			</div>
			<div style="grid-area: name">
				<TextField name="name" autocomplete="given-name" label="Name" required />
			</div>
			<div style="grid-area: email">
				<TextField name="email" autocomplete="email" label="Email" type="email" required />
			</div>

			<div style="grid-area: topic">
				<TextField name="topic" label="Topic" type="text" required />
			</div>

			<div class="reason">
				<span style="margin-left:5px">Description</span>
				<textarea name="description" required />
			</div>
			<div style="grid-area: submit">
				<input type="submit" value="Pitch Workshop 🔨" />
			</div>
		{/if}
	</form>
{/key}

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
		grid-template-areas: 
			'title title' 
			'name reason' 
			'email reason' 
			'lastname reason'  
			'submit submit' ;

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

		&.member {
			grid-template-rows: repeat(5, auto);
			grid-template-areas: 
				'title title' 
				'name reason'
				'lastname reason' 
				'email reason' 
				'topic reason' 
				'submit submit';
				
				@include viewport(small) {
				grid-template-rows: repeat(6, auto);
				grid-template-columns: 1fr;
				grid-template-areas: 'title ' 'name' 'lastname' 'email' 'topic' 'reason' 'submit';
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
