import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, params }) => {
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


	return {
		group,
		events
	};
};
