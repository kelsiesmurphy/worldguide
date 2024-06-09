<script lang="ts">
	import type { PageData } from './$types.js';
	import NewGroupForm from './NewGroupForm.svelte';
	export let data: PageData;
</script>

<NewGroupForm data={data} />
