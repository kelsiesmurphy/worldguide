<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import type { PageData } from './$types';
	import SupportForm from './support-form.svelte';

	export let data: PageData;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Support</h3>
		<p class="text-sm text-muted-foreground">
			Running into an issue? Get in touch with our support team!
		</p>
	</div>
	<Separator />
	<SupportForm data={data.form} />
</div>
