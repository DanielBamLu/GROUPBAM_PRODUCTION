<script>
    import { onMount } from 'svelte';

    let progress = 0;
    let visible = false;

    onMount(() => {

        visible = true;

        function next() {
            progress += 0.1;
            const remaining = 1 - progress;
            if ( remaining > 0.15 ) setTimeout( next, 500 / remaining );
        }
        setTimeout( next, 250 );
    });
</script>

{#if visible}
    <div class="progress-container">
        <div class="progress" style="width: {progress * 100}%" />
    </div>
{/if}

{#if progress >= 0.4}
    <div class="fade" />
{/if}

<style>
    .progress-container {
        z-index: 999;
        position: absolute;
        top: 0;
        left: 0;

        height: 4px;
        width: 100%;
    }

    .progress {
        position: absolute;
        top: 0;
        left: 0;

        height: 100%;

        background-color: var( --blue-color );

        transition: width 0.4s;
    }

    .fade {
        z-index: 1001;
        position: fixed;

        height: 100%;
        width: 100%;

        background-color: var( --line-color );

        pointer-events: none;
        animation: fade 0.4s;
    }

    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
