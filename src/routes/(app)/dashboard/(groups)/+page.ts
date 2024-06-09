export const load = async ({ parent }) => {
	const { supabase, session } = await parent();

	const userId = session?.user?.id;

	if (!userId) {
		return {
			adminGroups: [],
			memberGroups: []
		};
	}

	const { data: adminGroups, error: adminError } = await supabase
		.from('groups')
		.select(
			`*, group_members!inner(
            id, user_id, group_id
        )`
		)
		.eq('group_members.user_id', userId)
		.eq('isDraft', false)
		.eq('group_members.role', 'admin');

	const { data: memberGroups, error: memberError } = await supabase
		.from('groups')
		.select(
			`*, group_members!inner(
            id, user_id, group_id
        )`
		)
		.eq('group_members.user_id', userId)
		.eq('isDraft', false)
		.eq('group_members.role', 'member');

	if (adminError || memberError) {
		console.error('Error fetching groups:', adminError ? adminError.message : memberError?.message);
		return {
			adminGroups: [],
			memberGroups: []
		};
	}
	return {
		adminGroups,
		memberGroups
	};
};
