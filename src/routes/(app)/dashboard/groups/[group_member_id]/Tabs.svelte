<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';
	import { PlusCircle } from 'lucide-svelte';
	import AttendingEvents from './AttendingEvents.svelte';
	import HostingEvents from './HostingEvents.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Tabs.Root value="attending" class="space-y-6">
	<div class="space-between flex items-center">
		<Tabs.List>
			<Tabs.Trigger value="attending" class="relative">Attending</Tabs.Trigger>
			<Tabs.Trigger value="hosting">Hosting</Tabs.Trigger>
		</Tabs.List>
		<div class="ml-auto mr-4">
			<Button href={`/dashboard/groups/${data.group.id}/events/new`}>
				<PlusCircle class="mr-2 h-4 w-4" />
				Create Event
			</Button>
		</div>
	</div>
	<Tabs.Content value="attending" class="border-none p-0 outline-none">
		<AttendingEvents {data} />
	</Tabs.Content>
	<Tabs.Content value="hosting" class="h-full flex-col border-none p-0 data-[state=active]:flex">
		<HostingEvents {data} />
	</Tabs.Content>
</Tabs.Root>
