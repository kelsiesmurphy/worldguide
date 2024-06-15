<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { getStripe } from '$lib/stripe/stripe-client';
	import { postData } from '$lib/utils/helpers';
	import type { Session } from '@supabase/supabase-js';

	export let data;
    $: ({ products, subscription, session } = data);

	function showPriceString(product) {
		const price = product?.prices?.find(
			(price) => price.interval === "year"
		);
		if (!price) return null;

		const priceString = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: price.currency!,
			minimumFractionDigits: 0
		}).format((price?.unit_amount || 0) / 100);
		return priceString;
	}

	const handleCheckout = async (product) => {
		const price = product?.prices?.find(
			(price) => price.interval === "year"
		);
		if (!price) return null;

		if (!session) {
			goto('/signin');
		}
		if (subscription) {
			goto('/dashboard');
		}
		try {
			const { sessionId } = await postData({
				url: '/api/stripe-checkout',
				data: { price }
			});
			const stripe = await getStripe();
			stripe?.redirectToCheckout({ sessionId });
		} catch (error) {
			return alert((error as Error)?.message);
		}
	};
</script>


	<div class="flex flex-col items-center">
		<div class="w-full flex-1">
			<div class="flex gap-4 flex-wrap">
				{#each products as product}
					<Card.Root class="flex-1">
						<Card.Header>
							<Card.Title>{product.name}</Card.Title>
						</Card.Header>
						<Card.Content class="flex flex-col space-y-2">
							<span class="font-extrabold white text-3xl mb-2">
								{showPriceString(product)}
								<span class="text-base font-medium text-zinc-600 capitalize">
									/ year</span
								>
							</span>
						</Card.Content>
						<Card.Footer>
							{#if subscription}
								<Button class="btn variant-filled-primary" href="/dashboard/settings"
									>Manage subscription</Button
								>
							{:else}
								<Button
									on:click={() => handleCheckout(product)}
									class="btn variant-filled-primary"
									disabled={session ? false : true}
								>
									Subscribe
								</Button>
							{/if}
						</Card.Footer>
					</Card.Root>
				{/each}
			</div>
		</div>
	</div>
