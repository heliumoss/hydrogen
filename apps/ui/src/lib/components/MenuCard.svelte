<script lang="ts">
	import { strToColor } from '$lib/utils';
	import type { SvelteComponent } from 'svelte';

	export let icon: any | null = null;
	export let image: string | null = null;
	export let title: string;
	export let subtitle: string;
</script>

<div
	class="flex h-full w-[250px] min-w-[250px] flex-col items-start justify-center gap-3 overflow-x-hidden"
>
	{#if icon}
		<div
			class="flex aspect-square w-full items-center justify-center rounded-md"
			style={`background-color: ${strToColor(icon.name)}`}
		>
			<svelte:component this={icon} size={86} />
		</div>
	{:else if image}
		<img src={image} alt="album art" class="aspect-square w-full rounded-md" />
	{/if}
	<div class="flex flex-col overflow-x-hidden">
		<span class="truncate text-3xl">{title}</span>
		<span>{subtitle}</span>
	</div>
</div>
