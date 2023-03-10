<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { getViewDate } from '$lib/date';

    export let data;
    
    function getDeliveryDateTime( deliveryDateTime ) {

        if ( !isNaN( Date.parse( deliveryDateTime ) ) ) {

            deliveryDateTime = getViewDate( deliveryDateTime );

            } else {

            if( data.status == 'pending' )
            {
                deliveryDateTime = 'Pending payment';
            }
            else if( data.status == 'process' )
            {
                deliveryDateTime = getTranslatedTextByCode( 'OrdersStatusPendingSellerLabel' );
            }
        }

        return deliveryDateTime;
    }

</script>

<div class="orders">
    <div class="orders-heading">
        {#if data.length == 0}
            <div class="orders-empty">
                {getTranslatedTextByCode( 'OrdersEmptyLabel' )}
            </div>
        {/if}
    </div>
    {#if data.length > 0}
        <div class="orders-title">
            {getTranslatedTextByCode( 'OrdersPageTitle' )}
        </div>
        <div class="orders-container">
            {#each data as item}
                <div class="orders-items">
                    <div class="orders-item">
                        <div class="orders-label">
                            {getTranslatedTextByCode( 'OrdersRefNumberLabel' )}
                        </div>
                        <div class="orders-value">
                            {item.referenceNumber}
                        </div>
                    </div>
                    <div class="orders-item">
                        <div class="orders-label">
                            {getTranslatedTextByCode( 'OrdersStatusLabel' )}
                        </div>
                        <div class="orders-value">
                            {#if item.status == 'pending'}
                                <div style="width: 16px;height: 16px;background: #F09219;"/>{getTranslatedTextByCode( 'OrdersStatusPendingPaymentLabel' )}
                            {:else if item.status == 'delivered'}
                                <div style="width: 16px;height: 16px;background: #17A050;"/>{getTranslatedTextByCode( 'OrdersStatusDeliveredLabel' )}
                            {:else if item.status == 'cancelled'}
                                <div style="width: 16px;height: 16px;background: #AD1508;"/>{getTranslatedTextByCode( 'OrdersStatusCancelledLabel' )}
                            {:else if item.status == 'process'}
                                <div style="width: 16px;height: 16px;background: #F09219;"/>{getTranslatedTextByCode( 'OrdersStatusInProcessLabel' )}
                            {/if}
                        </div>
                    </div>
                    <div class="orders-item">
                        <div class="orders-label">
                            {getTranslatedTextByCode( 'OrdersOrderDateLabel' )}
                        </div>
                        <div class="orders-value">
                            {getViewDate( item.orderDateTime )}
                        </div>
                    </div>
                    <div class="orders-item">
                        <div class="orders-label">
                            {getTranslatedTextByCode( 'OrdersDeliveryDateLabel' )}
                        </div>
                        <div class="orders-value">
                            {getDeliveryDateTime( item.deliveryDateTime )}
                        </div>
                    </div>
                    <div class="orders-actions">
                        <a class="orders-view-order" href="{'/customer/orders/' + item.id}">
                            {getTranslatedTextByCode( 'OrdersViewOrderLabel' )}
                        </a>
                    </div>
                </div>
            {/each}
        </div>
        <div class="orders-view-all">
            <a href="/customer/orders">
                {getTranslatedTextByCode( 'ViewAllButton' )}
            </a>
        </div>
    {/if}
</div>
<style type="text/scss">
    .orders
    {
        position: relative;

        padding: 2rem;

        display: flex;
        flex-direction: column;
        justify-content: center;

        background-color: var( --white-color );
        @media( min-width: 65em )
        {
            padding: 4rem;
        }
    }

    .orders-heading
    {
        text-align: center;
    }

    .orders-title
    {
        margin-bottom: 2rem;
    }

    .orders-items
    {
        margin-top: 2rem;

        display: grid;
        grid-template-columns: 1fr;
        @media( min-width: 65em )
        {
            margin-top: unset;
            border-top: 0.063rem solid var( --line-color );

            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }
    }

    .orders-item
    {
        border-top: 0.063rem solid var( --line-color );
        padding: 1rem 0;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @media( min-width: 65em )
        {
            border-top: unset;
        }
    }

    .orders-value
    {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    .orders-actions
    {
        display: flex;
        gap: 1rem;
        justify-content: flex-start;
        align-items: center;
        @media( min-width: 65em )
        {
            justify-content: flex-end;
        }
    }

    .orders-view-order
    {
        width: 100%;
        border: 0.063rem solid var( --blue-color );
        padding: 1.25rem;

        text-align: center;
    }

    .orders-view-all
    {
        position: absolute;
        top: 2rem;
        right: 1.5rem;

        display: flex;
        @media( min-width: 65em )
        {
            position: relative;
            top: unset;
            right: unset;
        }
    }

    .orders-view-all a
    {
        @media( min-width: 65em )
        {
            margin-top: 2rem;
            min-width: 10rem;
            padding: 1.25rem;

            display: flex;
            justify-content: center;

            background-color: var( --background-color );

            color: var( --black-color );
        }
    }
</style>
