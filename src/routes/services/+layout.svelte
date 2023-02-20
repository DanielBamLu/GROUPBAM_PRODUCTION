<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';

    export let data;
</script>

<div class="services">
    <div class="services-heading">
        <div class="services-title">
            {getTranslatedTextByCode( 'ShopServicesButton' )}
        </div>
        <div class="services-label">
            {getTranslatedTextByCode( 'ShopServicesLabel' )}
        </div>
    </div>
    <div class="services-container">
        <slot />
    </div>
</div>

<style type="text/scss">
    .services-heading,
    .services-container
    {
        padding: 2rem;
        @media( min-width: 65em )
        {
            padding: 4rem;
        }
    }

    .services-heading
    {
        border-bottom: 0.063rem solid var( --line-color );
    }
</style>
