import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, params }) => {
	const { supabase } = await parent();

	const { data: country } = await supabase
		.from('countries')
		.select('*')
		.eq('slug', params.slug)
		.maybeSingle();

	return {
		country
	};
};
