<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { getStripe } from '$lib/stripe/stripe-client';
	import { postData } from '$lib/utils/helpers';
	import type { Session } from '@supabase/supabase-js';

	export let products, subscription, session: Session;

	const billingIntervals = [
		{ interval: 'month', title: 'Monthly' },
		{ interval: 'year', title: 'Yearly' }
	];

	function showPriceString(product, billingInterval) {
		const price = product?.prices?.find(
			(price) => price.interval === billingInterval.interval
		);
		if (!price) return null;

		const priceString = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: price.currency!,
			minimumFractionDigits: 0
		}).format((price?.unit_amount || 0) / 100);
		return priceString;
	}

	const handleCheckout = async (product, billingInterval) => {
		const price = product?.prices?.find(
			(price) => price.interval === billingInterval.interval
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
				data: { price, group_id: "" }
			});
			const stripe = await getStripe();
			stripe?.redirectToCheckout({ sessionId });
		} catch (error) {
			return alert((error as Error)?.message);
		}
	};
</script>

<Tabs.Root value="month">
	<div class="flex flex-col items-center">
		<div class="w-full flex-1 max-w-sm">
			<Tabs.List class="grid grid-cols-2">
				{#each billingIntervals as billingInterval}
					<Tabs.Trigger value={billingInterval.interval}>{billingInterval.title}</Tabs.Trigger>
				{/each}
			</Tabs.List>
		</div>

		<div class="w-full flex-1 max-w-3xl">
			{#each billingIntervals as billingInterval}
				<Tabs.Content value={billingInterval.interval}>
					<div class="flex gap-4 flex-wrap">
						{#each products as product}
							<Card.Root class="flex-1">
								<Card.Header>
									<Card.Title>{product.name}</Card.Title>
									<Card.Description>
										{product.description}
									</Card.Description>
								</Card.Header>
								<Card.Content class="flex flex-col space-y-2">
									<span class="font-extrabold white text-3xl mb-2">
										{showPriceString(product, billingInterval)}
										<span class="text-base font-medium text-zinc-600 capitalize">
											/ {billingInterval.interval}</span
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
											on:click={() => handleCheckout(product, billingInterval)}
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
				</Tabs.Content>
			{/each}
		</div>
	</div>
</Tabs.Root>
