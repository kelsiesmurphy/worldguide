<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema } from './schema';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import Layout from '../+layout.svelte';

	export let data: PageData;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	let loading = false;

	const resetPassword = async (password: string) => {
		try {
			loading = true;

			const { data, error } = await supabase.auth.updateUser({
				password: password
			});
			if (error) throw error;
			toast.success('Your password has been updated!');
			goto('/dashboard');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		onUpdated: ({ form }: any) => {
			if (form.valid) {
				resetPassword(form.data.password);
			} else if (form.errors.confirm[0]) {
				toast.error(form.errors.confirm[0]);
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<Layout>
	<h1 class="text-2xl">Reset Password</h1>
	<form method="POST" use:enhance>
		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>
				<Input type="password" {...attrs} bind:value={$formData.password} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="confirmPassword">
			<Form.Control let:attrs>
				<Form.Label>Confirm Password</Form.Label>
				<Input type="password" {...attrs} bind:value={$formData.confirmPassword} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button disabled={loading}>Reset Password</Form.Button>
		<!-- <SuperDebug data={$formData} /> -->
	</form>
</Layout>
