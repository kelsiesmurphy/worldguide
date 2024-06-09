<script>
	import { Separator } from '$lib/components/ui/separator';
	import Tabs from './Tabs.svelte';

	export let data;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Groups</h3>
		<p class="text-sm text-muted-foreground">
			Manage any groups you are a member of, or create your own!
		</p>
	</div>
	<Separator />
	<Tabs {data} />
</div>
