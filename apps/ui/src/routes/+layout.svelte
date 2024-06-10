<script lang="ts">
	import '@fontsource/geist-sans';
	import '../app.css';
	import { goto } from '$app/navigation';

	const pressDelta = 250;
	let lastPressTime = 0;
	let pressCount = 0;
	let pressTimeout: NodeJS.Timeout | null;
	let lastKeyPress: string;

	const handleSinglePress = (key: string) => {
		if (key === 'Escape') {
			history.back();
		}
		console.log('single press', key);
	};

	const handleDoublePress = (key: string) => {
		if (key === 'Escape') {
			goto('/player');
		}
		console.log('double press', key);
	};

	const onKeyDown = (e: KeyboardEvent) => {
		const currentKey = e.key;
		const currentTime = Date.now();

		if (currentKey === lastKeyPress && currentTime - lastPressTime < pressDelta) {
			pressCount++;
			if (pressTimeout) {
				clearTimeout(pressTimeout);
				pressTimeout = null;
			}
		} else {
			pressCount = 1;
		}

		switch (pressCount) {
			case 1:
				pressTimeout = setTimeout(() => {
					handleSinglePress(currentKey);
				}, pressDelta);
				break;
			case 2:
				handleDoublePress(currentKey);
				break;
			default:
				break;
		}

		lastKeyPress = currentKey;
		lastPressTime = currentTime;
	};
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="h-screen w-screen">
	<slot></slot>
</div>
