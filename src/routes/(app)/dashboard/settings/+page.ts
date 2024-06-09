import { fail } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { supabase, session } = await parent();
	if (!session) {
		// the user is not signed in
		throw fail(401, { message: 'Unauthorized' });
	}
	const { data: userdata } = await supabase
		.from('users')
		.select(`id, full_name, billing_address`)
		.eq('id', session.user.id)
		.single();

	const { data: stripeId } = await supabase
		.from('customers')
		.select('stripe_customer_id')
		.eq('id', session.user.id)
		.single();

	const { data: subscription } = await supabase
		.from('subscriptions')
		.select('*, prices(*, products(*))')
		.in('status', ['trialing', 'active'])
		.maybeSingle()
		.throwOnError();

	return {
		subscription,
		userdata,
		stripeId
	};
};
