<script lang="ts">
	import { getJoinDate } from "$lib/utils/helpers";
	import SocialCard from "./SocialCard.svelte";

    export let data;
    $: ({ groupSocials, group, events, groupMembers } = data);

</script>

<svelte:head>
	<title>About {group.name} | Community Spot</title>
</svelte:head>

<div class="space-y-4">
    <h2 class="text-xl font-medium">Say hello 👋</h2>
    <div class="space-y-4 text-md text-muted-foreground">  
        <p>{groupMembers?.length} members</p>
        <p>{events?.length} Events</p>
        <p>Running since {getJoinDate(group.created)}</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {#each groupSocials as groupSocial}
            <SocialCard {groupSocial} />
        {/each}
    </div>
</div>