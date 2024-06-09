import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, params }) => {
	const { supabase } = await parent();

	const { data: group } = await supabase
		.from('groups')
		.select('*')
		.eq('slug', params.slug)
		.maybeSingle();

	const { data: events } = await supabase
		.from('events')
		.select('*')
		.eq('group_id', group.id)

	const { data: groupMembers } = await supabase
		.from('group_members')
		.select(`*, users!inner(*)`)
		.eq('group_id', group.id)

	const { data: groupSocials } = await supabase
		.from('group_socials')
		.select(`*, social_links!inner(*)`)
		.eq('group_id', group.id)

	return {
		group,
		events, 
		groupMembers,
		groupSocials
	};
};
