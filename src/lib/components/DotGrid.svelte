<script lang="ts">
	export let rows = 7;
	export let columns = 12;
	export let margin = 12;
	export let size = 5;
	export let color = 'var(--color-background-mid)';
	let dotList = Array(rows * columns);
</script>

<div
	class="DotGrid"
	aria-hidden="true"
	style="--columns:{columns};--rows:{rows};--size:{size}px;--margin:{margin}px; --color:{color}"
>
	{#each dotList as _}
		<div class="dot" />
	{/each}
</div>

<style>
	.DotGrid {
		display: grid;
		grid-template-rows: repeat(var(--rows), min-content);
		grid-template-columns: repeat(var(--columns), min-content);
	}
	.dot {
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
		margin: var(--margin);
		background-color: var(--color);
	}
</style>
