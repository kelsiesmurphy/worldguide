<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import SidebarNav from './(components)/sidebar-nav.svelte';

	const sidebarNavItems = [
		{
			title: 'Groups',
			href: '/dashboard'
		},
		{
			title: 'Profile',
			href: '/dashboard/profile'
		},
		{
			title: 'Settings',
			href: '/dashboard/settings'
		},
		{
			title: 'Notifications',
			href: '/dashboard/notifications'
		},
		{
			title: 'Support',
			href: '/dashboard/support'
		},
	];
</script>

<div class="space-y-6 container p-8 ">
	<div class="space-y-0.5">
		<h2 class="text-2xl font-bold tracking-tight">Dashboard</h2>
		<p class="text-muted-foreground">Manage your details.</p>
	</div>
	<Separator class="my-6" />
	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<aside class="-mx-4 lg:w-1/5">
			<SidebarNav items={sidebarNavItems} />
		</aside>
		<div class="flex-1">
			<slot />
		</div>
	</div>
</div>
