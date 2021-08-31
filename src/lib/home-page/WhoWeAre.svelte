<script lang="ts">
	import DotGrid from '$lib/DotGrid.svelte';
	import { mapRange } from '../../modules/utils';
	import scrollTrackable from '../../modules/scrollTrackable';
	let p = 0;
	$: textStyle = `
	opacity: ${mapRange(p, [0, 0.3], [0, 1], true)};
	transform: translateY(${mapRange(p, [0, 0.3], [100, 0], true)}px)
	`;
</script>

<section class="WhoWeAre" id="who-we-are">
	<div class="top-dots">
		<DotGrid rows={4} />
	</div>
	<div class="bottom-dots">
		<DotGrid rows={4} columns={15} />
	</div>
	<div class="text" use:scrollTrackable={(progress) => (p = progress)} style={textStyle}>
		<h2>Who We Are</h2>
		<p>
			A group of Cal Poly students inspired to use machine learning to solve problems and grow as a
			community. We believe that self driven learning and the pursuit of impactful solutions is the
			best way to grow as developers and people.
		</p>
	</div>
	<img class="illustration" src="/images/data-scientist.svg" alt="Data scientist" />
</section>

<style lang="scss">
	.WhoWeAre {
		background-color: var(--color-background-light);
		box-shadow: 0 0 40px #00000030;
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr 1fr;

		@media screen and (max-width: 800px) {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
		}
	}

	.text {
		align-self: center;
		justify-self: center;
		z-index: 5;
		will-change: transform;

		p {
			width: 340px;
		}
	}
	.illustration {
		align-self: center;
		justify-self: center;
		max-width: 50%;
		z-index: 5;
	}

	.top-dots,
	.bottom-dots {
		position: absolute;
	}

	.top-dots {
		top: 0;
		right: 0;
	}

	.bottom-dots {
		bottom: 0;
		left: 0;
	}
</style>
