<script lang="ts">
	import { ArrowUpRight } from "lucide-svelte";
    import { mode } from "mode-watcher";

	export let groupSocial
</script>


<a
    href={groupSocial.url}
    target="_blank"
    class="border flex justify-between dark:bg-primary items-center shadow-sm hover:shadow-md p-4 bg-opacity-50 space-x-4 rounded-xl duration-300 transition-shadow"
    style={`border-color: ${$mode === "light" ? groupSocial.social_links.border_colour : groupSocial.social_links.border_colour_dark}; background-color: ${$mode === "light" ? groupSocial.social_links.bg_colour : groupSocial.social_links.bg_colour_dark}`}
>
    <div class="space-x-4 flex items-center">
            <img src={groupSocial.social_links.logo} alt={`logo for ${groupSocial.social_links.name}`} class={`${groupSocial.social_links.name === 'X' && "dark:invert"}`} />
        <div>
            <p class="text-sm">
                {groupSocial.social_links.action_word} us on {groupSocial.social_links.name}
            </p>
        </div>
    </div>
    <ArrowUpRight class="h-4 w-4" />
</a>
