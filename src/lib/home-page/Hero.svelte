<script>
	import scrollTrackable from '../../modules/scrollTrackable';
	let scrollP = 0;
</script>

<section class="Hero" id="hero" use:scrollTrackable={(progress) => (scrollP = progress)}>
	<div class="content">
		<div class="logo-frame">
			<img class="logo" src="/images/logo-white.png" alt="CSAI Logo" />
		</div>
		<h1 aria-label="CSAI">CS + AI</h1>
		<p class="club-descriptor">
			Computer Science and Artificial Intelligence Club <br />Cal Poly San Luis Obispo
		</p>
	</div>
</section>

<style lang="scss">
	@import '../../scss/utils.scss';

	.Hero {
		background:
			radial-gradient(circle at top, rgba(41, 146, 229, 0.18), transparent 45%),
			linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.82));
		min-height: 100vh;
	}

	.content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		flex-direction: column;
		max-width: 100%;
		max-height: 100%;
		background-color: rgba(255, 255, 255, 0.8);
	}

	h1 {
		margin: 0;
		margin-top: 15px;
	}

	$logo-size: 150px;
	.logo-frame {
		display: grid;
		place-items: center;
		width: $logo-size + 60px;
		height: $logo-size + 60px;
		border-radius: 50%;
		background-color: var(--color-primary-variant);

		.logo {
			height: $logo-size;
		}
	}

	.club-descriptor {
		padding: 0;
		margin: 0;
		text-align: center;
	}
</style>
