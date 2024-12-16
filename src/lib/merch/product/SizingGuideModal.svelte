<!-- sizing guide pop up modal -->
<script>
	let shown = false;
	export function show() {
		shown = true;
		lockScroll();
	}
	export function hide() {
		shown = false;
		unlockScroll();
	}

	// disabling background scroll
	function lockScroll() {
		document.body.style.overflow = 'hidden';
	}

	// enabling background scroll
	function unlockScroll() {
		document.body.style.overflow = '';
	}
</script>

<!-- closes modal if esc key is pressed -->
<svelte:window
	on:keydown={(e) => {
		if (e.code === 'Escape') {
			hide();
		}
	}}
/>
{#if shown}
	<div class="modal-wrapper">
		<div class="modal">
			<span class="close" on:click={() => hide()}> &times;</span>
			<slot />
		</div>
	</div>
{/if}

<style>
	.modal-wrapper {
		background-color: rgba(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.6);
		position: fixed;
		width: 100%;
		height: 200vh;
		top: 0;
		left: 0;
		z-index: 200;
		overflow: hidden;
	}
	.modal {
		background-color: white;
		max-width: 80vw;
		max-height: 500px;
		overflow-y: auto;
		padding: 2rem;
		margin: 15% auto;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
	}
	.close {
		float: right;
		cursor: pointer;
	}
	.close:hover {
		font-weight: bold;
	}
</style>
