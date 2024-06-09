<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let { memberGroups } = data;
</script>

<ul class="flex flex-col gap-6">
	{#each memberGroups as group}
		<li class="flex-1 flex">
			<a href={`/dashboard/groups/${group.group_members[0].id}`}>{group.name}</a>
		</li>
	{/each}
</ul>
