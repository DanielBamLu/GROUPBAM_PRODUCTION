<script>
    import { getTranslatedTextByCode, getTranslatedText } from 'senselogic-gist';
    import { Button, Pagination } from 'attractions';
    import EditIcon from "$lib/components/icon/Edit.svelte";
    import Search from "svelte-search";

    export let data;

    let pagesCounter = Math.ceil( ( data.categoryArray.length / 10 ) );
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
            for ( let index in data.categoryArray )
            {
                if ( data.categoryArray[ index ].slug.toLowerCase().includes( value.toLowerCase() ) )
                {
                    searchArray.push( data.categoryArray[ index ] );
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
    <title>{getTranslatedTextByCode( 'CategoryButton' )}</title>
</svelte:head>
<div class="admin-list">
    <div class="admin-list-title admin-title">
        {getTranslatedTextByCode( 'CategoryButton' )}
    </div>
    <div class="admin-container">
        <div class="admin-search">
            <Search label="" bind:value on:submit={search} />
            <Button filled class="back" on:click={search}>Search</Button>
        </div>
        <div class="admin-add-new">
            <div class="admin-button"><a href="/admin/category/add">{getTranslatedTextByCode( 'NewPageTitle' )}</a></div>
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
                                            {getTranslatedText( item.title )}
                                        </div>
                                        <div class="admin-list-item-controler">
                                            <a class="admin-list-item-edit" href="/admin/category/edit/{item.id}">
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
            {#each data.categoryArray as category, outerCounter}
                {#if outerCounter % 10 === 0}
                    <div class="admin-list-page {( outerCounter + 10 ) == currentPage*10 ? 'selected' : ''}">
                        {#each data.categoryArray as category, counter}
                            {#if counter >= outerCounter && counter < outerCounter + 10}
                                <div class="admin-list-item">
                                    <div class="admin-list-item-title">
                                        {getTranslatedText( category.title )}
                                    </div>
                                    <div class="admin-list-item-controler">
                                        <a class="admin-list-item-edit" href="/admin/category/edit/{category.id}">
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
