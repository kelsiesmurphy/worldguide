<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import SuperDebug from 'sveltekit-superforms';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import {
		DateFormatter,
		getLocalTimeZone,
		today,
		type DateValue,
		parseDate
	} from '@internationalized/date';
	import { CalendarIcon } from 'lucide-svelte';
	import { Calendar } from '$lib/components/ui/calendar';
	import { toast } from 'svelte-sonner';
	import AddressInput from './AddressInput.svelte';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		onUpdated: ({ form }) => {
			if (form.valid) {
				toast.success('Your event has been created!');
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let value: DateValue | undefined;
	$: value = $formData.date ? parseDate($formData.date) : undefined;

	let placeholder: DateValue = today(getLocalTimeZone());

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="container">
	<Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label>Title</Form.Label>
			<Input {...attrs} bind:value={$formData.title} />
		</Form.Control>
		<Form.Description>This is the title of your event.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Textarea {...attrs} bind:value={$formData.description} />
		</Form.Control>
		<Form.Description>This is the description of your event.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="date" class="flex flex-col">
		<Form.Control let:attrs>
			<Form.Label>Date</Form.Label>
			<Popover.Root>
				<Popover.Trigger
					{...attrs}
					class={cn(
						buttonVariants({ variant: 'outline' }),
						'justify-start pl-4 text-left font-normal',
						!value && 'text-muted-foreground'
					)}
				>
					{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
					<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
				</Popover.Trigger>
				<Popover.Content class="w-auto p-0" side="top">
					<Calendar
						{value}
						bind:placeholder
						minValue={today(getLocalTimeZone())}
						calendarLabel="Date of birth"
						initialFocus
						onValueChange={(v) => {
							if (v) {
								$formData.date = v.toString();
							} else {
								$formData.date = '';
							}
						}}
					/>
				</Popover.Content>
			</Popover.Root>
			<Form.Description>The date of your event</Form.Description>
			<Form.FieldErrors />
			<input hidden value={$formData.date} name={attrs.name} />
		</Form.Control>
	</Form.Field>
	<Form.Field {form} name="start_time">
		<Form.Control let:attrs>
			<Form.Label>Start Time</Form.Label>
			<Input type="time" {...attrs} bind:value={$formData.start_time} />
		</Form.Control>
		<Form.Description>This is the start time of your event.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="end_time">
		<Form.Control let:attrs>
			<Form.Label>End Time</Form.Label>
			<Input type="time" {...attrs} bind:value={$formData.end_time} />
		</Form.Control>
		<Form.Description>This is the end time of your event.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<AddressInput />
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
