<script lang="ts">
	import ContinentTab from './ContinentTab.svelte';
	import * as Carousel from "$lib/components/ui/carousel/index.js";
	import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";

	import { cn } from '$lib/utils';
	import { page } from '$app/stores';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	let className: string | undefined | null = undefined;
	export let continents;
	export { className as class };

	const continentsSorted = continents.sort((a, b) => (a.name === 'All' ? -1 : b.name === 'All' ? 1 : 0));

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	}); 

	let api: CarouselAPI;
	let count = 0;
	let current = 0;
	
	$: if (api) {
		count = api.scrollSnapList().length;
		current = api.selectedScrollSnap() + 1;
		api.on("select", () => {
		current = api.selectedScrollSnap() + 1;
		});
	}
</script>

<Carousel.Root
	opts={{
		skipSnaps: true,
	}}
	bind:api
	class={`cursor-grab mx-12 lg:mx-0`}
>
	<Carousel.Content class={cn('flex gap-4 p-1', className)}>
		{#each continentsSorted as continent (continent.name)}
			<Carousel.Item class="basis-1/8">
				{@const isActive = ($page.params.slug === continent.slug) || (continent.name === "All" && $page.params.slug === undefined)}
				<ContinentTab {continent} {isActive} {send} {receive} />
			</Carousel.Item>	
		{/each}
	</Carousel.Content>
	<div class="lg:hidden">
		<Carousel.Previous />
		<Carousel.Next />
	</div>
</Carousel.Root>