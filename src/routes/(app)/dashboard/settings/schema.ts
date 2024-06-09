import { z } from 'zod';

export const formSchema = z.object({
	full_name: z.string(),
	billing_address: z.string()
});

export type FormSchema = typeof formSchema;
