<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import CategoryTab from './CategoryTab.svelte';

	import { cn } from '$lib/utils';
	import { page } from '$app/stores';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	let className: string | undefined | null = undefined;
	export let categories;
	export { className as class };

	const categoriesSorted = categories.sort((a, b) => (a.name === 'Miscellaneous' ? 1 : b.name === 'Miscellaneous' ? -1 : 0));

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	}); 
</script>
	
<ScrollArea type="scroll" orientation="horizontal" class="scroll-smooth overflow-x-auto">
	<div class={cn('flex gap-8 p-4 pr-16', className)}>
		{#each categoriesSorted as category (category.name)}
			{@const isActive = ($page.params.slug === category.slug) || (category.name === "All Categories" && $page.params.slug === undefined)}
			<CategoryTab {category} {isActive} {send} {receive} />
		{/each}
	</div>
	<div class="gradient-right"></div>
</ScrollArea>
