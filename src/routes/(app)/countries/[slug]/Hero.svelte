<script lang="ts">
    import { mode } from 'mode-watcher';
	import type { PageData } from './$types';

    export let data: PageData;
    $: ({ country } = data);
</script>

<div class="flex gap-6 flex-wrap justify-between">
    <div class="space-y-6 max-w-xl">
        <h1 class="text-3xl md:text-5xl font-semibold">{country.name}</h1>
        <p class="text-lg md:text-2xl text-secondary-foreground">{country.description}</p>
    </div>
    <div class="flex-1 flex max-w-xl min-w-[300px]"><img src={country?.image} alt={`Cover image for ${country.name}`} class={$mode === "dark" ? "invert": ""}/></div>
</div>