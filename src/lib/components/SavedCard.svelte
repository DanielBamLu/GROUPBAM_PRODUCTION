<script>
    import { getTranslatedText, getTranslatedTextByCode } from 'senselogic-gist';
    import { getPriceCurrency, getCurrencySymbol } from '$lib/currency';

    export let data;

    let currency = getCurrencySymbol();
</script>

<div class="saved-card">
    <a class="saved-card-image" href="/service/{data.info.slug}">
        <img src="{data.info.imagePath}" alt="">
    </a>
    <div class="saved-info">
        <div class="saved-info-container">
            <a class="saved-card-title" href="/service/{data.info.slug}">
                {data.info.title}
            </a>
            <div class="saved-card-description">
                {getTranslatedText( data.info.description )}
            </div>
        </div>
        <div class="saved-card-category-price">
            <div class="saved-card-category">
                <div class="saved-card-category-label">
                    {getTranslatedTextByCode( 'CategoryLabel' )}
                </div>
                <div class="saved-card-category-unit">
                    {getTranslatedText( data.category.title )}
                </div>
            </div>
            <div class="saved-card-unit-price">
                <div class="saved-card-unit-price-label">
                    {getTranslatedTextByCode( 'UnitPriceLabel' )}
                </div>
                <div class="saved-card-unit-price-value">
                    {currency}{getPriceCurrency( data.info.unitPrice )}
                </div>
            </div>
        </div>
    </div>
</div>

<style type="text/scss">
    .saved-card
    {
        max-height: 10rem;

        display: flex;
        gap: 1.5rem;
    }

    .saved-card-image img
    {
        position: relative;

        height: 100%;
        width: 5rem;

        display: inline-block;
        object-fit: cover;
        object-position: 50% 50%;
        @media( min-width: 50em )
        {
            width: 10rem;
        }
    }

    .saved-info
    {
        width: 100%;

        display: flex;
        flex-direction: column;

        text-align: left;
    }

    .saved-info-container
    {
        border-bottom: 0.063rem solid var( --line-color );
        padding-bottom: 1rem;
    }

    .saved-card-category-price
    {
        padding: 1.25rem 0;

        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .saved-card-category
    {
        text-align: left;
    }
</style>
