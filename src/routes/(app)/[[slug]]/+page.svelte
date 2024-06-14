<script lang="ts">
	import CountryCard from './(components)/CountryCard.svelte';
	import type { PageData } from './$types';
	import Hero from './(components)/Hero.svelte';
	import ScrollContinent from './(components)/ScrollContinent.svelte';
	import { FolderX } from "lucide-svelte"
	import SelectSortInput from './(components)/SelectSortInput.svelte';

	export let data: PageData;
	let { session, countries, continents } = data;
	$: ({ session, countries } = data);
	
</script>

<svelte:head>
	<title>WorldGuide</title>
</svelte:head>

<section class="container space-y-12 sm:p-8">
	<Hero />
	<div class="lg:flex justify-between items-center">
		<ScrollContinent {continents} />
		<SelectSortInput />
	</div>
	<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
		{#each countries ?? [] as country}
			<li class="flex">
				<CountryCard {country} />
			</li>
		{/each}
	</ul>
	{#if countries?.length === 0}
		<div class="flex-1 min-h-64 flex justify-center py-4">
			<div class="text-center space-y-6">
				<FolderX class="h-10 w-10 m-auto text-muted-foreground"/>
				<div>
					<h3 class="font-medium">No Countries Found</h3>
				</div>
			</div>
		</div>
	{/if}
</section>
