<script>
    import { getTranslatedTextByCode, getTranslatedText } from 'senselogic-gist';
    import { Button, Pagination } from 'attractions';
    import EditIcon from "$lib/components/icon/Edit.svelte";
    import Search from "svelte-search";

    export let data;

    let pagesCounter = Math.ceil( ( data.industryArray.length / 10 ) );
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
            for ( let index in data.industryArray )
            {
                if ( data.industryArray[ index ].slug.toLowerCase().includes( value.toLowerCase() ) )
                {
                    searchArray.push( data.industryArray[ index ] );
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
    <title>{getTranslatedTextByCode( 'IndustryButton' )}</title>
</svelte:head>
<div class="admin-list">
    <div class="admin-list-title admin-title">
        {getTranslatedTextByCode( 'IndustryButton' )}
    </div>
    <div class="admin-search">
        <Search label="" bind:value on:submit={search} />
        <Button filled class="back" on:click={search}>Search</Button>
    </div>
    <div class="admin-list-pages">
        {#if isSearch }
            {#if hasResults }
                {#each searchArray as item, outerCounter}
                    {#if outerCounter % 10 === 0}
                        <div class="admin-list-page {( outerCounter + 10 ) == currentPage*10 ? 'selected' : ''}">
                            {#each searchArrayu as item, counter}
                                {#if counter >= outerCounter && counter < outerCounter + 10}
                                    <div class="admin-list-item">
                                        <div class="admin-list-item-title">
                                            {getTranslatedText( item.name )}
                                        </div>
                                        <div class="admin-list-item-controler">
                                            <a class="admin-list-item-edit" href="/admin/industry/edit/{item.id}">
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
            {#each data.industryArray as industry, outerCounter}
                {#if outerCounter % 10 === 0}
                    <div class="admin-list-page {( outerCounter + 10 ) == currentPage*10 ? 'selected' : ''}">
                        {#each data.industryArray as industry, counter}
                            {#if counter >= outerCounter && counter < outerCounter + 10}
                                <div class="admin-list-item">
                                    <div class="admin-list-item-title">
                                        {getTranslatedText( industry.name )}
                                    </div>
                                    <div class="admin-list-item-controler">
                                        <a class="admin-list-item-edit" href="/admin/industry/edit/{industry.id}">
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
