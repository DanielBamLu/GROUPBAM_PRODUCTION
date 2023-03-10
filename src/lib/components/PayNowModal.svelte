<script>
    import CloseIcon from '$lib/components/icon/Close.svelte';
    import CheckoutPaypal from '$lib/components/CheckoutPaypal.svelte';

    export let order;
    export let refresh = () => {}
    export let closeModalPayNow = () => {}

    function restartComponents() {
        refresh();
    }
</script>

<div class="pay-now-modal modal">
    <div class="modal-close">
        <button class="modal-close-button" on:click={closeModalPayNow}>
            <CloseIcon/>
        </button>
    </div>
    <div class="modal-container">
        <CheckoutPaypal isOrderPlaced='true' orderId={order.id} totalPrice={order.totalPrice} refresh={restartComponents}/>
    </div>
</div>
