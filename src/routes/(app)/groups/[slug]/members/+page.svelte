<script lang="ts">
	import MemberCard from "$lib/components/MemberCard.svelte";
	
	export let data;
    $: ({ group, groupMembers } = data);

	console.log(data)
</script>

<svelte:head>
	<title>{group.name} Members | Community Spot</title>
</svelte:head>

<h2 class="text-xl font-medium">Group Members</h2>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
	{#each groupMembers as member}
		<MemberCard {member} />
	{/each}
</div>
