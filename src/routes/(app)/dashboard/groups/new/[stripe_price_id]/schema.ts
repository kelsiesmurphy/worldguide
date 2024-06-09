import { z } from 'zod';

export const formSchema = z.object({
	name: z.string().min(2).max(50),
	description: z.string().min(2).max(250),
	slug: z.string().min(2).max(50)
});

export type FormSchema = typeof formSchema;
