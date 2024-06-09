<script lang="ts">
	import type { PageData } from './$types';
	import { Separator } from '$lib/components/ui/separator';
	import Tabs from './Tabs.svelte';

	export let data: PageData;
	let { group, session, supabase } = data;
</script>

<h1>{group.name}</h1>
<p>{group.description}</p>
<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Events</h3>
		<p class="text-sm text-muted-foreground">Manage your events, and create future events.</p>
	</div>
	<Separator />
	<Tabs {data} />
</div>
