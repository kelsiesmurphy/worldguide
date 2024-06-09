<script lang="ts">
	import MemberCard from "$lib/components/MemberCard.svelte";

	// Can delete when finished with mocking
	function generateRandomArray() {
		const length = Math.floor(Math.random() * 10) + 1; // Random length from 1 to 10
        const array = [];
        for (let i = 0; i < length; i++) {
			array.push(Math.floor(Math.random() * 10) + 1); // Random number from 1 to 10
        }
        return array;
    }
	
	// export let groupMembers;
	const groupMembers = generateRandomArray()

	export let data;
    $: ({ group } = data);
</script>

<h2 class="text-xl font-medium">Attendees</h2>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
	{#each groupMembers as member}
		<MemberCard {member} />
	{/each}
</div>
