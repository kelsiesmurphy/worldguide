<script lang="ts">
	import EventRegisterDialog from './EventRegisterDialog.svelte';

	export let data;
	let { event, group, session, supabase } = data;
</script>

<div class="p-4">
	<div class="flex justify-between gap-4 items-center">
		<div>
            <div class="flex gap-4 items-center">
                <img
                    class="rounded-full w-14 aspect-square"
                    src="https://static.vecteezy.com/system/resources/thumbnails/007/636/859/small_2x/community-logo-design-free-vector.jpg"
                    alt="group profile"
                />
                <div class="space-y-1">
                    <p class="text-muted-foreground text-sm">{group.name}</p>
                    <p class="font-semibold text-lg">{event.title}</p>
                </div>
            </div>
        </div>
		<div>
            <EventRegisterDialog {event} {session} {supabase} />
        </div>
	</div>
</div>
