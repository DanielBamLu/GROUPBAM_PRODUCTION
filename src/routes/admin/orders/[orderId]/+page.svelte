<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { DatePicker, TextField } from 'attractions';
    import { enhance } from '$app/forms';
    import { getDateTime } from '$lib/date';
    import { getViewDate } from '$lib/date';
    import ListErrors from '$lib/components/ListErrors.svelte';
    import ListSuccess from '$lib/components/ListSuccess.svelte';
    import OrderServices from '$lib/components/admin/OrderServices.svelte';

    export let data;

    let order = data.order;
    let orderServices = data.orderServices;

    let errors;
    let success;

    let refresh = {}
    function restartComponents() {
        getData();
        refresh = {}
    }

    async function getData() {

        const res = await fetch( '/admin/orders', {
            method: 'POST',
            body: JSON.stringify(
                {
                    orderId: order.id,
                }
            )
        } );

        const orderJson = await res.json();
        order = orderJson.data.orderData;
    }

    async function cancelOrder() {
        const res = await fetch( '/admin/orders', {
            method: 'PUT',
            body: JSON.stringify(
                {
                    orderId: order.id,
                    type: 'cancel-order'
                }
            )
        } );
        restartComponents();
        const orderJson = await res.json();
        order = orderJson.data.orderData;
    }

    async function paidOrder() {
        const res = await fetch( '/admin/orders', {
            method: 'PUT',
            body: JSON.stringify(
                {
                    orderId: order.id,
                    type: 'paid-order'
                }
            )
        } );
        restartComponents();
        const orderJson = await res.json();
        order = orderJson.data.orderData;
    }


    let deliveryDateTime;

    if ( !isNaN( Date.parse( order.deliveryDateTime ) ) ) {

        deliveryDateTime = getDateTime( order.deliveryDateTime );

    } else {
        deliveryDateTime = getDateTime();
    }

    function getFileName( item ) {
        item = item.replace("/document/orders/", "");
        return item;
    }
</script>

<svelte:head>
    <title>{getTranslatedTextByCode( 'OrdersPageTitle' )}</title>
