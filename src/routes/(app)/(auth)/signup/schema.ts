import { z } from 'zod';

export const formSchema = z.object({
	full_name: z.string(),
	email: z.string().email(),
	password: z.string().min(6).max(50)
});

export type FormSchema = typeof formSchema;
