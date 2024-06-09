<script lang="ts">
	import type { PageData } from './$types.js';
	import EventForm from './EventForm.svelte';
	export let data: PageData;
</script>

<EventForm data={data.form} />
