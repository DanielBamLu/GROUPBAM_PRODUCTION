<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { clickOutside } from '$lib/clickOutside.js';
    import { Modal } from 'attractions';
    import { getViewDate } from '$lib/date';
    import PayNowModal from '$lib/components/PayNowModal.svelte';

    export let data;

    function closeModalPayNow() {
        if ( modalPayNowOpen )
        {
            modalPayNowOpen = false;
        }
    }

    let modalPayNowOpen = false;

    export let refresh = () => {}

    let deliveryDateTime = data.deliveryDateTime;

    if ( !isNaN( Date.parse( deliveryDateTime ) ) ) {

        if( data.status == 'pending' )
        {
            deliveryDateTime = getTranslatedTextByCode( 'OrdersStatusPendingPaymentLabel' );
        }
        else
        {
            deliveryDateTime = getViewDate( data.deliveryDateTime );
        }

    } else {
        
        if( data.status == 'pending' )
        {
            deliveryDateTime = getTranslatedTextByCode( 'OrdersStatusPendingPaymentLabel' );
        }
        else if( data.status == 'process' )
        {
            deliveryDateTime = getTranslatedTextByCode( 'OrdersStatusPendingSellerLabel' );
        }
    }
</script>

<div class="order-card">
    <div class="order-card-title">
        Test
    </div>
    <div class="order-card-items">
        <div class="order-card-item">
            <div class="order-card-label">
                {getTranslatedTextByCode( 'OrdersRefNumberLabel' )}
            </div>
            <div class="order-card-value">
                {data.referenceNumber}
            </div>
        </div>
        <div class="order-card-item">
            <div class="order-card-label">
                {getTranslatedTextByCode( 'OrdersStatusLabel' )}
            </div>
            <div class="order-card-value">
                {#if data.status == 'pending'}
                    <div style="width: 12px;height: 12px;background: #F09219;"/>{getTranslatedTextByCode( 'OrdersStatusPendingPaymentLabel' )}
                {:else if data.status == 'delivered'}
                    <div style="width: 12px;height: 12px;background: #17A050;"/>{getTranslatedTextByCode( 'OrdersStatusDeliveredLabel' )}
                {:else if data.status == 'cancelled'}
                    <div style="width: 12px;height: 12px;background: #AD1508;"/>{getTranslatedTextByCode( 'OrdersStatusCancelledLabel' )}
                {:else if data.status == 'process'}
                    <div style="width: 12px;height: 12px;background: #F09219;"/>{getTranslatedTextByCode( 'OrdersStatusInProcessLabel' )}
                {/if}
            </div>
        </div>
        <div class="order-card-item">
            <div class="order-card-label">
                {getTranslatedTextByCode( 'OrdersOrderDateLabel' )}
            </div>
            <div class="order-card-value">
                {getViewDate(data.orderDateTime)}
            </div>
        </div>
        <div class="order-card-item">
            <div class="order-card-label">
                {getTranslatedTextByCode( 'OrdersDeliveryDateLabel' )}
            </div>
            <div class="order-card-value">
                {deliveryDateTime}
            </div>
        </div>
    </div>
    <div class="order-card-actions">
        <a class="order-card-view-details" href="{'/customer/orders/' + data.id}">
            {getTranslatedTextByCode( 'OrdersViewOrderLabel' )}
        </a>
        {#if data.status == 'pending'}
            <button class="order-card-pay-now" on:click={() => modalPayNowOpen = true}>
                {getTranslatedTextByCode( 'OrdersPayNowLabel' )}
            </button>
            {#if modalPayNowOpen}
                <Modal bind:open={modalPayNowOpen}>
                    <div class="modal-filter" use:clickOutside on:click_outside={closeModalPayNow}>
                        <PayNowModal order={data} refresh={refresh} closeModalPayNow={closeModalPayNow}/>
                    </div>
                </Modal>
            {/if}
        {/if}
    </div>
</div>

<style type="text/scss">
    .order-card-title
    {
        margin-bottom: 1rem;
    }

    .order-card
    {
        padding: 1.5rem 1rem;

        background-color: var( --white-color );
    }

    .order-card-item
    {
        border-top: 0.063rem solid var( --line-color );
        padding: 1rem 0;

        display: flex;
        justify-content: space-between;
    }

    .order-card-value
    {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    .order-card-actions
    {
        display: flex;
        gap: 1rem;
    }

    .order-card-view-details
    {
        padding: 1rem;

        flex: 1;

        background-color: var( --background-color );

        text-align: center;
    }

    .order-card-pay-now
    {
        padding: 1rem;

        flex: 1;

        background-color: var( --blue-color );

        text-align: center;
    }
</style>
