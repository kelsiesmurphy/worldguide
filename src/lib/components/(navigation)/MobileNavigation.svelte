<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Menu } from 'lucide-svelte';
	import { Button, buttonVariants } from '../ui/button';
	import Wordmark from '$lib/assets/Wordmark.svelte';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';

	export let supabase: SupabaseClient;
	export let session: Session | null;
	export let navigationItems: { title: string; link: string }[];

	const handleSignOut = async () => {
		await supabase.auth.signOut();
	};
</script>

<Sheet.Root>
	<Sheet.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
		<Menu class="h-[1.2rem] w-[1.2rem]" />
	</Sheet.Trigger>
	<Sheet.Content>
		<Sheet.Header class="space-y-6">
			<Sheet.Title>
				<Button variant="link" href="/"><Wordmark /></Button>
			</Sheet.Title>
			<Sheet.Description class="space-y-2">
				{#each [...navigationItems.values()] as value}
					<Button href={value.link} variant="ghost" class="w-full">{value.title}</Button>
				{/each}
				<Button class="w-full" href={session ? '/dashboard' : '/signin'}
					>{session ? 'Dashboard' : 'Sign In'}</Button
				>
				{#if session}
					<Button class="w-full" variant="outline" on:click={handleSignOut}>Sign Out</Button>
				{/if}
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
