<script lang="ts">
	import EventCard from "$lib/components/EventCard.svelte";

    export let data;
    $: ({ country, session } = data);
</script>

<svelte:head>
	<title>{country.name} Events | Community Spot</title>
</svelte:head>

<div class="space-y-4">
    <h2 class="text-xl font-medium">Upcoming Events</h2>
</div>