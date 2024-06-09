<script lang="ts">
    import type { PageData } from './$types';
	import Hero from './Hero.svelte';
	import ScrollCategories from './SectionTabs.svelte';

    export let data: PageData;
</script>


<section class="container flex-1 space-y-8">
    <Hero {data} />
    <ScrollCategories />
    <slot />
</section>