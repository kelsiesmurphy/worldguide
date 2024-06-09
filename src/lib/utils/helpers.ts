import type { Database } from '$lib/supabase/types_db';
type Price = Database['public']['Tables']['prices']['Row'];
import { PUBLIC_SITE_URL } from '$env/static/public';

export const getURL = () => {
	let url = PUBLIC_SITE_URL ?? process?.env?.PUBLIC_VERCEL_URL ?? 'http://localhost:5173/';
	// Make sure to include `https://` when not localhost.
	url = url.includes('http') ? url : `https://${url}`;
	// Make sure to including trailing `/`.
	url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
	return url;
};

export const getJoinDate = (timestamp): string => {
	const date = new Date(timestamp);
	
	const monthNames = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	const month = monthNames[date.getUTCMonth()];
	const year = date.getUTCFullYear();
	
	return `${month} ${year}`;
}

export const postData = async ({
	url,
	data
}: {
	url: string;
	data?: { price: Price; group_id: string };
}) => {
	console.log('posting,', url, data);

	const res = await fetch(url, {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		credentials: 'same-origin',
		body: JSON.stringify(data)
	});

	if (!res.ok) {
		console.log('Error in postData', { url, data, res });

		throw Error(res.statusText);
	}

	return res.json();
};

export const toDateTime = (secs: number) => {
	const t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
	t.setSeconds(secs);
	return t;
};
