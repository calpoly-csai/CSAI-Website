<script lang="ts">
	export let type: 'text' | 'password' | 'email' = 'text';
	export let label: string;
	export let name: string = '';
	export let placeholder: string = '';
	export let autocomplete: HTMLInputElement['autocomplete'] = '';
	export let style: string = '';
	export let required = false;
</script>

<label {style}>
	<span class="name">{label}</span>
	<input {type} {name} {placeholder} {required} {autocomplete} />
</label>

<style>
	label {
		display: block;
		width: var(--width, 100%);
	}
	.name {
		display: block;
		text-align: left;
		color: var(--color-text-dark);
		margin-left: 5px;
		margin-bottom: 5px;
	}

	input {
		width: 100%;
		min-width: 200px;
	}
</style>
