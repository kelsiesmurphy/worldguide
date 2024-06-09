<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';

	export let session: Session;
	export let supabase: SupabaseClient;

	const shortenName = (name: string): string | null => {
    const nameRegex = /^(?<firstName>\w+)/;
    const match = name.match(nameRegex);

    if (match) {
        const firstName = match.groups?.firstName;
        if (firstName) {
            return firstName[0];
        }
    }
    return null;
};


	const handleSignOut = async () => {
		await supabase.auth.signOut();
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full hidden sm:flex">
			<Avatar.Root class="h-9 w-9">
				<Avatar.Image
					src={session?.user.user_metadata.avatar_url}
					alt={`${session?.user.user_metadata.full_name}'s avatar`}
				/>
				<Avatar.Fallback>{shortenName(session?.user.user_metadata.full_name)}</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{session?.user.user_metadata.full_name}</p>
				<p class="text-xs leading-none text-muted-foreground">{session?.user.email}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item href="/dashboard">My Groups</DropdownMenu.Item>
			<DropdownMenu.Item href="/dashboard/profile">Profile</DropdownMenu.Item>
			<DropdownMenu.Item href="/dashboard/settings">Settings</DropdownMenu.Item>
			<DropdownMenu.Item href="/dashboard/support">Support</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item on:click={handleSignOut} class="cursor-pointer">Sign Out</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
