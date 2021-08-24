interface ScrollCallback {
	(p: number): void;
}

export default function scrollTrackable(node: Element, callback: ScrollCallback) {
	let bounds: [number, number] = [0, 1];
	let scrollPos = 0;
	let waitingForRAF = false;
	let cb = { current: callback };
	let callbackWrapper = (e: Event) => {
		scrollPos = window.scrollY;
		if (!waitingForRAF) {
			window.requestAnimationFrame(() => {
				waitingForRAF = false;
				let p = (scrollPos - bounds[0]) / (bounds[1] - bounds[0]);
				cb.current(p);
			});

			waitingForRAF = true;
		}
	};
	let observer: IntersectionObserver;

	init();

	function init() {
		observer = new IntersectionObserver(
			(entities) => {
				if (entities[0].isIntersecting) {
					const { top, bottom } = entities[0].boundingClientRect;
					bounds = [top + window.scrollY - innerHeight, bottom + window.scrollY];
					window.addEventListener('scroll', callbackWrapper, { passive: true });
				} else {
					window.removeEventListener('scroll', callbackWrapper);
				}
			},
			{ threshold: 0.01 }
		);
		observer.observe(node);
	}

	function destroy() {
		window.removeEventListener('scroll', callbackWrapper);
		observer.disconnect();
	}

	window.addEventListener('scroll', callbackWrapper, { passive: true });

	return {
		update(callback: ScrollCallback) {
			cb.current = callback;
		},
		destroy
	};
}
