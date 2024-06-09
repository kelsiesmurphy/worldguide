<script lang="ts">
	import PricingTabs from './PricingTabs.svelte';

	import type { PageData } from '../pricing/$types';

	export let data: PageData;
	let { session, subscription, products } = data;
	$: ({ session } = data);
</script>

<h1 class="text-2xl font-medium text-center py-8">Pricing</h1>

<PricingTabs {products} {subscription} {session} />
