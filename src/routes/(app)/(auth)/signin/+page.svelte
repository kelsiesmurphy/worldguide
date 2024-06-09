<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema } from './schema';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import ForgotPassword from '../(components)/ForgotPassword.svelte';
	import { onMount } from 'svelte';
	import Layout from '../+layout.svelte';

	export let data: PageData;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		if (session) {
			goto('/dashboard');
		}
	});

	let loading = false;

	const handleSignIn = async (email: string, password: string) => {
		try {
			loading = true;
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (error) throw error;
			toast.success('You have been signed in!');
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
		onUpdated: ({ form }) => {
			if (form.valid) {
				handleSignIn(form.data.email, form.data.password);
			} else {
				toast.error('Please fix the errors in the form: ' + JSON.stringify(form));
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<Layout>
	<h1 class="text-2xl">Sign In</h1>
	<form method="POST" use:enhance>
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<Input type="email" {...attrs} bind:value={$formData.email} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>
				<Input type="password" {...attrs} bind:value={$formData.password} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button disabled={loading}>Sign In</Form.Button>
		<!-- <SuperDebug data={$formData} /> -->
	</form>
	<div class="flex-1 flex flex-col items-center">
		<ForgotPassword {supabase} />
		<Button variant="ghost" href="/signup">Don't have an account? Sign Up</Button>
	</div>
</Layout>
