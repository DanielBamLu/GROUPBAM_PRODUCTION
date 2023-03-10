<script>
    import ServiceGallery from '$lib/components/ServiceGallery.svelte';
    import ServiceInfo from '$lib/components/ServiceInfo.svelte';
    import ServicePack from '$lib/components/ServicePack.svelte';
    import ServiceAdvantage from '$lib/components/ServiceAdvantage.svelte';
    import ServiceProcess from '$lib/components/ServiceProcess.svelte';
    import ServiceOption from '$lib/components/ServiceOption.svelte';
    import ServiceRelated from '$lib/components/ServiceRelated.svelte';
    import ServiceInformation from '$lib/components/ServiceInformation.svelte';
    import ServiceReview from '$lib/components/ServiceReview.svelte';
    import OrderSummary from '$lib/components/OrderSummary.svelte';
    import { getPriceCurrency, getCurrencySymbol } from '$lib/currency';
    import { Modal } from 'attractions';
    import { cart } from '$lib/cart';
    import { beforeUpdate } from 'svelte';

    export let data;

    let title = '';

    if ( data.serviceData.info )
    {
        title = data.serviceData.info.title;
    }

    let isServiceInfo = data.serviceData;
    let isServiceGallery = data.serviceImages.length;
    let isServicePack = data.servicePack.length;
    let isServiceAdvantage = data.serviceAdvantage.length;
    let isServiceProcess = data.serviceProcess.length;
    let isServiceOption = data.serviceOption.length;
    let isServiceRelated = data.serviceRelated.length;
    let isServiceInformation = data.serviceInformation.length;
    let isServiceReview = data.serviceReview.length;

    beforeUpdate( () => {
        isServiceInfo = data.serviceData;
        isServiceGallery = data.serviceImages.length;
        isServicePack = data.servicePack.length;
        isServiceAdvantage = data.serviceAdvantage.length;
        isServiceProcess = data.serviceProcess.length;
        isServiceOption = data.serviceOption.length;
        isServiceRelated = data.serviceRelated.length;
        isServiceInformation = data.serviceInformation.length;
        isServiceReview = data.serviceReview.length;
    } );

    let currency = getCurrencySymbol();

    function closeModalOrderSummary() {
        if ( modalOrderSummaryOpen )
        {
            modalOrderSummaryOpen = false;
        }
    }

    let modalOrderSummaryOpen = false;

    let refresh = {}
    function restartComponents() {
        refresh = {}
    }
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>
<div class="service">
    {#key refresh}
        {#if modalOrderSummaryOpen}
            <Modal bind:open={modalOrderSummaryOpen}>
                <div class="service-modal-order-summary">
                    <OrderSummary closeModalOrderSummary={closeModalOrderSummary} userData={data.user}/>
                </div>
            </Modal>
        {/if}
        {#if $cart.info.isOpen}
            <div class="service-order-summary-desktop">
                <OrderSummary userData={data.user}/>
            </div>
            <div class="service-order-summary">
                <div class="service-order-summary-total-price">
                    <div class="service-order-summary-total-price-label">
                        Order summary
                    </div>
                    <div class="service-order-summary-total-price-value">
                        {currency}{getPriceCurrency( $cart.info.totalPriceCart )}
                    </div>
                </div>
                <button class="service-order-summary-button" on:click={() => modalOrderSummaryOpen = true}>view details</button>
            </div>
        {/if}
    {/key}
    <div class="service-container {$cart.info.isOpen}">
        <div class="service-main">
            <div class="service-gallery-container">
                {#if isServiceGallery > 0}
                    <ServiceGallery serviceImages={data.serviceImages}/>
                {/if}
                {#if isServiceInfo}
                    <ServiceInfo serviceData={data.serviceData} serviceReviewData={data.serviceReview}/>
                {/if}
            </div>
        </div>
        {#if isServicePack > 0}
            <div class="service-pack service-padding">
                <ServicePack servicePackData={data.servicePack} servicePackTypeData={data.servicePackType}/>
            </div>
        {/if}
        {#if isServiceAdvantage > 0}
            <div class="service-advantage service-padding">
                <ServiceAdvantage serviceAdvantageData={data.serviceAdvantage}/>
            </div>
        {/if}
        {#if isServiceProcess > 0}
            <div class="service-process service-padding">
                <ServiceProcess serviceProcessData={data.serviceProcess}/>
            </div>
        {/if}
        {#if isServiceOption > 0}
            <div class="service-option service-padding">
                <ServiceOption serviceOptionData={data.serviceOption} refresh={restartComponents}/>
            </div>
        {/if}
        {#if isServiceRelated > 0}
            <div class="service-related service-padding">
                <ServiceRelated serviceRelated={data.serviceRelatedData}/>
            </div>
        {/if}
        <!-- {#if isServiceInformation > 0}
            <div class="service-information service-padding">
                <ServiceInformation serviceInformationData={data.serviceInformation}/>
            </div>
        {/if} -->
        {#if isServiceReview > 0}
            <div class="service-review service-padding">
                <ServiceReview serviceReviewData={data.serviceReview}/>
            </div>
        {/if}
    </div>
</div>
<style type="text/scss">
    .service
    {
        display: flex;
        flex-wrap: wrap;
        @media( min-width: 65em )
        {
            flex-direction: row-reverse;
            flex-wrap: unset;
        }
    }

    .service-modal-order-summary
    {
        z-index: 1001;
        position: fixed;

        height: 100%;
        width: 100%;
    }

    .service-order-summary-desktop
    {
        display: none;
        @media( min-width: 65em )
        {
            display: block;
        }
    }

    .service-order-summary
    {
        z-index: 999;
        position: fixed;
        bottom: 0;

        height: 4rem;
        width: 100%;
        padding-left: 1rem;

        display: flex;
        justify-content: space-between;
        align-items: center;

        background-color: var( --black-color );
        @media( min-width: 65em )
        {
            display: none;
        }
    }

    .service-order-summary button
    {
        height: 100%;
        padding: 1rem 2rem;

        background-color: var( --blue-color );
    }

    .service-main
    {
        @media( min-width: 65em )
        {
            height: calc( var( --viewport-height ) - 4rem );
            min-height: 30rem;
            max-height: 50rem;
        }
    }

    .service-container
    {
        width: 100%;
    }

    .service-container.true
    {
        @media( min-width: 65em )
        {
            width: calc( 100% - 20rem);
        }
    }

    .service-gallery-container
    {
        display: flex;
        flex-direction: column;

        background-color: var( --black-color-400 );
        @media( min-width: 65em )
        {
            height: 100%;
            padding-bottom: 0.125rem;

            flex-direction: row;
        }
    }

    .service-padding
    {
        border-bottom: 0.063px solid var( --line-color );
        padding-top: 6rem;
        padding-bottom: 12rem;
        padding-left: 3rem;
        padding-right: 3rem;
    }
</style>
