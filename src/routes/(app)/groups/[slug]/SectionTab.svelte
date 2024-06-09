<script lang="ts">
    export let section
    export let isActive
    export let send
    export let receive

</script>

<a href={`/${section.slug}`} data-sveltekit-noscroll class="relative text-center p-4  flex flex-col gap-3 items-center py-3 rounded-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
    <h2 class="relative text-md whitespace-nowrap">{section.name}</h2>
    {#if isActive}
        <div
            class="absolute top-full inset-0 w-full rounded-full h-[3px] bg-primary"
            in:send={{ key: 'active-sidebar-tab' }}
            out:receive={{ key: 'active-sidebar-tab' }}
        />
    {/if}
</a>