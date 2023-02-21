<script>
    import { onMount } from "svelte";

    export let errors;

    let show;

    onMount( async () => {
        
        show = 1;

        setTimeout(() => {
            show = 0;
        }, 5000)
        } );
</script>

{#if errors}
    {#if show}
        <div class="error-messages">
            {errors}
        </div>
    {/if}
{/if}

<style>
    .error-messages
    {
        color: red;
    }
</style>
