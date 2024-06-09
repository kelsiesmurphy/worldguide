<script lang="ts">
	import Navigation from '$lib/components/(navigation)/Navigation.svelte';
	import Footer from '$lib/components/(navigation)/Footer.svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

</script>

<Navigation {session} {supabase} />
<div id="main-content" class="flex-1 flex">
	<slot />
</div>
<Footer />
