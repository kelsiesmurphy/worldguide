<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	import type { Database } from '$lib/supabase/types_db';
	import { goto } from '$app/navigation';
	import type { Session } from '@supabase/supabase-js';
	import { Calendar, ChevronRight, Clock, MapPin } from 'lucide-svelte';

	type Event = Database['public']['Tables']['events']['Row'];

	export let event: Event;
	export let session: Session | null;
</script>

<button
	on:click={() => goto(session ? `/events/${event.id}` : '/signin')}
	class="flex-1 rounded-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
>
	<Card.Root class="flex gap-2 justify-between items-center">
		<div class="flex flex-wrap">
			<div class="p-4 flex-1 md:max-w-40 max-h-40 xs:max-h-full min-w-[250px]">
				<img
					src={event.image}
					alt={event.image_alt}
					class="w-full h-full object-cover rounded-md"
				/>
			</div>
			<Card.Content class="flex-1 flex flex-col justify-center min-w-[250px]">
				<Card.Header class="text-left pl-0">
					<Card.Title>{event.title}</Card.Title>
					<Card.Description>{event.description}</Card.Description>
				</Card.Header>
				<div class="flex flex-wrap gap-4 text-muted-foreground">
					<div class="flex items-center gap-2">
						<MapPin />
						<p>Southview Hotel</p>
					</div>
					<div class="flex items-center gap-2">
						<Clock />
						<p>6:30pm</p>
					</div>
					<div class="flex items-center gap-2">
						<Calendar />
						<p>Add to calendar</p>
					</div>
				</div>
			</Card.Content>
		</div>
		<div class="hidden md:block p-4">
			<ChevronRight />
		</div>
	</Card.Root>
</button>
