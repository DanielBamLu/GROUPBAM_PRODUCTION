<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import CloseIcon from '$lib/components/icon/Close.svelte';

    export let closeModalSort = () => {}
    export let sort = ( order ) => {}
</script>

<div class="sort modal">
    <div class="modal-close">
        <button class="modal-close-button" on:click={closeModalSort}>
            <CloseIcon/>
        </button>
    </div>
    <div class="modal-container">
        <div class="modal-title">
            {getTranslatedTextByCode( 'OrderByTitle' )}
        </div>
        <ul>
            <li>
                <button on:click={sort( 'alfabeticAsc' )}>
                    {getTranslatedTextByCode( 'OrderByAlfabeticAscLabel' )}
                </button>
            </li>
            <li>
                <button on:click={sort( 'alfabeticDesc' )}>
                    {getTranslatedTextByCode( 'OrderByAlfabeticDescLabel' )}
                </button>
            </li>
            <li>
                <button on:click={sort( 'priceAsc' )}>
                    {getTranslatedTextByCode( 'OrderByPriceAscLabel' )}
                </button>
            </li>
            <li>
                <button on:click={sort( 'priceDesc' )}>
                    {getTranslatedTextByCode( 'OrderByPriceDescLabel' )}
                </button>
            </li>
        </ul>
    </div>
</div>

<style>
    .modal-container button
    {
        padding: 1rem;

        display: flex;
        align-items: center;
    }
</style>
