<script>
    import { onMount } from "svelte";

    export let success;

    let show;

    onMount( async () => {

        show = 1;

        setTimeout(() => {
            show = 0;
        }, 5000)
        } );
</script>

{#if success}
    {#if show}
        <div class="success-messages">
            {success}
        </div>
    {/if}
{/if}

<style>
    .success-messages
    {
        color: green;
    }
</style>
