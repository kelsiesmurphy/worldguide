<script lang="ts">
	import ModeToggle from './ModeToggle.svelte';
	import { Button } from '../ui/button';
	import Logomark from '$lib/assets/Logomark.svelte';
	import MobileNavigation from './MobileNavigation.svelte';
	import AvatarDropdown from './AvatarDropdown.svelte';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';

	export let session: Session | null;
	export let supabase: SupabaseClient;

	const navigationItems: {link: string, title: string}[] = [];
</script>

<nav class="py-14 px-4 container flex items-center gap-4 justify-between transition-all">
	<Button
		class="transition left-0 bg-primary text-white absolute p-3 m-3 -translate-y-24 focus:-translate-y-12"
		href="#main-content"
	>
		Skip Navigation
	</Button>
	<div class="flex-1 flex items-center gap-4">
		<Button variant="link" href="/"><Logomark /></Button>
		<ul class="hidden sm:flex">
			{#each [...navigationItems.values()] as value}
				<li>
					<Button href={value.link} variant="ghost">{value.title}</Button>
				</li>
			{/each}
		</ul>
	</div>
	<div class="flex items-center gap-4">
		<ModeToggle />
		{#if session}
			<AvatarDropdown {session} {supabase} />
		{:else}
			<Button class="hidden sm:flex" variant="ghost" href="/signin">Log In</Button>
			<Button class="hidden sm:flex" href="/signup">Sign Up</Button>
		{/if}
		<div class="sm:hidden">
			<MobileNavigation {session} {supabase} {navigationItems} />
		</div>
	</div>
</nav>
