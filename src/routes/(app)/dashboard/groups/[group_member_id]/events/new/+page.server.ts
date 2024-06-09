import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema.js';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const { group_member_id } = event.params;
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { title, description, date, start_time, end_time } = form.data;

		const start_datetime = `${date}T${start_time}`;
		const end_datetime = `${date}T${end_time}`;

		const date_start = new Date(start_datetime).toISOString();
		const date_end = new Date(end_datetime).toISOString();

		// const { data } = await event.locals.supabase.storage
		// 	.from('avatars')
		// 	.upload('public/avatar1.png', image, {
		// 		cacheControl: '3600',
		// 		upsert: false
		// 	});

		const { data: groupId, error: groupMembersError } = await event.locals.supabase
			.from('group_members')
			.select('group_id')
			.eq('id', group_member_id);
		if (groupMembersError) {
			setError(form, groupMembersError.message, { status: 500 });
		}

		const { data: newEvent, error } = await event.locals.supabase
			.from('events')
			.insert([
				{
					group_id: groupId?.[0],
					title: title,
					description: description,
					date_start: date_start,
					date_end: date_end,
					venue: "Test Venue"
				}
			])
			.select();
		if (error) {
			setError(form, error.message, { status: 500 });
		}

		const { error: attendeeError } = await event.locals.supabase
			.from('attendees')
			.insert([
				{
					event_id: newEvent?.[0].id,
					group_member_id: group_member_id,
					hosting: true
				}
			])
			.select();

		if (attendeeError) {
			setError(form, attendeeError.message, { status: 500 });
		}
		return { form };
	}
};
