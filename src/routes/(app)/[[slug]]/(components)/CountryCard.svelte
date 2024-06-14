<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { goto } from '$app/navigation';

	export let country;
</script>

<button
	on:click={() => goto(`/countries/${country.slug}`)}
	class="flex-1 flex rounded-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
>
	<Card.Root class="flex-1 border-none rounded-none h-full flex flex-col gap-2 text-left shadow-none bg-transparent hover:-translate-y-1 duration-300 transition-all">
		<Card.Header class="flex items-center">
			<img src={country?.image} alt={`Cover image for ${country.name}`} class="rounded-md" />
			</Card.Header>
			<Card.Content class="flex-1 space-y-2">
				<Card.Description class="font-semibold text-xs text-primary">{country.description}</Card.Description>
				<Card.Title>{country.name}</Card.Title>
		</Card.Content>
	</Card.Root>
</button>
