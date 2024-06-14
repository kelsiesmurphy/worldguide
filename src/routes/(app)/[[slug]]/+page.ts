export const load = async ({ parent, params }) => {
	const { supabase } = await parent();

	let query = supabase
		.from('countries')
		.select(
			`*, country_continents!inner(
				id, continent_slug, country_id
			)`
		)
		.eq('isDraft', false);

	if (params.slug) {
		query = query.eq('country_continents.continent_slug', params.slug);
	}

	const { data: countries } = await query;

	const { data: continents } = await supabase
		.from('continents')
		.select('*')
		.order('name', { ascending: true });

	return {
		slug: params.slug,
		continents,
		countries
	};
};
