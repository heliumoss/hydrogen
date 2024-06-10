<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		setTimeout(() => {
			goto('/home');
		}, 2500);
	});
</script>

<div class="flex h-screen w-screen items-center justify-center">
	<img src="/logo.png" alt="Hydrogen Logo" class="w-24 animate-spin" />
</div>
