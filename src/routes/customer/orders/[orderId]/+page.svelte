<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { FileDropzone } from 'attractions';
    import { enhance } from '$app/forms';
    import { getViewDate } from '$lib/date';
    import OrderServices from '$lib/components/OrderServices.svelte';
    import ListErrors from '$lib/components/ListErrors.svelte';
    import ListSuccess from '$lib/components/ListSuccess.svelte';

    export let data;

    let errors;
    let success;

    let order = data.order;
    let orderServices = data.orderServices;

    let refresh = {}
    function restartComponents() {
        getData();
        refresh = {}
    }

    async function getData() {

        const res = await fetch( '/customer/orders', {
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

        const response = confirm( getTranslatedTextByCode( 'OrderCancelOrderMessageLabel' ) );

        if ( response )
        {
            const res = await fetch( '/customer/orders', {
                method: 'PUT',
                body: JSON.stringify(
                    {
                        orderId: order.id,
                    }
                )
            } );
            restartComponents();
            const orderJson = await res.json();
            order = orderJson.data.orderData;
        }
    }
    
    function getBase64( item ) {

        if ( item.length > 0  )
        {
            newFilesArray = new Array;

            for ( let indexFile=0; indexFile < item.length; indexFile++ )
            {
                let file = item[ indexFile ].name.split( '.' );

                let newFile = new Object();

                newFile = {
                    name : file[ 0 ],
                    extension : file[ 1 ],
                    dataFile : '',
                    number: indexFile + 1
                }

                if ( item[ indexFile ] instanceof File )
                {
                    const reader = new FileReader();

                    reader.readAsDataURL( item[ indexFile ] );

                    reader.onload = e => {
                        const fileData = e.target.result.split( ',' );
                        newFile.dataFile = fileData[ 1 ];
                        newFilesArray.push( newFile );
                        refreshFiles = {}
                    };
                }
            }
        }
    };

    let refreshFiles = {};
    let files = data.order.documentArray;
    let filesArray = new Array;
    let newFilesArray = new Array;

    for ( let filesIndex = 0; filesIndex < files.length; filesIndex++ )
    {
        if ( files[ filesIndex ] )
        {
            filesArray.push( {
                name : files[ filesIndex ],
                number: filesIndex + 1
            } )
        }
    }

    function getFileName( item ) {
        item = item.replace("/document/orders/", "");
        return item;
    }

    let deliveryDateTime = order.deliveryDateTime;

    if ( !isNaN( Date.parse( deliveryDateTime ) ) ) {

        deliveryDateTime = getViewDate( order.deliveryDateTime );

    } else {

        if( order.status == 'pending' )
        {
            deliveryDateTime = 'Pending payment';
        }
        else if( order.status == 'process' )
        {
            deliveryDateTime = getTranslatedTextByCode( 'OrdersStatusPendingSellerLabel' );
        }
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
                    </div>
                    <div class="order-details-value">
                        {deliveryDateTime}
                    </div>
                </div>
            </div>
        </div>
        <form
            method="POST"
            action="?/edit"
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
                            restartComponents();
                        }
                    }

                    refresh = {}

                    if ( result.type === 'error' ) update();
                };
            }}
        >
            <div class="order-document order-section">
                {#key refresh}
                    <ListErrors errors={errors} />
                    <ListSuccess success={success} />
                {/key}
                <div class="order-document-title order-section-title">
                    {getTranslatedTextByCode( 'OrderOrderDocumentsLabel' )}
                </div>
                {#each order.documentArray as item}
                    <a href={item} target="_blank" rel="noreferrer">
                        {getFileName( item )}
                    </a>
                {/each}
            </div>
            <div class="order-document-insert order-section">
                <FileDropzone
                    accept="image/*,.pdf"
                    max={7}
                    bind:files={filesArray}
                    on:change={() => getBase64( filesArray )}
                />
                <div class="admin-button">
                    <button>{getTranslatedTextByCode( 'SavePageButton' )}</button>
                </div>
            </div>
            {#key refreshFiles}
                {#each filesArray as item, index}
                    <div class="document">
                        <input hidden name="document-file-counter" value="{index}"/>
                        <input hidden name="document-file-path-{index}" value="{item.name}"/>
                    </div>
                {/each}
            {/key}
            {#key refreshFiles}
                {#each newFilesArray as item, index}
                    <input hidden name="new-document-file-counter" value="{index}"/>
                    <input hidden name="new-document-file-name-{index}" value="{item.name}"/>
                    <input hidden name="new-document-file-extension-{index}" value="{item.extension}"/>
                    <input hidden name="new-document-file-data-{index}" value="{item.dataFile}"/>
                {/each}
            {/key}
        </form>
        <div class="order-services order-section">
            <OrderServices orderServices={orderServices} order={order} refresh={restartComponents}/>
        </div>
        {#if order.status == 'pending'}
            <div class="order-payment-transfer order-section">
                <div class="order-section-title">
                    {getTranslatedTextByCode( 'OrderBankTransferLabel' )}
                </div>
                <div class="order-payment-transfer-transfer">
                    <div class="order-payment-transfer-beneficiary">
                        <div class="order-payment-transfer-beneficiary-name">
                            {data.beneficiary.name}
                        </div>
                        <div class="order-payment-transfer-beneficiary-container">
                            <div class="order-payment-transfer-beneficiary-item">
                                <div class="order-payment-transfer-beneficiary-label">
                                    {getTranslatedTextByCode( 'CheckoutAccountLabel' )}
                                </div>
                                <div class="order-payment-transfer-beneficiary-value">
                                    {data.beneficiary.account}
                                </div>
                            </div>
                            <div class="order-payment-transfer-beneficiary-item">
                                <div class="order-payment-transfer-beneficiary-label">
                                    {getTranslatedTextByCode( 'CheckoutBankLabel' )}
                                </div>
                                <div class="order-payment-transfer-beneficiary-value">
                                    {data.beneficiary.bankName}
                                </div>
                            </div>
                            <div class="order-payment-transfer-beneficiary-item">
                                <div class="order-payment-transfer-beneficiary-label">
                                    {getTranslatedTextByCode( 'CheckoutBankCodeLabel' )}
                                </div>
                                <div class="order-payment-transfer-beneficiary-value">
                                    {data.beneficiary.bankCode}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
        <div class="order-invoice order-section">
            <div class="order-section-title">
                {getTranslatedTextByCode( 'OrderInvoiceLabel' )}
            </div>
        </div>
        <div class="order-payment-transfer-details order-section">
            <div class="order-section-title">
                {getTranslatedTextByCode( 'OrderPaymentDetailsLabel' )}
            </div>
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

    .order .order-document-insert
    {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
    }

    .order-payment-transfer-beneficiary
    {
        flex: 1;
    }

    .order-payment-transfer-beneficiary-name
    {
        margin-bottom: 1rem;
    }

    .order-payment-transfer-beneficiary-item
    {
        border-top: 0.063rem solid var( --line-color );

        display: flex;
        justify-content: space-between;
    }

    .order-cancel
    {
        text-align: center;
    }
</style>
