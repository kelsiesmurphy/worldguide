<script lang="ts">
	import { getJoinDate } from "$lib/utils/helpers";

    export let data;
    $: ({ country } = data);

</script>

<svelte:head>
	<title>About {country.name} | Community Spot</title>
</svelte:head>

<div class="space-y-4">
    <h2 class="text-xl font-medium">About {country.name}</h2>
    <div class="space-y-4 text-md text-muted-foreground">
        <p>Running since {getJoinDate(country.created)}</p>
    </div>
</div>