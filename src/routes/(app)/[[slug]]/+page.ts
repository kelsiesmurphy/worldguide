export const load = async ({ parent, params }) => {
	const { supabase } = await parent();

	let query = supabase
		.from('groups')
		.select(
			`*, group_categories!inner(
				id, category_slug, group_id
			), group_members!inner(
				id, user_id, group_id, users!inner(
					id, full_name, avatar_url
				)
			)`
		)
		.eq('isDraft', false);

	if (params.slug) {
		query = query.eq('group_categories.category_slug', params.slug);
	}

	const { data: groups } = await query;

	const { data: categories } = await supabase
		.from('categories')
		.select('*')
		.order('name', { ascending: true });

	return {
		slug: params.slug,
		categories,
		groups
	};
};
