<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';
	import { PlusCircle } from 'lucide-svelte';
	import MemberGroups from './MemberGroups.svelte';
	import AdminGroups from './AdminGroups.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Tabs.Root value="member" class="space-y-6">
	<div class="space-between flex items-center">
		<Tabs.List>
			<Tabs.Trigger value="member" class="relative">Member</Tabs.Trigger>
			<Tabs.Trigger value="admin">Admin</Tabs.Trigger>
		</Tabs.List>
		<div class="ml-auto mr-4">
			<Button href={`/dashboard/groups/new`}>
				<PlusCircle class="mr-2 h-4 w-4" />
				Create Group
			</Button>
		</div>
	</div>
	<Tabs.Content value="member" class="border-none p-0 outline-none">
		<MemberGroups {data} />
	</Tabs.Content>
	<Tabs.Content value="admin" class="h-full flex-col border-none p-0 data-[state=active]:flex"
		><AdminGroups {data} /></Tabs.Content
	>
</Tabs.Root>
