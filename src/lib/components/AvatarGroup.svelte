<script script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar";

    export let group_members

    console.log(group_members)

    const avatarGroupLength = 6
    const groupMembersFirst6 = group_members.slice(0, avatarGroupLength)
</script>

<div class="flex -space-x-2">
    {#each groupMembersFirst6 as member}
        <Avatar.Root class="border-2 border-background">
            <Avatar.Image src={member} alt={`Profile image for ${member.users.full_name}`} />
            <Avatar.Fallback>{member.users.full_name.slice(0, 1)}</Avatar.Fallback>
        </Avatar.Root>
    {/each}
    {#if group_members.length > avatarGroupLength}
        <Avatar.Root>
            <Avatar.Fallback>+{group_members.length - avatarGroupLength}</Avatar.Fallback>
        </Avatar.Root>  
    {/if}
</div>