<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js";
   
    const sortingOptions = [
      { value: "highest-population", label: "Highest Population" },
    ];
  </script>
   
  <Select.Root selected={sortingOptions[0]}>
    <Select.Trigger class="lg:w-[180px]">
      <Select.Value placeholder="Sort by..." />
    </Select.Trigger>
    <Select.Content>
      <Select.Group>
        {#each sortingOptions as option}
          <Select.Item value={option.value} label={option.label}
            >{option.label}</Select.Item
          >
        {/each}
      </Select.Group>
    </Select.Content>
    <Select.Input name="sortingOptions" />
  </Select.Root>