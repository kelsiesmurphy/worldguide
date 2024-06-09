<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Calendar, Clock, MapPin } from 'lucide-svelte';
	import EventRegisterDialog from './EventRegisterDialog.svelte';

	export let data;
	let { event, group, session, supabase } = data;
</script>

<Card.Root class='sticky top-8'>
	<Card.Header class="flex flex-col gap-4 items-center text-center">
		<img
			class="rounded-full w-20 aspect-square"
			src="https://static.vecteezy.com/system/resources/thumbnails/007/636/859/small_2x/community-logo-design-free-vector.jpg"
			alt="group profile"
		/>
		<Card.Title>{group.name}</Card.Title>
		<Card.Description>
            <EventRegisterDialog {event} {session} {supabase} />
        </Card.Description>
	</Card.Header>
	<Card.Content class="space-y-6">
        <hr />
        <div class="space-y-6 text-muted-foreground">
            <div class="flex items-center gap-2">
                <Calendar />
                <p>Monday 13th June</p>
            </div>
            <div class="flex items-center gap-2">
                <Clock />
                <p>6:30pm - 9:00pm</p>
            </div>
            <div class="flex items-center gap-2">
                <MapPin />
                <p>Southview Hotel</p>
            </div>
        </div>
    </Card.Content>
	<Card.Footer class="p-0 rounded-b-lg">
		<img class="rounded-b-lg" src="https://staticmapmaker.com/img/google-placeholder.png" alt="map"/>
	</Card.Footer>
</Card.Root>