</svelte:head>
{#key refresh}
    <div class="order">
        <div class="order-details order-section">
            <div class="order-details-title order-section-title">
                {getTranslatedTextByCode( 'OrderOrderDetailsLabel' )}
            </div>
            <div class="order-details-items">
                <div class="order-details-item">
                    <div class="order-details-label">
                        {getTranslatedTextByCode( 'OrdersRefNumberLabel' )}
                    </div>
                    <div class="order-details-value">
                        {order.referenceNumber}
                    </div>
                </div>
                <div class="order-details-item">
                    <div class="order-details-label">
                        {getTranslatedTextByCode( 'OrdersStatusLabel' )}
                    </div>
                    <div class="order-details-value">
                        {#if order.status == 'pending'}
                            <div style="width: 12px;height: 12px;background: #F09219;"/>{getTranslatedTextByCode( 'OrdersStatusPendingPaymentLabel' )}
                        {:else if order.status == 'delivered'}
                            <div style="width: 12px;height: 12px;background: #17A050;"/>{getTranslatedTextByCode( 'OrdersStatusDeliveredLabel' )}
                        {:else if order.status == 'cancelled'}
                            <div style="width: 12px;height: 12px;background: #AD1508;"/>{getTranslatedTextByCode( 'OrdersStatusCancelledLabel' )}
                        {:else if order.status == 'process'}
                            <div style="width: 12px;height: 12px;background: #F09219;"/>{getTranslatedTextByCode( 'OrdersStatusInProcessLabel' )}
                        {/if}
                    </div>
                </div>
                <div class="order-details-item">
                    <div class="order-details-label">
                        {getTranslatedTextByCode( 'OrdersOrderDateLabel' )}
                    </div>
                    <div class="order-details-value">
                        {getViewDate(order.orderDateTime)}
                    </div>
                </div>
                <div class="order-details-item">
                    <div class="order-details-label">
                        {getTranslatedTextByCode( 'OrdersDeliveryDateLabel' )}
                        {#key refresh}
                            <ListErrors errors={errors} />
                            <ListSuccess success={success} />
                        {/key}
                    </div>
                    <div class="order-details-value">
                        <form
                            method="POST"
                            action="?/editDeliveryDate"
                            use:enhance={() => {
                                return ( { result, update } ) => {
                
                                    if ( result.data )
                                    {
                                        if ( result.data.errors )
                                        {
                                            success = '';
                                            errors = result.data.errors;
                                        }
                
                                        if ( result.data.success )
                                        {
                                            errors = '';
                                            success = result.data.success;
                                        }
                                    }
                
                                    refresh = {}
                
                                    if ( result.type === 'error' ) update();
                                };
                            }}
                        >
                            <DatePicker
                                format="%Y/%m/%d"
                                bind:value={deliveryDateTime}
                                closeOnSelection
                            />
                            <TextField
                                name="delivery-date"
                                bind:value={deliveryDateTime}
                                hidden
                            />
                            <button>{getTranslatedTextByCode( 'PublishPageButton' )}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        {#if order.description}
            <div class="order-desciption order-section">
                <div class="order-desciption-title order-section-title">
                    {getTranslatedTextByCode( 'OrderOrderDescriptionLabel' )}
                </div>
                <div class="order-desciption-value">
                    {order.description}
                </div>
            </div>
        {/if}
        <div class="order-document order-section">
            <div class="order-document-title order-section-title">
                {getTranslatedTextByCode( 'OrderOrderDocumentsLabel' )}
            </div>
            {#each order.documentArray as item}
                <a href={item} target="_blank" rel="noreferrer">
                    {getFileName( item )}
                </a>
            {/each}
        </div>
        {#if order.status == 'pending'}
            <div class="order-payed order-section">
                <div class="order-payed-label">
                    {getTranslatedTextByCode( 'OrderAdminPaymentQuestionLabel' )}
                </div>
                <div class="order-payed-action admin-button">
                    <button class="order-payed-button" on:click={paidOrder}>
                        {getTranslatedTextByCode( 'OrderAdminPaymentAfirmativeLabel' )}
                    </button>
                </div>
            </div>
        {/if}
        <div class="order-contact-details order-section">
            <div class="order-section-title">
                {getTranslatedTextByCode( 'OrderContactAddressLabel' )}
            </div>
            <div class="order-contact-details-items">
                <div class="order-contact-details-item">
                    {order.contactFirstName}
                </div>
                <div class="order-contact-details-item">
                    {order.contactLastName}
                </div>
                <div class="order-contact-details-item">
                    {order.contactEmail}
                </div>
            </div>
        </div>
        <div class="order-services order-section">
            <OrderServices orderServices={orderServices} order={order}/>
        </div>
        <div class="order-billing-address order-section">
            <div class="order-section-title">
                {getTranslatedTextByCode( 'OrderBillingAddressLabel' )}
            </div>
            <div class="order-billing-address-items">
                <div class="order-billing-address-item">
                    {order.billingFirstName}
                </div>
                <div class="order-billing-address-item">
                    {order.billingLastName}
                </div>
                <div class="order-billing-address-item">
                    {order.billingFirstAddressLine}
                </div>
                <div class="order-billing-address-item">
                    {order.billingSecondAddressLine}
                </div>
                <div class="order-billing-address-item">
                    {order.billingCity}
                </div>
                <div class="order-billing-address-item">
                    {order.billingCityCode}
                </div>
                <div class="order-billing-address-item">
                    {order.billingProvince}
                </div>
                <div class="order-billing-address-item">
                    {order.billingCountrySlug}
                </div>
            </div>
        </div>
        {#if order.status != 'cancelled'}
            <button class="order-cancel" on:click={cancelOrder}>
                {getTranslatedTextByCode( 'OrderCancelOrderLabel' )}
            </button>
        {/if}
    </div>
{/key}

<style>
    .order
    {
        padding: 2rem;

        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .order-section
    {
        padding: 2.5rem 2rem;

        background-color: var( --white-color );
    }

    .order-section-title
    {
        margin-bottom: 2rem;
    }

    .order-details-item
    {
        border-top: 0.063rem solid var( --line-color );
        padding: 1rem 0;

        display: flex;
        justify-content: space-between;
    }

    .order-details-value
    {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    .order .order-document
    {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .order-payed
    {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
    }

    .order-cancel
    {
        text-align: center;
    }
</style>
