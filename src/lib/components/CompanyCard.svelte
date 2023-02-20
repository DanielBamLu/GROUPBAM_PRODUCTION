<script>
    import { getTranslatedText } from 'senselogic-gist';

    export let companyData;
</script>

<div class="company-card">
    <img src="{companyData.imagePath}" alt=""/>
    <div class="company-card-info">
        <div class="company-card-info-content">
            <div class="company-card-name company-card-name">
                {companyData.name}
            </div>
            <div class="company-card-summary company-card-summary">
                {getTranslatedText( companyData.summary )}
            </div>
            <div class="company-card-description company-card-description">
                {getTranslatedText( companyData.description )}
            </div>
        </div>
    </div>
</div>

<style type="text/scss">
    .company-card
    {
        position: relative;

        height: 100%;
        width: 100%;

        display: block;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;

        background-color: var( --black-color );
    }
    .company-card img
    {
        height: 100%;
        width: 100%;

        object-fit: cover;

        opacity: 0.7;
        object-position: 50% 50%;
    }
    .company-card-info
    {
        position: absolute;

        height: 100%;
        width: 100%;
        @media( min-width: 120em )
        {
            width: 70%;
        }
    }

    .company-card-info
    {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        margin: auto;
        max-height: 20rem;
        padding: 2rem;
        @media( min-width: 65em )
        {
            max-width: 30rem;
        }
    }

    .company-card-summary
    {
        margin-bottom: 0.5rem;

        overflow-wrap: break-word;
    }
</style>
