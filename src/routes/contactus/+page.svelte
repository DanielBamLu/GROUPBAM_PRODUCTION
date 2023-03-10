<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import ContactCard from '$lib/components/ContactCard.svelte';

    export let data;
</script>

<svelte:head>
    <title>{getTranslatedTextByCode( 'ContactUsButton' )}</title>
</svelte:head>

<div class="contactus">
    <div class="contactus-heading">
        <div class="contactus-title">
            {getTranslatedTextByCode( 'ContactUsButton' )}
        </div>
    </div>
    <div class="contactus-container">
        {#each data.contacts as contact}
            <ContactCard data={contact}/>
        {/each}
    </div>
</div>

<style type="text/scss">
    .contactus-heading
    {
        padding: 2rem;
        @media( min-width: 65em )
        {
            padding: 4rem;
        }
    }
</style>
