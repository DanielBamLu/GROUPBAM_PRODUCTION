<script>
    export let data;

    let color = data;
</script>

<svg class="{color}" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M5 16H27" stroke="#0A0A0A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 7L27 16L18 25" stroke="#0A0A0A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<style type="text/scss">
    svg
    {
        width: 1.5rem;
    }

    svg.dark path{
        stroke: var( --black-color );
    }

    svg.bright path{
        stroke: var( --white-color );
    }
</style>
