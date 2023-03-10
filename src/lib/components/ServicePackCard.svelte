<script>
    import { getTranslatedText, getTranslatedTextByCode } from 'senselogic-gist';
    import { getPriceCurrency, getCurrencySymbol } from '$lib/currency';
    import CheckIcon from '$lib/components/icon/Check.svelte';

    export let packData;
    export let servicePackTypeData;

    let currency = getCurrencySymbol();

    let includes;

    if ( packData.includes.length > 0 )
    {
        includes = packData.includes;
    }
</script>

<div class="service-pack-card" style="border-top: 0.375rem solid{packData.info.color}">
    {#each servicePackTypeData as packType}
        {#if packData.info.typeId == packType.id}
            {#if packType.name.en == 'Select'}
                <div class="service-pack-card-main">
                    <div class="service-pack-card-name card-title">
                        {getTranslatedText( packData.info.name )}
                    </div>
                    <div class="service-pack-card-price">
                        <div class="service-pack-card-unit-price service-pack-price" style="color: {packData.info.color}">
                            {currency}{getPriceCurrency( packData.info.price )}
                        </div>
                        <div class="service-pack-card-unit">
                        </div>
                    </div>
                    <div class="service-pack-card-total-price">
                    </div>
                    <div class="service-pack-card-select">
                        <button class="main-button">{getTranslatedTextByCode( 'SelectPackButton' )}</button>
                    </div>
                    <div class="service-pack-card-description service-pack-description">
                        {getTranslatedText( packData.info.description )}
                    </div>
                </div>
                <div class="service-pack-card-includes" style="border-top: 0.375rem solid{packData.info.color}">
                    {#if includes}
                        <div class="service-pack-card-includes-label service-pack-include-label">
                            {getTranslatedText( packData.info.name )} {getTranslatedTextByCode( 'PackIncludesLabel' )} :
                        </div>
                        {#each packData.includes as include}
                            <div class="service-pack-card-includes-item">
                                <div class="service-pack-card-includes-icon">
                                    <CheckIcon data={packData.info.color}/>
                                </div>
                                <div class="service-pack-card-includes-text service-pack-include-text">
                                    {getTranslatedText( include.text )}
                                </div>
                            </div>
                        {/each}
                    {/if}
                </div>
            {:else if packType.name.en == 'Custom'}
                <div class="service-pack-card-main">
                    <div class="service-pack-card-name card-title">
                        {getTranslatedText( packData.info.name )}
                    </div>
                    <div class="service-pack-card-image">
                        <img src="{packData.info.imagePath}" alt="" class="">
                    </div>
                    <div class="service-pack-card-select">
                        <button class="inverted-button">{getTranslatedTextByCode( 'ContactUsButton' )}</button>
                    </div>
                    <div class="service-pack-card-description">
                        {getTranslatedText( packData.info.description )}
                    </div>
                </div>
                <div class="service-pack-card-includes" style="border-top: 0.375rem solid{packData.info.color}">
                    {#if includes}
                        <div class="service-pack-card-includes-label service-pack-include-label">
                            {getTranslatedText( packData.info.name )} {getTranslatedTextByCode( 'PackIncludesLabel' )} :
                        </div>
                        {#each packData.includes as include}
                            <div class="service-pack-card-includes-item">
                                <div class="service-pack-card-includes-icon">
                                    <Check data={packData.info.color}/>
                                </div>
                                <div class="service-pack-card-includes-text service-pack-include-text">
                                    {getTranslatedText( include.text )}
                                </div>
                            </div>
                        {/each}
                    {/if}
                </div>
            {/if}
        {/if}
    {/each}
</div>

<style>
    .service-pack-card
    {
        overflow: hidden;

        display: flex;
        flex-direction: column;
    }

    .service-pack-card-main
    {
        padding: 2rem 1.5rem;

        background-color: var( --white-color );
    }

    .service-pack-card-name
    {
        margin-bottom: 1.5rem;
    }

    .service-pack-card-image
    {
        margin-bottom: 1.5rem;
    }

    .service-pack-card-image img
    {
        height: 5rem;
        width: 5rem;
    }

    .service-pack-card-price
    {
        margin-bottom: 1.5rem;
    }

    .service-pack-card-select
    {
        margin-bottom: 1.5rem;
    }
    .service-pack-card-description
    {
        margin-bottom: 1.5rem;
    }

    .service-pack-card-includes
    {
        height: 100%;
        padding: 2rem 1.5rem;

        background-color: var( --black-color );
    }

    .service-pack-card-includes-label
    {
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;

        white-space: break-spaces;
    }

    .service-pack-card-includes-item
    {
        margin-bottom: 0.625rem;

        display: flex;
        gap: 0.75rem;
    }
</style>
