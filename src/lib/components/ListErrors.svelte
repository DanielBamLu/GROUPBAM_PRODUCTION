<script>
    export let errors;
</script>

{#if errors}
    <div class="error-messages">
        {errors}
    </div>
{/if}

<style>
    .error-messages
    {
        color: red;
    }
</style>
