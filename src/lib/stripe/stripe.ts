import Stripe from 'stripe';
import { STRIPE_SECRET } from '$env/static/private';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_LIVE ?? STRIPE_SECRET ?? '', {
	apiVersion: '2023-10-16'
});
