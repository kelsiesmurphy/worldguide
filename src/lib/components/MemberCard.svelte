<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar";
	import * as Card from "$lib/components/ui/card/index.js";
	import { getJoinDate } from "$lib/utils/helpers";

	export let member
</script>


<Card.Root class="flex flex-col items-center text-center gap-6 px-4 py-8 rounded-lg">
    <Avatar.Root class="w-24 h-24 text-2xl">
        <Avatar.Image
            src={member.users.avatar_url}
            alt="@shadcn"
        />
        <Avatar.Fallback>{member.users.full_name.slice(0, 1)}</Avatar.Fallback>
    </Avatar.Root>
    <div>
        <p>{member.users.full_name}</p>
        <p class="text-sm text-muted-foreground">Member since {getJoinDate(member.join_date)}</p>
    </div>
</Card.Root>