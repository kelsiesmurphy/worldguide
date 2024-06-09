<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import SuperDebug from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { postData } from '$lib/utils/helpers';
	import { getStripe } from '$lib/stripe/stripe-client';
	import type { PageData } from './$types';

	export let data: PageData;

	const getPrice = async () => {
		let { data: price, error } = await data.supabase
			.from('prices')
			.select('*')
			.eq('id', data.slug)
			.maybeSingle();
		if (error) {
			console.error(error);
		}
		return price;
	};

	const createGroupMember = async (group) => {
		const { data: groupMember, error } = await data.supabase
			.from('group_members')
			.insert([{ group_id: group.id, user_id: data.session?.user.id, role: "admin" }])
			.select();

		if (error) {
			console.error(error);
		}
		handleCheckout(group)
	};

	const createDraftGroup = async (name: string, slug:string, description: string) => {
		const { data: group, error } = await data.supabase
			.from('groups')
			.insert([{ name: name, slug: slug, description: description, isDraft: true }])
			.select();

		if (error) {
			console.error(error);
		}
		createGroupMember(group?.[0])
	};

	const handleCheckout = async (group) => {
		const price = await getPrice();
		try {
			const { sessionId } = await postData({
				url: '/api/stripe-checkout',
				data: { price, group_id: group.id }
			});
			const stripe = await getStripe();
			stripe?.redirectToCheckout({ sessionId });
		} catch (error) {
			return alert((error as Error)?.message);
		}
	};

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		onUpdated: ({ form }) => {
			if (form.valid) {
				createDraftGroup(form.data.name, form.data.slug, form.data.description);
				toast.success('Your event has been created!');
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="container">
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.Description>This is the name of your group.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="slug">
		<Form.Control let:attrs>
			<Form.Label>Slug</Form.Label>
			<Input {...attrs} bind:value={$formData.slug} />
		</Form.Control>
		<Form.Description>This is the unique URL name of your group.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Textarea {...attrs} bind:value={$formData.description} />
		</Form.Control>
		<Form.Description>This is the description of your group.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<!-- <Form.Field {form} name="image">
		<Form.Control let:attrs>
			<Form.Label>Image</Form.Label>
			<Input type="file" {...attrs} bind:value={$formData.image} />
		</Form.Control>
		<Form.Description>This is an image for your event.</Form.Description>
		<Form.FieldErrors />
	</Form.Field> -->
	<Form.Button>Submit</Form.Button>
</form>

<SuperDebug data={$formData} />
