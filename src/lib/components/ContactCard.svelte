<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';

    export let data;
</script>

<div class="contact-card">
    <div>
        <div class="contact-card-city">
            {data.city}
        </div>
        <div class="contact-card-address">
            {data.address}<br>
            {data.postCode}<br>
            {data.country}
        </div>
    </div>
    <div>
        <div class="contact-card-helper">
            <div class="contact-card-phone-number">
                {data.phoneNumber}
            </div>
            <div class="contact-card-email">
                {data.email}
            </div>
        </div>
    </div>
    <div>
        <a class="contact-card-directions" href="{data.directionLink}" target="_blank" rel="noreferrer">
            {getTranslatedTextByCode( 'ContactUsGetDirectionsLabel' )}
        </a>
    </div>
</div>

<style type="text/scss">
    .contact-card
    {
        display: grid;
        grid-template-columns: 1fr;
        justify-items: stretch;
        border-top: 0.063rem solid var( --line-color );
        padding: 2rem 3rem;

        @media( min-width: 65em )
        {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    .contact-card >div
    {
        margin-top: 3rem;
    }

    .contact-card-helper
    {
        width: fit-content;
        text-align: left;
    }

    .contact-card >div:not(:first-child)
    {
        @media( min-width: 65em )
        {
            text-align: center;
            display: flex;
            justify-content: center;
        }
    }

    .contact-card >div:last-child
    {
        @media( min-width: 65em )
        {
            display: flex;
            justify-content: flex-end;
        }
    }

    .contact-card-city
    {
        margin-top: -3rem;
    }

    .contact-card-address
    {
        margin-top: 1rem;
    }

    .contact-card-directions
    {
        text-align: right;
    }

    .contact-card-directions
    {
        display: block;
        border: 0.063rem solid var( --blue-color );
        padding: 1.25rem;

        text-align: center;
        max-width: 15rem;
    }
</style>
