<script>
    import { createEventDispatcher } from 'svelte';
    import DeleteIcon from '$lib/components/icon/Delete.svelte';

    export let file;

    let src;

    function getBase64( image ) {
        const reader = new FileReader();
        reader.readAsDataURL( image );
        reader.onload = e => {
            src = e.target.result;
        };
    };

    if ( file.name.indexOf( 'image' ) < 1){
        src = getBase64 (file )
    }
    else{
        src = file.name
    }

    const dispatch = createEventDispatcher();
</script>

<div class="image">
    <img src="{src}" alt="" draggable=false />
    <button on:click={() => dispatch( 'delete', file )}>
        <DeleteIcon/>
    </button>
</div>

<style>
    .image
    {
        z-index: 100;
    }

    img
    {
        position: relative;

        height: 9rem;
        width: 100%;

        display: inline-block;
        object-fit: cover;
        object-position: 50% 50%;
    }

    button
    {
        background-color: unset;
    }
</style>
