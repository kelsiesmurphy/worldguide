<script lang="ts" context="module">
	import { z } from 'zod';

	export const supportFormSchema = z.object({
		name: z.string(),
		email: z.string({ required_error: 'Please select an email to display' }).email(),
		message: z.string().min(4).max(160)
	});

	export type SupportFormSchema = typeof supportFormSchema;
</script>

<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<SupportFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(supportFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" class="space-y-6 max-w-md" use:enhance id="profile-form">
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input placeholder="John Doe" {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input placeholder="johndoe@example.com" {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="message">
		<Form.Control let:attrs>
			<Form.Label>Message</Form.Label>
			<Textarea {...attrs} bind:value={$formData.message} />
		</Form.Control>
		<Form.Description>Maximum of 160 characters</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Send</Form.Button>
</form>

<SuperDebug data={$formData} />
