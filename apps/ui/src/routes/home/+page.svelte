<script lang="ts">
	import MenuCard from '$lib/components/MenuCard.svelte';
	import { Cog, Home, Unplug, Wifi, WifiOff } from 'lucide-svelte';
</script>

<div class="flex h-[10%] w-screen flex-row items-center justify-between gap-5 px-6">
	<div class="flex flex-row items-center gap-2">
		<Home />
	</div>

	<div class="flex flex-row items-center gap-4">
		<div class="flex flex-row items-center gap-2">
			<WifiOff />
			<span>Disconnected</span>
		</div>
	</div>
</div>

<div
	class="min-w-screen flex h-[80%] flex-row items-center justify-between gap-5 overflow-x-scroll px-6"
>
	<MenuCard image={'/placeholder4/album-art.png'} title="Dirt" subtitle="Club Casualties" />
	<MenuCard
		image={'/placeholder3/album-art.png'}
		title="this might be our last december"
		subtitle="poptropicaslutz!, 8485"
	/>
	<MenuCard image={'/placeholder2/album-art.png'} title="movinglikeazombie" subtitle="ericdoa" />
	<MenuCard image={'/placeholder/album-art.png'} title="motions" subtitle="monty.pk" />
	<MenuCard icon={Wifi} title="Connect" subtitle="Connect to an agent" />
	<MenuCard icon={Cog} title="Settings" subtitle="Configure your Car Thing" />
</div>

<div class="h-[5%] w-screen flex-row items-center justify-between gap-5 px-6">
	<div class="flex flex-row items-center gap-2">
		<img src="/logo.png" alt="hydrogen logo" class="h-4 w-4" />
		<span class="text-sm">hydrogen.run</span>
	</div>
</div>
