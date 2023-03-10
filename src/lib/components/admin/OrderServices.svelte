<script>
    import { Switch } from 'attractions';
    import { getPriceCurrency, getCurrencySymbol } from '$lib/currency';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import OrderServiceDetailsCard from '$lib/components/admin/OrderServiceDetailsCard.svelte';

    export let order;
    export let orderServices;

    let currency = getCurrencySymbol();
</script>

<div class="order-services">
    <div class="order-services-container">
        {#if orderServices.length > 0}
            <div class="order-services-production-time">
                <div class="order-services-production-time-label">
                    {getTranslatedTextByCode( 'ProductionTimeLabel' )}
                </div>
                <div class="order-services-production-time-days">
                    {#if order.productionTime == 1}
                        {order.productionTime} {getTranslatedTextByCode( 'CartDayLabel' )}
                    {:else}
                        {order.productionTime} {getTranslatedTextByCode( 'CartDaysLabel' )}
                    {/if}
                </div>
            </div>
            <div class="order-services-items">
                {#each orderServices as item}
                    <OrderServiceDetailsCard data={item}/>
                {/each}
            </div>
            <div class="order-services-urgency">
                <div class="order-services-urgency-label">
                    {getTranslatedTextByCode( 'UrgencyLabel' )}
                </div>
                <Switch name="urgency" value={order.urgency} disabled/>
            </div>
            <div class="order-services-total">
                {#if order.status == 'pending'}
                    <div class="order-services-total-label">
                        {getTranslatedTextByCode( 'TotalToPayLabel' )}
                    </div>
                {:else}
                    <div class="order-services-total-label">
                        {getTranslatedTextByCode( 'TotalPayedLabel' )}
                    </div>
                {/if}
                <div class="order-services-total-value">
                    {currency}{getPriceCurrency( order.totalPrice )}
                </div>
            </div>
        {/if}
    </div>
</div>

<style type="text/scss">
    .order-services
    {
        background-color: var( --white-color );
    }

    .order-services-production-time
    {
        margin-top: 1.5rem;

        display: flex;
        justify-content: space-between;
    }

    .order-services-items
    {
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;

        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .order-services-urgency
    {
        margin-bottom: 1rem;
        border-top: 0.063rem solid var( --line-color );
        padding: 1.25rem 0;

        display: flex;
        justify-content: space-between;
    }

    .order-services-total
    {
        display: flex;
        justify-content: space-between;
    }
</style>
