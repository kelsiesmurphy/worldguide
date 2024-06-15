<script lang="ts">
	import CurrentPlan from './CurrentPlan.svelte';
	import AccountDetails from './AccountDetails.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import SubscribeButton from './SubscribeButton.svelte';

	export let data;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Settings</h3>
		<p class="text-sm text-muted-foreground">Change your account settings here.</p>
	</div>
	<Separator />
	<AccountDetails {data} />
	<SubscribeButton {data}/>
	<CurrentPlan {data} />
</div>
