<script>
    import { slide } from 'svelte/transition';
    import ChevronIcon from '$lib/components/icon/Chevron.svelte';

    export let data;

    let isOpen = false;
    const toggle = () => isOpen = !isOpen;
</script>

<div class="drawer-menu-item">
    {#if data.type == 'accordion'}
        <div class="drawer-menu-item-button">
            <button on:click={toggle} aria-expanded={isOpen}>
                <div class="drawer-menu-item-label">
                    {data.name}
                </div>
                <div class="drawer-menu-item-arrow">
                    <ChevronIcon data="blue bottom"/>
                </div>
            </button>
        </div>
        <div class="drawer-menu-item-inner">
            {#if isOpen}
                <ul transition:slide={{ duration: 300 }}>
                    {#each data.items as item}
                        <li>
                            <a href="{item.link}">{item.name}</a>
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
    {:else if data.type == 'link'}
        {#each data.items as item}
            <a href="{item.link}">{item.name}</a>
        {/each}
    {/if}
</div>

<style>
    .drawer-menu-item-button button{
        width: 100%;

        display: flex;
        justify-content: space-between;

        background-color: unset;
    }

    .drawer-menu-item-button .drawer-menu-item-arrow {
        margin-right: 0.188rem;

        transition: transform 0.2s ease-in;
    }

    .drawer-menu-item-button [aria-expanded=true] .drawer-menu-item-arrow
    {
        transform: rotate(0.25turn);
    }
</style>
