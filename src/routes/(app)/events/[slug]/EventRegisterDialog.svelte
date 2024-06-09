<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { Database } from '$lib/supabase/types_db';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import { toast } from 'svelte-sonner';

	type Event = Database['public']['Tables']['events']['Row'];

	export let event: Event;
	export let session: Session | null;
	export let supabase: SupabaseClient;

	const handleFormSubmit = async (group_member) => {
		const { error } = await supabase
			.from('attendees')
			.insert([{ event_id: event.id, group_member_id: group_member.id }])
		if (error) {
			console.log('Error: ' + error);
		}
		toast.success(`You are signed up to ${event.title}!`);
		goto('/dashboard');
	};

	const handleJoinGroup = async () => {
        const { data: group_member, error } = await supabase
            .from('group_members')
            .insert([{ group_id: event.group_id, user_id: session?.user.id }])
            .select()
			.maybeSingle();
        if (error) {
            console.log('Error: ' + error);
        }
		handleFormSubmit(group_member)
    }
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>Attend</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Attend <span class="italic">{event.title}</span></Dialog.Title>
			<Dialog.Description>
				Fill out this form to help the organisers prepare accordingly.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="space-y-2">
				<Label for="dietary" class="text-right">Dietary Requirements</Label>
				<Input id="dietary" value="" class="col-span-3" />
			</div>
			<div class="space-y-2">
				<Label for="company" class="text-right">Company</Label>
				<Input id="company" value="" class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" on:click={handleJoinGroup}>Join Group and Register</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
