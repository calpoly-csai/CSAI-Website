<script lang="ts">
	import scrollTrackable from '../../modules/scrollTrackable';
	import { mapRange, randomlySelect } from '../../modules/utils';
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let circles: Circle[] = [];
	let p = spring(0, { damping: 0.5, stiffness: 0.03 });

	$: {
		ctx?.clearRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i < circles.length; i++) {
			circles[i].update($p);
			circles[i].draw(ctx);
		}
	}

	type Point = [number, number];
	class Circle {
		startPos: Point;
		position: Point;
		destination: Point;
		radius: number;
		color: string;
		constructor(startPos: Point, destination: Point, radius: number, color: string) {
			this.startPos = startPos;
			this.position = startPos;
			this.destination = destination;
			this.radius = radius;
			this.color = color;
		}
		draw(ctx: CanvasRenderingContext2D) {
			ctx.beginPath();
			ctx.arc(this.position[0], this.position[1], this.radius, 0, 2 * Math.PI);
			ctx.fillStyle = this.color;
			ctx.fill();
		}

		update(p: number) {
			let x = this.startPos[0] * (1 - p) + this.destination[0] * p;
			let y = this.startPos[1] * (1 - p) + this.destination[1] * p;
			this.position = [x, y];
		}
	}

	function initVisualization() {
		ctx = canvas.getContext('2d');
		let circleCount = 40;
		let colors = ['#2447a1', '#2992e5'];
		let randomMap = (range: [number, number]) => mapRange(Math.random(), [0, 1], range);

		for (let i = 0; i < circleCount; i++) {
			let color = randomlySelect(colors);
			let radius = randomMap([5, 40]);
			let position: Point = [randomMap([0, 1000]), randomMap([0, 1000])];
			let dest: Point = [randomMap([390, 630]), randomMap([400, 600])];
			circles.push(new Circle(position, dest, radius, color));
		}
	}
	onMount(initVisualization);
</script>

<section
	class="Meetings"
	use:scrollTrackable={(progress) => p.set(mapRange(progress, [0.1, 0.7], [0, 1], true))}
>
	<div class="meeting-info">
		<h2>Meetings</h2>
		<p class="meeting-time">Sundays 12:00 PM - 3:00 PM PST</p>
		<p class="meeting-description">
			Meetings are often held over Zoom or in the Bonderson Engineering Building on the Cal Poly
			Campus. During these sessions, project teams intermingle to learn new technologies and touch
			base on large architectural decisions.
		</p>
		<a
			href="https://calendar.google.com/calendar/embed?src=csaicalpoly%40gmail.com&ctz=America%2FLos_Angeles"
			target="_blank"
			class="wrapper"
		>
			<button class="calendar-button"> See Calendar</button>
		</a>
	</div>
	<div class="visualization">
		<img src="/images/logo.svg" alt="CSAI logo" />
		<canvas bind:this={canvas} width="1000" height="1000" />
	</div>
</section>

<style lang="scss">
	@import '../../scss/utils.scss';
	.Meetings {
		background-color: var(--color-background-light);
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr 1fr;
		justify-content: center;
		align-items: center;
		min-height: auto;

		@include viewport(small) {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
		}

		.meeting-info {
			align-self: center;
			justify-self: center;
			width: 340px;
		}

		.meeting-time {
			font-weight: bold;
		}

		.visualization {
			position: relative;
			width: 50vmin;
			height: 50vmin;

			@include viewport(small) {
				align-self: flex-start;
				justify-self: center;
				width: 80vmin;
				height: 80vmin;
			}

			img {
				width: 50%;
				position: absolute;
				top: 55%;
				left: 50%;
				transform: translate(-50%, -50%);
				opacity: 0.1;
			}
			canvas {
				width: 100%;
				height: 100%;
			}
		}
	}

	a.wrapper {
		width: 175px;
	}

	.calendar-button {
		margin-top: 10px;
	}
</style>
