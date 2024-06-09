<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { Label } from '../../../../lib/components/ui/label';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { PUBLIC_SITE_URL } from '$env/static/public';
	('/update-password');

	let loading = false;
	let email = '';

	export let supabase: SupabaseClient;

	const handlePasswordReset = async (email: string) => {
		try {
			loading = true;
			const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: PUBLIC_SITE_URL + '/update-password'
			});
			if (error) throw error;
			toast.success('A password reset email has been sent!');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'ghost' })}>Forgot Password?</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Reset your password</Dialog.Title>
			<Dialog.Description>
				If you have forgotten your password you can reset it here.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="email" class="text-right">Email</Label>
				<Input required id="email" type="email" bind:value={email} class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" on:click={() => handlePasswordReset(email)}>Reset password</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
