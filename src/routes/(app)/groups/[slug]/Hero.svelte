<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { toast } from 'svelte-sonner';
    import { writable } from 'svelte/store';
    import { mode } from 'mode-watcher';
	import type { PageData } from './$types';
	import { getJoinDate } from '$lib/utils/helpers';

    export let data: PageData;
    $: ({ group, session, supabase, events, groupMembers } = data);

    const isGroupMember = writable(false);

    const checkUserGroupMember = async () => {
        if (session?.user) {
            const { data: group_members, error } = await supabase
                .from('group_members')
                .select('user_id')
                .eq('group_id', group.id)
                .eq('user_id', session.user.id);

            if (error) {
                console.error('Error:', error.message);
                return;
            }

            isGroupMember.set(group_members && group_members.length > 0);
        }
    };

    checkUserGroupMember();

    $: {
        checkUserGroupMember();
    }

    const handleJoinGroup = async () => {
        const { data, error } = await supabase
            .from('group_members')
            .insert([{ group_id: group.id, user_id: session?.user.id }])
            .select();
        if (error) {
            console.log('Error: ' + error);
        }
        if (data) {
            toast.success(`You are signed up to ${group.name}!`);
            isGroupMember.set(true);
        }
    }
</script>

<div class="flex gap-6 flex-wrap justify-between">
    <div class="space-y-6 max-w-xl">
        <div class="p-4">
            <img class="rounded-full w-20 aspect-square" src="https://static.vecteezy.com/system/resources/thumbnails/007/636/859/small_2x/community-logo-design-free-vector.jpg" alt="group profile"/>
        </div>
        <h1 class="text-3xl md:text-5xl font-semibold">{group.name}</h1>
        <p class="text-lg md:text-2xl text-secondary-foreground">{group.description}</p>
        <div class="flex flex-wrap gap-x-8 gap-y-4 text-md text-muted-foreground">
            <p>{groupMembers?.length} members</p>
            <p>{events?.length} Events</p>
        </div>
        <Button on:click={handleJoinGroup} size="lg" disabled={$isGroupMember} class="w-full sm:w-fit">Join Group</Button>
    </div>
    <div class="flex-1 flex max-w-xl min-w-[300px]"><img src={group?.image} alt={`Cover image for ${group.name}`} class={$mode === "dark" ? "invert": ""}/></div>
</div>