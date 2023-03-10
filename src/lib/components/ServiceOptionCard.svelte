<script>
    import { getTranslatedText, getTranslatedTextByCode } from 'senselogic-gist';
    import { cart, StoreCart } from '$lib/cart';
    import { page } from '$app/stores';

    export let optionData;
    export let refresh = () => {}

    // Radio button option
    let options = 1;

    const addOptionRadioButton = () => {

        if ( options != 1 )
        {
            if ( $cart.services.length > 0 )
            {
                for ( let cartService of $cart.services )
                {
                    if ( optionData.option.serviceId == cartService.serviceId )
                    {
                        if( cartService.options )
                        {
                            cartService.options.push( { value: options } );
                        }
                        else
                        {
                            cartService.options = [ { value: options } ];
                        }
                    }
                }
            }
            else
            {
                let itemCartService = {
                    'options' : [ { value: options } ],
                    'serviceId' : optionData.option.serviceId,
                }

                $cart.services.push( itemCartService );
            }
        }
        StoreCart( $cart, $page.data.user );
        refresh();
        }

    let lat = '';
    let long = '';
    let lat_long = '';

    // Two inputs option
    const addOptionTwoInputs = () => {
        const parentInputs = document.getElementById( 'service-option-card-options-text-input' );

        for ( const input of parentInputs.children ) {

            if ( input.name == 'lat' )
            {
                if ( input.value )
                {
                    lat = input.value;
                }
            }

            if ( input.name == 'long' )
            {
                if ( input.value )
                {
                    long = input.value;
                }
            }
        }

        if ( lat && long )
        {
            lat_long = lat + ' , ' + long;

            if ( $cart.services.length > 0 )
            {
                for ( let cartService of $cart.services )
                {
                    if ( optionData.option.serviceId == cartService.serviceId )
                    {
                        if( cartService.options )
                        {
                            cartService.options.push( { value: lat_long } );
                        }
                        else
                        {
                            cartService.options = [ { value: lat_long } ];
                        }
                    }
                }
            }
            else
            {
                let itemCartService = {
                    'options' : [ { value: lat_long } ],
                    'serviceId' : optionData.option.serviceId,
                }

                $cart.services.push( itemCartService );
            }
        }

        StoreCart( $cart, $page.data.user );
        refresh();
        }
</script>

<div class="service-option-card">
    <div class="service-option-card-container">
        <div class="service-option-card-title option-card-title">
            {getTranslatedText( optionData.option.text )}
        </div>
        <div class="service-option-card-description option-card-description">
            {getTranslatedText( optionData.option.description )}
        </div>
        <div class="service-option-card-options">
            {#if optionData.optionType == 'radio-buttons'}
                {#each optionData.optionVariant as variant}
                    <div class="service-option-card-options-radio-input">
                        <input type="radio" bind:group={options} name="option" value="{getTranslatedText( variant.value )} - {getTranslatedText( variant.text )}">
                        <label class="option-card-label" for="child">{getTranslatedText( variant.value )} - {getTranslatedText( variant.text )}</label>
                    </div>
                {/each}
            {:else if optionData.optionType == 'lat-long'}
                <div class="service-option-card-options-text-input" id="service-option-card-options-text-input">
                    {#each optionData.optionVariant as variant}
                        <input type="text" name="{getTranslatedText( variant.value )}" placeholder="{getTranslatedText( variant.value )}">
                    {/each}
                </div>
            {/if}
        </div>
    </div>
    {#if optionData.optionType == 'radio-buttons'}
        <button class="service-option-card-add service-option-button" on:click={() => addOptionRadioButton()}>
            {getTranslatedTextByCode( 'AddOptionButton' )}
        </button>
    {:else if optionData.optionType == 'lat-long'}
        <button class="service-option-card-add service-option-button" on:click={() => addOptionTwoInputs()}>
            {getTranslatedTextByCode( 'AddOptionButton' )}
        </button>
    {/if}
</div>

<style type="text/scss">
    .service-option-card
    {
        min-width: 100%;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-between;

        background-color: var( --black-color );
    }

    .service-option-card-title{
        margin-bottom: 0.5rem;
    }

    .service-option-card-description
    {
        margin-bottom: 1.5rem;
    }

    .service-option-card-container
    {
        width: 100%;
        padding: 2rem 1.5rem;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .service-option-card-options
    {
        margin-bottom: 1.5rem;
        width: 100%;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: space-between;
        @media( min-width: 65em )
        {
            flex-direction: row;
        }
    }

    .service-option-card-options-radio-input
    {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    .service-option-card-options-radio-input input[type="radio"]
    {
        accent-color: var( --blue-color );
        height: 1.25rem;
        width: 1.25rem;
    }

    .service-option-card-options-radio-input label{
        margin-bottom: 0;
    }

    .service-option-card-options-text-input
    {
        width: 100%;

        display: flex;
        gap: 0.5rem;
        justify-content: space-between;
        /* flex-wrap: wrap; */
    }

    .service-option-card-options-text-input input[type="text"]
    {
        width: inherit;
        border: 0.063rem solid var( --gray-color );
        padding: 1rem 0.5rem;

        flex: 1;
    }

    .service-option-card-add
    {
        width: 100%;
        padding: 1rem 2rem;

        text-align: center;

        cursor: pointer;
    }
</style>
