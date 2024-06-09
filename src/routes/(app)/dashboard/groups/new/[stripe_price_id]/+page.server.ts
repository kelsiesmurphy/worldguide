import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema.js';

export const load: PageServerLoad = async ({ params }) => {
	return {
		slug: params.stripe_price_id,
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// try {
		// 	const { sessionId } = await postData({
		// 		url: '/api/stripe-checkout',
		// 		data: { data }
		// 	});
		// 	const stripe = await getStripe();
		// 	stripe?.redirectToCheckout({ sessionId });
		// } catch (error) {
		// 	return alert((error as Error)?.message);
		// }
		// const { name, description } = form.data;

		// const { error } = await event.locals.supabase
		// 	.from('events')
		// 	.insert([
		// 		{
		// 			group_id: group_id,
		// 			name: name,
		// 			description: description
		// 		}
		// 	])
		// 	.select();
		// if (error) {
		// 	setError(form, error.message, { status: 500 });
		// }
		return { form };
	}
};
