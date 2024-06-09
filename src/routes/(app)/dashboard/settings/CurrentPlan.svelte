<script lang="ts">
	import { postData } from '$lib/utils/helpers';
	import { Button } from '$lib/components/ui/button';

	export let data;
	let { subscription } = data;

	let loading = false;

	const subscriptionPrice =
		subscription &&
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: subscription?.prices?.currency!,
			minimumFractionDigits: 0
		}).format((subscription?.prices?.unit_amount || 0) / 100);

	const redirectToCustomerPortal = async () => {
		loading = true;
		try {
			const { url } = await postData({
				url: '/api/create-portal-link'
			});
			window.location = url;
		} catch (error) {
			if (error) return alert((error as Error).message);
		} finally {
			loading = false;
		}
	};

	const interval = subscription?.prices?.interval;
</script>

<div class="flex flex-row items-center justify-between rounded-lg border p-4">
	<h1 class="">Current plan:</h1>
	<div class="p-4">
		{subscription
			? `You are currently on the ${subscription?.prices?.products?.name} plan.`
			: 'You are not currently subscribed to any plan.'}
	</div>
	<div class="">
		{#if subscription}
			{subscriptionPrice} / {interval}
		{:else}
			<a href="/">Choose your plan</a>
		{/if}
	</div>
	<Button class="" on:click={redirectToCustomerPortal}>
		{loading == false ? 'Open customer portal' : 'loading customer portal...'}
	</Button>
</div>
