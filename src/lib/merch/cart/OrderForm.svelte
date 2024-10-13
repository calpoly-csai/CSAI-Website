<!-- order form (name, email, info abt payment) in final checkout page-->
<script>
	import { createEventDispatcher } from 'svelte';
	let first = '';
	let last = '';
	let email = '';
	let firstNameError = '';
	let lastNameError = '';
	let emailError = '';

	// flags to track focus state (when error needs to be displayed)
	let firstFocused = false;
	let lastFocused = false;
	let emailFocused = false;

	//event dispatcher for sending name + email to parent component
	const dispatch = createEventDispatcher();

	function validateEmail(email) {
		const calpolyEmailRegex = /^[a-zA-Z0-9]+@calpoly\.edu$/;
		return calpolyEmailRegex.test(email);
	}

	function validateField(fieldVal, type = '') {
		if (fieldVal.length === 0) {
			return 'This field is required.';
		}

		if (type === 'email' && !validateEmail(fieldVal)) {
			return 'Please enter a valid Cal Poly email.';
		}
		// no errors
		return '';
	}

	// reactive error messages
	$: firstNameError = firstFocused ? validateField(first) : '';
	$: lastNameError = lastFocused ? validateField(last) : '';
	$: emailError = emailFocused ? validateField(email, 'email') : '';

	// handle blur event to mark field as focused
	function handleBlur(field) {
		if (field === 'first') firstFocused = true;
		if (field === 'last') lastFocused = true;
		if (field === 'email') emailFocused = true;
	}

	export function getUserData() {
		// validating fields on submit
		const firstNameError = validateField(first);
		const lastNameError = validateField(last);
		const emailError = validateField(email, 'email');
		
		// returns info if validated, otherwise null
		if (!firstNameError && !lastNameError && !emailError) {
			return{first, last, email};
		} else {
			firstFocused = true;
			lastFocused = true;
			emailFocused = true;
			return null; 
		}
	}
	
</script>

<div class="form-section">
	<h3>ORDER INFORMATION</h3>
	<form>
		<div class="input-group">
			<label for="firstName">First Name</label>
			<input
				type="text"
				id="firstName"
				bind:value={first}
				on:blur={() => handleBlur('first')}
				required
			/>
			{#if firstNameError}
				<p class="error">{firstNameError}</p>
			{/if}
		</div>
		<div class="input-group">
			<label for="lastName">Last Name</label>
			<input
				type="text"
				id="lastName"
				bind:value={last}
				on:blur={() => handleBlur('last')}
				required
			/>
			{#if lastNameError}
				<p class="error">{lastNameError}</p>
			{/if}
		</div>
		<div class="input-group">
			<label for="email">Cal Poly Email</label>
			<input
				type="email"
				id="email"
				bind:value={email}
				on:blur={() => handleBlur('email')}
				required
			/>
			{#if emailError}
				<p class="error">{emailError}</p>
			{/if}
		</div>
	</form>

	<div class="member-info">
		<h5>CSAI DONATIONS</h5>
		<p>
			Thank you for supporting CS+AI! To recieve your order, please contact Thomas Spieler on the
			discord as @Thomas, via email at tmspiele@calpoly.edu, or at our next meeting! We look forward
			to seeing you! Don't forget that if you make a donation of $5 or more, you qualify for donor
			benefits, including $5 off one merch order! Contact Leo Horwitz on the discord with the amount
			you'd like to donate if you're interested!
		</p>
	</div>
</div>

<style>
	@import '../../../scss/global.scss';
	@import '../../../scss/utils.scss';
	/* form  */
	.form-section {
		flex: 1;
		margin-left: 20px;
		font-family: 'Inter', sans-serif;
	}

	.input-group {
		max-width: 500px;
		width: 100%;
		margin-bottom: 15px;
	}
	input:focus {
		border-color: rgb(6, 61, 119);
		outline: none;
	}

	label {
		display: block;
		color: rgb(4, 37, 66);
		margin-bottom: 5px;
	}

	input {
		width: 100%;
		padding: 8px;
		margin-bottom: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	/* member info */
	.member-info {
		max-width: 500px;
		width: 100%;
		margin-top: 30px;
		border-color: rgb(90, 26, 153);
		border-style: groove;
		padding: 20px;
		background-color: rgb(223, 193, 252);
	}

	.member-info h5 {
		color: rgb(89, 25, 162);
	}
</style>
