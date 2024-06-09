import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, params }) => {
	const { supabase } = await parent();

	const { data: event } = await supabase
		.from('events')
		.select('*')
		.eq('id', params.slug)
		.maybeSingle();

	const { data: group } = await supabase
		.from('groups')
		.select('*')
		.eq('id', event.group_id)
		.maybeSingle();

	return {
		event,
		group
	};
};
