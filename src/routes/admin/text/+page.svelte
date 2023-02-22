<script>
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import { Button, Pagination } from 'attractions';
    import EditIcon from "$lib/components/icon/Edit.svelte";
    import Search from "svelte-search";

    export let data;

    let pagesCounter = Math.ceil( ( data.textArray.length / 10 ) );
    let searchPagesCounter = 1;
    let currentPage = 1;

    let value = "";
    let isSearch = false;
    let hasResults = false;
    let counterResults = 0;
    let searchArray = new Array();

    const search = () => {

        searchArray = new Array();

        if ( value != '' )
        {
            for ( let index in data.textArray )
            {
                if ( data.textArray[ index ].slug.toLowerCase().includes( value.toLowerCase() ) )
                {
                    searchArray.push( data.textArray[ index ] );
                }
            }

            if ( searchArray.length >= 1 )
            {
                hasResults = true;
            }
            else
            {
                hasResults = false;
            }

            counterResults = searchArray.length;

            searchPagesCounter = Math.ceil( ( counterResults / 10 ) );

            isSearch = true;
        }
        else{
            isSearch = false;
        }
    }
</script>

<svelte:head>
    <title>{getTranslatedTextByCode( 'TextButton' )}</title>
</svelte:head>
<div class="admin-list">
    <div class="admin-list-title admin-title">
        {getTranslatedTextByCode( 'TextButton' )}
    </div>
    <div class="admin-container">
        <div class="admin-search">
            <Search label="" bind:value on:submit={search} />
            <Button filled class="back" on:click={search}>Search</Button>
        </div>
        <div class="admin-add-new">
            <div class="admin-button"><a href="/admin/text/add">{getTranslatedTextByCode( 'NewPageTitle' )}</a></div>
        </div>
    </div>
    <div class="admin-list-pages">
        {#if isSearch }
            {#if hasResults }
                {#each searchArray as item, outerCounter}
                    {#if outerCounter % 10 === 0}
                        <div class="admin-list-page {( outerCounter + 10 ) == currentPage*10 ? 'selected' : ''}">
                            {#each searchArray as item, counter}
                                {#if counter >= outerCounter && counter < outerCounter + 10}
                                    <div class="admin-list-item">
                                        <div class="admin-list-item-title">
                                            {item.slug}
                                        </div>
                                        <div class="admin-list-item-controler">
                                            <a class="admin-list-item-edit" href="/admin/text/edit/{item.id}">
                                                <Button filled>
                                                    <EditIcon data="bright"/>
                                                </Button>
                                            </a>
                                        </div>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    {/if}
                {/each}
                <Pagination pages={searchPagesCounter} bind:currentPage={currentPage}/>
            {:else}
                {getTranslatedTextByCode( 'NoSearchResultsLabel' )}
            {/if}
        {:else}
            {#each data.textArray as text, outerCounter}
                {#if outerCounter % 10 === 0}
                    <div class="admin-list-page {( outerCounter + 10 ) == currentPage*10 ? 'selected' : ''}">
                        {#each data.textArray as text, counter}
                            {#if counter >= outerCounter && counter < outerCounter + 10}
                                <div class="admin-list-item">
                                    <div class="admin-list-item-title">
                                        {text.slug}
                                    </div>
                                    <div class="admin-list-item-controler">
                                        <a class="admin-list-item-edit" href="/admin/text/edit/{text.id}">
                                            <Button filled>
                                                <EditIcon data="bright"/>
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    </div>
                {/if}
            {/each}
            <Pagination pages={pagesCounter} bind:currentPage={currentPage} />
        {/if}
    </div>
</div>
