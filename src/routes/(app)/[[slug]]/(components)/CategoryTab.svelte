<script lang="ts">
	import LucideIcon from '$lib/components/GenericIcon.svelte';

    export let category
    export let isActive
    export let send
    export let receive

</script>

<a href={`/${category.slug}`} data-sveltekit-noscroll class="relative text-center p-4  flex flex-col gap-3 items-center py-3 rounded-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
    <LucideIcon class="relative h-6 w-6" name={category.icon ? category.icon : "menu"} />
    <h2 class="relative text-xs whitespace-nowrap">{category.name}</h2>
    {#if isActive}
        <div
            class="absolute top-full inset-0 w-full rounded-full h-[3px] bg-primary"
            in:send={{ key: 'active-sidebar-tab' }}
            out:receive={{ key: 'active-sidebar-tab' }}
        />
    {/if}
</a>