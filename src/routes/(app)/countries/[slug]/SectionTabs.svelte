<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import SectionTab from './SectionTab.svelte';

	import { cn } from '$lib/utils';
	import { page } from '$app/stores';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	let className: string | undefined | null = undefined;
	
	const sections = [
		{
			name: "Events",
			slug: `countries/${$page.params.slug}`,
			route_id: "/(app)/countries/[slug]"
		},
		{
			name: "About us",
			slug: `countries/${$page.params.slug}/about-us`,
			route_id: "/(app)/countries/[slug]/about-us"
		},
	]

	export { className as class };

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});
</script>
	
<ScrollArea type="scroll" orientation="horizontal" class="scroll-smooth overflow-x-auto">
	<div class={cn('flex gap-8 p-4 pr-16 justify-center', className)}>
		{#each sections as section (section.name)}
			{@const isActive = $page.route.id === section.route_id}
			<SectionTab {section} {isActive} {send} {receive} />
		{/each}
	</div>
	<div class="gradient-right"></div>
</ScrollArea>
