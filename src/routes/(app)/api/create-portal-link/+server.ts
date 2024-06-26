import { stripe } from '$lib/stripe/stripe';
import { createOrRetrieveCustomer } from '$lib/utils/supabase-admin';
import { getURL } from '$lib/utils/helpers';

export async function POST({ request, locals: { getSession } }) {
	if (request.method === 'POST') {
		try {
			const supabaseSession = await getSession();

			if (!supabaseSession) throw Error('Could not get user');
			const customer = await createOrRetrieveCustomer({
				uuid: supabaseSession.user.id || '',
				email: supabaseSession.user.email || ''
			});

			if (!customer) throw Error('Could not get customer');
			const { url } = await stripe.billingPortal.sessions.create({
				customer,
				return_url: `${getURL()}dashboard`
			});
			return new Response(JSON.stringify({ url }), {
				status: 200
			});
		} catch (err) {
			const error = err as Error;
			console.log(err);
			return new Response(JSON.stringify({ error: { statusCode: 500, message: error.message } }), {
				status: 500
			});
		}
	} else {
		return new Response('Method Not Allowed', {
			headers: { Allow: 'POST' },
			status: 405
		});
	}
}
