<script>
	import { Button } from '../ui/button';
	import { mode } from 'mode-watcher';
	import Logomark from '$lib/assets/Logomark.svelte';

	const footerItems = [
		{
			title: 'Home',
			link: '/'
		},
		{
			title: 'About Us',
			link: '/about'
		},
		{
			title: 'Pricing',
			link: '/pricing'
		},
		{
			title: 'Sustainability',
			link: '/sustainability'
		},
		{
			title: 'Terms',
			link: '/terms'
		},
		{
			title: 'Privacy',
			link: '/privacy'
		},
		{
			title: 'Cookies',
			link: '/cookies'
		}
	];
</script>

<footer class="container space-y-6 p-4 pt-24 pb-12">
	<div class="flex flex-col text-zinc-600 gap-6 items-center">
		<Button variant="link" href="/"><Logomark /></Button>
		<ul class="flex justify-center flex-wrap">
			{#each [...footerItems.values()] as value}
				<li class={`${$mode === 'dark' && 'text-white'}`}>
					<Button href={value.link} variant="ghost">{value.title}</Button>
				</li>
			{/each}
		</ul>
	</div>
</footer>
