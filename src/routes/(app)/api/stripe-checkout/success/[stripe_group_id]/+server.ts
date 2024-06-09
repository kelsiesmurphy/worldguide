// src/routes/api/stripe-checkout/success/+server.ts
import { json, fail, redirect } from '@sveltejs/kit';

export const GET = async ({ locals: { supabase, getSession }, params }) => {
	const session = await getSession();

	if (!session) {
		// the user is not signed in
		throw fail(401, { message: 'Unauthorized' });
	}

	const { data: groups } = await supabase
		.from('groups')
		.update({ isDraft: false })
		.eq('id', params.stripe_group_id);

	redirect(302, '/dashboard');

	return json({ groups });
};
