import { z } from 'zod';

export const formSchema = z
	.object({
		password: z.string().min(6).max(50),
		confirmPassword: z.string().min(6).max(50)
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirm']
	});

export type FormSchema = typeof formSchema;
 