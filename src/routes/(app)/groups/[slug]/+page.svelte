<script lang="ts">
	import EventCard from "$lib/components/EventCard.svelte";

    export let data;
    $: ({ events, group, session } = data);
</script>

<svelte:head>
	<title>{group.name} Events | Community Spot</title>
</svelte:head>

<div class="space-y-4">
    <h2 class="text-xl font-medium">Upcoming Events</h2>
    {#each events ?? [] as event}
        <li class="flex justify-center">
            <div class="flex-1 flex">
                <EventCard {session} {event} />
            </div>
        </li>
    {/each}
</div>