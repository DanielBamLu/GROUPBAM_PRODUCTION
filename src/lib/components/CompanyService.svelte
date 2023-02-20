<script>
    import ServiceCard from '$lib/components/ServiceCard.svelte';

    export let data;
</script>

<div class="company-service parent-service-card">
    {#each data.service as item}
        <ServiceCard serviceData={item}>
        </ServiceCard>
    {/each}
</div>

<style type="text/scss">
    .company-service{
        margin-top: 3rem;
    }
</style>
