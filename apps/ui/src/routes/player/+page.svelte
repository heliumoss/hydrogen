<script lang="ts">
	import { FastAverageColor } from 'fast-average-color';
	import { onMount } from 'svelte';
	import { Play, SkipBack, SkipForward, Shuffle, Repeat, Album } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';
	import { resizeText } from '$lib/utils';

	let backgroundImg: HTMLImageElement;
	let title: HTMLElement;
	let darkText = false;

	// const song = {
	// 	name: 'motions',
	// 	artist: 'monty.pk',
	// 	album: 'motions',
	// 	cover: '/placeholder/album-art.png'
	// };

	// const song = {
	// 	name: 'movinglikeazombie',
	// 	artist: 'ericdoa',
	// 	album: "hi, i'm dante",
	// 	cover: '/placeholder2/album-art.png'
	// };

	// const song = {
	// 	name: 'this might be our last december',
	// 	artist: 'poptropicaslutz!, 8485',
	// 	album: 'just in case the world ends',
	// 	cover: '/placeholder3/album-art.png'
	// };

	const song = {
		name: 'Dirt',
		artist: 'Club Casualties',
		album: 'Bridge Underwater',
		cover: '/placeholder4/album-art.png'
	};

	onMount(async () => {
		const fac = new FastAverageColor();
		const avg = await fac.getColorAsync(backgroundImg);
		darkText = avg.isLight;

		setTimeout(() => {
			resizeText({
				element: title,
				step: 2,
				maxSize: 72
			});
		}, 500);
	});

	const onWheel = (e: WheelEvent) => {
		if (e.deltaX > 0) {
			console.log('turned right');
		} else {
			console.log('turned left');
		}
	};
</script>

<svelte:window on:mousewheel={onWheel} />

<div class="h-[75%]" transition:fade>
	<img
		src={song.cover}
		alt="blur"
		class="max-w-screen absolute -z-10 h-screen max-h-screen w-screen blur-3xl brightness-50"
		bind:this={backgroundImg}
	/>
	<div class="flex h-full w-full flex-row gap-8 p-12">
		<img src={song.cover} alt="album art" class="aspect-square h-full rounded-md" />
		{#key song.name}
			<div class="flex h-full max-h-full w-full flex-col gap-4">
				<span class="text-2xl">{song.album}</span>
				<p
					class="text-4xl font-bold leading-[1.1]"
					style="word-break:break-word;"
					bind:this={title}
					transition:slide
				>
					{song.name}
				</p>
				<p class="text-3xl font-semibold" style="word-break:break-word;">{song.artist}</p>
			</div>
		{/key}
	</div>
</div>
<div
	class="relative flex h-[25%] flex-row items-center justify-evenly gap-12 bg-neutral-900 bg-opacity-75"
>
	<div class="absolute left-0 top-0 h-1 w-[50%] rounded-r-full bg-white"></div>
	<button class="p-4">
		<Shuffle size={48} />
	</button>
	<button class="p-4">
		<SkipBack size={48} />
	</button>
	<button class="p-4">
		<Play size={48} />
	</button>
	<button class="p-4">
		<SkipForward size={48} />
	</button>
	<button class="p-4">
		<Repeat size={48} />
	</button>
</div>
