export const load = async ({ parent, params }) => {
	const { supabase, session } = await parent();

	const { data: groupId } = await supabase
		.from('group_members')
		.select('*')
		.eq('id', params.group_member_id);

	const { data: group } = await supabase
		.from('groups')
		.select('*')
		.eq('id', groupId?.[0].group_id)
		.maybeSingle();

	const userId = session?.user?.id;

	if (!userId) {
		return { group: {}, attendingEvents: [], hostingEvents: [] };
	}

	const { data: attendingEvents, error: attendingError } = await supabase
		.from('events')
		.select(
			`*, attendees!inner(
            group_member_id, event_id
        )`
		)
		.eq('attendees.group_member_id', params.group_member_id)
		.eq('attendees.hosting', 'FALSE');

	const { data: hostingEvents, error: hostingError } = await supabase
		.from('events')
		.select(
			`*, attendees!inner(
				group_member_id, event_id
        )`
		)
		.eq('attendees.group_member_id', params.group_member_id)
		.eq('attendees.hosting', 'TRUE');

	if (attendingError || hostingError) {
		console.error('Error fetching events:', attendingError ? attendingError.message : hostingError);
		return {
			group: {},
			attendingEvents: [],
			hostingEvents: []
		};
	}

	return {
		group,
		attendingEvents,
		hostingEvents
	};
};
