<script lang="ts">
	import { Clock, MapPin, Calendar, ChevronLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageData } from './$types';
	import Attendees from './Attendees.svelte';
	import EventCardMobile from './EventCardMobile.svelte';
	import EventSideCard from './EventSideCard.svelte';
	import SvelteMarkdown from 'svelte-markdown';

	export let data: PageData;
	let { event, group } = data;

	const source = `
## Agenda

- **9:00 AM - 9:30 AM:** Registration and Welcome
- **9:30 AM - 10:30 AM:** Keynote Address by Industry Expert
- **10:30 AM - 12:00 PM:** Parallel Sessions:
  - Web Development Trends
  - Mobile App Development
  - AI and Machine Learning
- **12:00 PM - 1:00 PM:** Lunch Break
- **1:00 PM - 3:00 PM:** Hands-on Workshops:
  - Building Your First Website
  - Introduction to Python Programming
  - Creating Chatbots with TensorFlow
- **3:00 PM - 4:00 PM:** Panel Discussion: Future of Tech
- **4:00 PM - 5:00 PM:** Networking and Closing Remarks

## Registration

To register for TechCon 2024, please visit [our website](https://example.com/techcon2024) or contact us at [email@example.com](mailto:email@example.com).

Don't miss this opportunity to connect with fellow tech enthusiasts and enhance your skills!

`;
</script>

<div class="container space-y-8">
	<Button href={`/groups/${group.slug}`} variant="ghost">
		<ChevronLeft class="mr-2 h-4 w-4" />
		Back to the {group.name} group
	</Button>
	<div class="h-48 object-center overflow-hidden rounded-lg">
		<img src={event.image} alt={event.image_alt} />
	</div>
	<section class="flex flex-wrap-reverse gap-4 max-w-6xl mx-auto">
		<main class="flex-1 min-w-[300px]">
			<article class="pt-8 prose">
				<h1>{event.title}</h1>
				<p>{event.description}</p>
				<hr />
				<div class="md:hidden not-prose flex items-center gap-4 flex-wrap">
					<div class="space-y-4 text-muted-foreground">
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
					<div class="min-w-[200px] flex flex-1">
						<img
							class="rounded-lg aspect-video"
							src="https://staticmapmaker.com/img/google-placeholder.png"
							alt="map"
						/>
					</div>
				</div>
				<hr class="md:hidden" />
				<div class="prose">
					<SvelteMarkdown {source} />
				</div>
				<Attendees {data} />
			</article>
		</main>
		<aside class="hidden md:block flex-1 min-w-[300px] md:max-w-sm">
			<EventSideCard {data} />
		</aside>
	</section>
</div>
<div class="md:hidden bg-background fixed bottom-0 w-full border-t">
	<EventCardMobile {data} />
</div>
