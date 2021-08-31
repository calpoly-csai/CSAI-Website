<script lang="ts">
	import InvolvementForm from './InvolvementForm.svelte';
	type FormType = 'speaker' | 'member' | 'partner';
	const choices: { title: string; formType: FormType }[] = [
		{ title: 'Host a Workshop', formType: 'speaker' },
		{ title: 'Become a Member', formType: 'member' },
		{ title: 'Partner with Us', formType: 'partner' }
	];
	let formIndex = 1;
	$: activeFormInfo = choices[formIndex];
</script>

<section class="GetInvolved" id="get-involved">
	<header>
		<h2>Get Involved</h2>
		<h3 class="subtitle">There are many ways to participate</h3>
	</header>
	<div class="content">
		<nav class="involvement-nav">
			<div
				class="active-slider"
				style="transform: translateX({formIndex * 100}%); width: {(1 / choices.length) * 100}%;"
			/>
			{#each choices as { title }, i}
				<button
					class="wrapper menu-item"
					on:click={() => (formIndex = i)}
					style="color: {i === formIndex ? `white` : `initial`};">{title}</button
				>
			{/each}
		</nav>

		<article class="cta-form">
			<InvolvementForm formType={activeFormInfo.formType} />
		</article>
	</div>
</section>

<style lang="scss">
	@import '../../../scss/utils.scss';
	.GetInvolved {
		background-color: var(--color-background-dark);
		color: white;
		text-align: center;
		padding-bottom: 130px;
		overflow: hidden;
	}

	.content {
		max-width: 700px;
		margin: auto;
	}

	header {
		margin-top: 50px;
	}

	h2 {
		margin: 0;
	}

	.subtitle {
		font-weight: normal;
	}

	.involvement-nav {
		display: flex;
		justify-content: space-around;
		width: 100%;
		position: relative;
		padding: 15px 0;
		background-color: white;
		border-radius: 10px;
		margin: 40px 0;
		overflow: hidden;

		button {
			color: var(--color-text-dark);
			@include viewport(small) {
				width: 100px;
			}
		}
	}

	.active-slider {
		top: 0;
		left: 0;
		transition: transform 0.3s;
		position: absolute;
		height: 100%;
		background-color: var(--color-primary-variant);
	}

	.menu-item {
		transition: color 0.3s;
	}
</style>
