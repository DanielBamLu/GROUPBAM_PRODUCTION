<script>
    export let success;
</script>

{#if success}
    <div class="success-messages">
        {success}
    </div>
{/if}

<style>
    .success-messages
    {
        color: green;
    }
</style>
