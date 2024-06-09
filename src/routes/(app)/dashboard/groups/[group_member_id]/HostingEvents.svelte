<script lang="ts">
	import EventCard from '$lib/components/EventCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let { session, hostingEvents } = data;
</script>

<ul class="flex flex-col gap-6">
	{#each hostingEvents as event}
		<li class="flex-1 flex">
			<EventCard {session} {event} />
		</li>
	{/each}
</ul>
