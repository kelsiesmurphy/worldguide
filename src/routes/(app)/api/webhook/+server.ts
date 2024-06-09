import type Stripe from 'stripe';
import { stripe } from '$lib/stripe/stripe';
import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';

import {
	upsertProductRecord,
	upsertPriceRecord,
	manageSubscriptionStatusChange
} from '$lib/utils/supabase-admin';
import type { RequestEvent } from '@sveltejs/kit';

const relevantEvents = new Set([
	'product.created',
	'product.updated',
	'price.created',
	'price.updated',
	'checkout.session.completed',
	'customer.subscription.created',
	'customer.subscription.updated',
	'customer.subscription.deleted'
]);

export async function POST({ request }: RequestEvent) {
	const body = await request.text();

	const sig = request.headers.get('Stripe-Signature') as string;

	const webhookSecret = STRIPE_WEBHOOK_SECRET;
	let event: Stripe.Event;

	try {
		if (!sig || !webhookSecret) return;
		event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
	} catch (err) {
		const error = err as Error;
		console.log(`❌ Error message: ${error.message}`);
		return new Response(`Webhook Error: ${error.message}`, { status: 400 });
	}

	if (relevantEvents.has(event.type)) {
		try {
			const subscription = event.data.object as Stripe.Subscription;
			const checkoutSession = event.data.object as Stripe.Checkout.Session;
			switch (event.type) {
				case 'product.created':
				case 'product.updated':
					await upsertProductRecord(event.data.object as Stripe.Product);
					break;
				case 'price.created':
				case 'price.updated':
					await upsertPriceRecord(event.data.object as Stripe.Price);
					break;
				case 'customer.subscription.created':
				case 'customer.subscription.updated':
				case 'customer.subscription.deleted':
					await manageSubscriptionStatusChange(
						subscription.id,
						subscription.customer as string,
						event.type === 'customer.subscription.created'
					);
					break;
				case 'checkout.session.completed':
					if (checkoutSession.mode === 'subscription') {
						const subscriptionId = checkoutSession.subscription;
						await manageSubscriptionStatusChange(
							subscriptionId as string,
							checkoutSession.customer as string,
							true
						);
					}
					break;
				default:
					throw new Error('Unhandled relevant event!');
			}
		} catch (error) {
			console.log(error);
			return new Response('Webhook handler failed. View your nextjs function logs.', {
				status: 400
			});
		}
	}
	return new Response(JSON.stringify({ received: true }));
}
