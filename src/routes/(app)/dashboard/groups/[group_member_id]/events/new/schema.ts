import { z } from 'zod';

export const formSchema = z.object({
	title: z.string().min(2).max(50),
	description: z.string().min(2).max(250),
	date: z.string().refine((v) => v, { message: 'A date range is required.' }),
	start_time: z.string().refine((v) => v, { message: 'A start time is required.' }),
	end_time: z.string().refine((v) => v, { message: 'An end time is required.' }),
	venue: z.string(),
	// image: z.string(),
	// image_alt: z.string()
});

export type FormSchema = typeof formSchema;
