<script lang="ts" context="module">
	import { z } from 'zod';
	export const notificationsFormSchema = z.object({
		type: z.enum(['all', 'mentions', 'none'], {
			required_error: 'You need to select a notification type.'
		}),
		mobile: z.boolean().default(false).optional(),
		communication_emails: z.boolean().default(false).optional(),
		social_emails: z.boolean().default(false).optional(),
		marketing_emails: z.boolean().default(false).optional(),
		security_emails: z.boolean()
	});
	type NotificationFormSchema = typeof notificationsFormSchema;
</script>

<script lang="ts">
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form';
	import { Switch } from '$lib/components/ui/switch';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<NotificationFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(notificationsFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="space-y-4">
	<Form.Field
		{form}
		name="communication_emails"
		class="flex flex-row items-center justify-between rounded-lg border p-4"
	>
		<Form.Control let:attrs>
			<div class="space-y-0.5">
				<Form.Label class="text-base">Communication emails</Form.Label>
				<Form.Description>Receive emails about your account activity.</Form.Description>
			</div>
			<Switch includeInput {...attrs} bind:checked={$formData.communication_emails} />
		</Form.Control>
	</Form.Field>
	<Form.Field
		{form}
		name="marketing_emails"
		class="flex flex-row items-center justify-between rounded-lg border p-4"
	>
		<Form.Control let:attrs>
			<div class="space-y-0.5">
				<Form.Label class="text-base">Marketing emails</Form.Label>
				<Form.Description>Receive emails about new products, features, and more.</Form.Description>
			</div>
			<Switch includeInput {...attrs} bind:checked={$formData.marketing_emails} />
		</Form.Control>
	</Form.Field>
	<Form.Field
		{form}
		name="social_emails"
		class="flex flex-row items-center justify-between rounded-lg border p-4"
	>
		<Form.Control let:attrs>
			<div class="space-y-0.5">
				<Form.Label class="text-base">Social emails</Form.Label>
				<Form.Description>Receive emails for friend requests, follows, and more.</Form.Description>
			</div>
			<Switch includeInput {...attrs} bind:checked={$formData.social_emails} />
		</Form.Control>
	</Form.Field>
	<Form.Field
		{form}
		name="security_emails"
		class="flex flex-row items-center justify-between rounded-lg border p-4"
	>
		<Form.Control let:attrs>
			<div class="space-y-0.5">
				<Form.Label class="text-base">Security emails</Form.Label>
				<Form.Description>
					Receive emails about your account activity and security.
				</Form.Description>
			</div>
			<Switch includeInput {...attrs} bind:checked={$formData.security_emails} />
		</Form.Control>
	</Form.Field>

	<Form.Button>Update notifications</Form.Button>
</form>

<!-- <SuperDebug data={$formData} /> -->
