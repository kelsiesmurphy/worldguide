<script lang="ts">
	import GroupCard from './(components)/GroupCard.svelte';
	import type { PageData } from './$types';
	import Hero from './(components)/Hero.svelte';
	import ScrollCategories from './(components)/ScrollCategories.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus, FolderX } from "lucide-svelte"

	export let data: PageData;
	let { session, groups, categories } = data;
	$: ({ session, groups } = data);
	
</script>

<svelte:head>
	<title>CommunitySpot</title>
</svelte:head>

<section class="container space-y-12 sm:p-8">
	<Hero />
	<ScrollCategories {categories} />
	<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
		{#each groups ?? [] as group}
			<li class="flex">
				<GroupCard {group} />
			</li>
		{/each}
	</ul>
	{#if groups?.length === 0}
		<div class="flex-1 min-h-64 flex justify-center py-4">
			<div class="text-center space-y-6">
				<FolderX class="h-10 w-10 m-auto text-muted-foreground"/>
				<div>
					<h3 class="font-medium">No Groups Found</h3>
					<p class=" text-muted-foreground">Would you like to create one?</p>
				</div>
				<Button><Plus class="mr-2 h-4 w-4" />Create a group</Button>
			</div>
		</div>
	{/if}
</section>
