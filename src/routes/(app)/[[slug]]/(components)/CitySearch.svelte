<script lang="ts">
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';

	const regions = [
		{
			name: 'England',
			cities: [
				'Bath',
				'Birmingham',
				'Bradford',
				'Brighton & Hove',
				'Bristol',
				'Cambridge',
				'Canterbury',
				'Carlisle',
				'Chelmsford',
				'Chester',
				'Chichester',
				'Colchester',
				'Coventry',
				'Derby',
				'Doncaster',
				'Durham',
				'Ely',
				'Exeter',
				'Gloucester',
				'Hereford',
				'Kingston-upon-Hull',
				'Lancaster',
				'Leeds',
				'Leicester',
				'Lichfield',
				'Lincoln',
				'Liverpool',
				'London',
				'Manchester',
				'Milton Keynes',
				'Newcastle-upon-Tyne',
				'Norwich',
				'Nottingham',
				'Oxford',
				'Peterborough',
				'Plymouth',
				'Portsmouth',
				'Preston',
				'Ripon',
				'Salford',
				'Salisbury',
				'Sheffield',
				'Southampton',
				'Southend-on-Sea',
				'St Albans',
				'Stoke on Trent',
				'Sunderland',
				'Truro',
				'Wakefield',
				'Wells',
				'Westminster',
				'Winchester',
				'Wolverhampton',
				'Worcester',
				'York'
			]
		},
		{
			name: 'Northern Ireland',
			cities: ['Armagh', 'Bangor', 'Belfast', 'Lisburn', 'Londonderry', 'Newry']
		},
		{
			name: 'Scotland',
			cities: [
				'Aberdeen',
				'Dundee',
				'Dunfermline',
				'Edinburgh',
				'Glasgow',
				'Inverness',
				'Perth',
				'Stirling'
			]
		},
		{
			name: 'Wales',
			cities: ['Bangor', 'Cardiff', 'Newport', 'St Asaph', 'St Davids', 'Swansea', 'Wrexham']
		}
	];

	let open = false;
	let city = 'London';

	$: selectedValue = city.trim() !== '' && city;

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="ghost"
			role="combobox"
			aria-expanded={open}
			class="pl-0 justify-start underline decoration-primary text-3xl font-semibold focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-white text-left cursor-pointer"
		>
			{selectedValue}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[300px] sm:w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search city..." class="h-9 focus-visible:ring-0 border-none" />
			<Command.Empty>No city found.</Command.Empty>
			<ScrollArea class="h-72">
				{#each regions as region}
					<Command.Group heading={region.name}>
						{#each region.cities as regionCity}
							<Command.Item
								value={regionCity}
								onSelect={(currentValue) => {
									city = currentValue;
									closeAndFocusTrigger(ids.trigger);
								}}
							>
								<Check class={cn('mr-2 h-4 w-4', city !== regionCity && 'text-transparent')} />
								{regionCity}
							</Command.Item>
						{/each}
						<Command.Separator />
					</Command.Group>
				{/each}
			</ScrollArea>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
