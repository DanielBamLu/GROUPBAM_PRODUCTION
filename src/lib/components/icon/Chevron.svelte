<script>
    export let data;
</script>

<svg class="{data}" xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
    <path d="M1 13L7 7L1 1" stroke="#0A0A0A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>

<style>
    .bright path
    {
        stroke: var( --white-color );
    }

    .dark path
    {
        stroke: var( --black-color );
    }

    .blue path
    {
        stroke: var( --blue-color );
    }

    .red path
    {
        stroke: var( --red-color );
    }

    .gray path
    {
        stroke: var( --gray-color );
    }

    .left
    {
        transform: rotate( 0.5turn );
    }

    .bottom
    {
        transform: rotate( 0turn );
    }

    .footer
    {
        height: 1rem;
        width: 2rem;
    }
</style>
