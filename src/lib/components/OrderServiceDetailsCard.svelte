<script>
    import { getTranslatedText, getTranslatedTextByCode } from 'senselogic-gist';
    import { getPriceCurrency, getCurrencySymbol, getPriceCurrencyQuantity } from '$lib/currency';
    import { Jumper } from 'svelte-loading-spinners';

    export let data;

    async function getService() {

        const res = await fetch( '/service', {
            method: 'POST',
            body: JSON.stringify(
                {
                    serviceId: data.serviceId,
                    orderId: data.orderId,
                }
            )
        } );

        const service = await res.json();

        if ( res.ok )
        {
            return service;
        }
        else
        {
            throw new Error( service );
        }
    }

    let promise = getService();

    let currency = getCurrencySymbol();
</script>
{#await promise}
    <Jumper size="60" color="#004CFD" unit="px" duration="1s" />
{:then service}
    <div class="service-details-card">
        <a class="service-details-card-image" href="/service/{service.serviceData.slug}">
            <img src="{service.serviceData.imagePath}" alt="">
        </a>
        <div class="service-details-card-info">
            <div class="service-details-card-info-container">
                <a class="service-details-card-title" href="/service/{service.serviceData.slug}">
                    {service.serviceData.title}
                </a>
                <div class="service-details-card-description">
                    {getTranslatedText( service.serviceData.description )}
                </div>
                {#if service.optionsVariantData}
                    {#each service.optionsVariantData as option}
                        <div class="service-details-card-item-option">
                            <div class="service-details-card-item-option-value">
                                {option.value}
                            </div>
                        </div>
                    {/each}
                {/if}
            </div>
            {#if service.serviceData.hasPrice}
                <div class="service-details-card-quantity">
                    <div class="service-details-card-quantity-price">
                        <div class="service-details-card-quantity-price-label quantity-label-dark">
                            {getTranslatedTextByCode( 'UnitPriceLabel' )}
                        </div>
                        <div class="service-details-card-quantity-price-unit quantity-value-dark">
                            {currency}{getPriceCurrency( service.serviceData.unitPrice )}
                        </div>
                    </div>
                    <div class="service-details-card-quantity-inner">
                        <div class="service-details-card-quantity-inner-label quantity-label-dark">
                            {getTranslatedTextByCode( 'QuantityLabel' )}
                        </div>
                        <div class="service-details-card-quantity-inner-quantity">
                            <div class="service-details-card-quantity-value quantity-value-dark">
                                {data.quantity}
                            </div>
                        </div>
                    </div>
                    <div class="service-details-card-quantity-total">
                        <div class="service-details-card-quantity-total-label quantity-label-dark">
                            {getTranslatedTextByCode( 'TotalLabel' )}
                        </div>
                        <div class="service-details-card-quantity-total-price quantity-value-dark">
                            {currency}{getPriceCurrencyQuantity( service.serviceData.unitPrice, data.quantity )}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
{/await}
