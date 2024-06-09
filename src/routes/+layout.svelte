<script lang="ts">
	// Styles and CSS

	import '../app.postcss';

	// Authentication on Client Side
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import { ModeWatcher, mode } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:signup');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<ModeWatcher />
<Toaster theme={$mode} />
<div class="min-h-screen flex flex-col font-inter bg-repeat" style={`background-image: url(/pattern.svg)`}>
	<slot />
</div>
