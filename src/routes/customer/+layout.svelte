<script>
    import { page } from '$app/stores';
    import { getTranslatedTextByCode } from 'senselogic-gist';
    import DashboardIcon from '$lib/components/icon/Dashboard.svelte';
    import CartIcon from '$lib/components/icon/Cart.svelte';
    import SavedIcon from '$lib/components/icon/Saved.svelte';
    import OrderIcon from '$lib/components/icon/Order.svelte';
    import AccountIcon from '$lib/components/icon/Account.svelte';
</script>

<div class="customer">
    <div class="customer-actions">
        <div class="customer-actions-container">
            <div class="customer-actions-user-name">
                {$page.data.user.fullName}
            </div>
            <a href="/customer" class:is-active={$page.url.pathname === '/customer'}>
                <DashboardIcon data="cart"/>
                <div class="customer-action-label">{getTranslatedTextByCode( 'DashboardPageTitle' )}</div>
            </a>
            <a href="/customer/cart" class:is-active={$page.url.pathname === '/customer/cart'}>
                <CartIcon data="cart"/>
                <div class="customer-action-label">{getTranslatedTextByCode( 'CartPageTitle' )}</div>
            </a>
            <a href="/customer/saved" class:is-active={$page.url.pathname === '/customer/saved'}>
                <SavedIcon data="cart"/>
                <div class="customer-action-label">{getTranslatedTextByCode( 'SavedPageTitle' )}</div>
            </a>
            <a href="/customer/orders" class:is-active={$page.url.pathname === '/customer/orders'}>
                <OrderIcon data="cart"/>
                <div class="customer-action-label">{getTranslatedTextByCode( 'OrdersPageTitle' )}</div>
            </a>
            <a href="/customer/account" class:is-active={$page.url.pathname === '/customer/account'}>
                <AccountIcon data="cart"/>
                <div class="customer-action-label">{getTranslatedTextByCode( 'AccountPageTitle' )}</div>
            </a>
        </div>
        <div class="customer-page-info">
            <div class="customer-page-title" class:is-active={$page.url.pathname === '/customer'}>
                {getTranslatedTextByCode( 'WelcomeMessageLabel' )}, {$page.data.user.fullName}
            </div>
            <div class="customer-page-title" class:is-active={$page.url.pathname === '/customer/cart'}>
                {getTranslatedTextByCode( 'CartPageTitle' )}
            </div>
            <div class="customer-page-title" class:is-active={$page.url.pathname === '/customer/saved'}>
                {getTranslatedTextByCode( 'SavedPageTitle' )}
            </div>
            <div class="customer-page-title" class:is-active={$page.url.pathname === '/customer/orders'}>
                {getTranslatedTextByCode( 'OrdersPageTitle' )}
            </div>
            <div class="customer-page-title" class:is-active={$page.url.pathname === '/customer/account'}>
                {getTranslatedTextByCode( 'AccountPageTitle' )}
            </div>
        </div>
    </div>
    <div class="customer-page">
        <div class="customer-page-helper">
        </div>
        <div class="customer-page-container">
            <slot />
        </div>
    </div>
</div>

<style type="text/scss">
    .customer-actions
    {
        @media( min-width: 65em )
        {
            display: grid;
            grid-template-columns: 20rem 1fr;
        }
    }

    .customer-actions-container
    {
        z-index: 999;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;

        display: flex;

        background-color: var( --black-color );
        @media( min-width: 65em )
        {
            position: relative;

            height: 20rem;
            width: 20rem;
            border-right: 0.063rem solid var( --line-color );

            flex-direction: column;
            justify-content: flex-end;

            background-color: unset;
        }
    }

    .customer-actions-user-name
    {
        display: none;
        @media( min-width: 65em )
        {
            padding: 1rem;

            display: block;
        }
    }

    .customer-actions-container a
    {
        padding: 1rem;

        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        @media( min-width: 65em )
        {
            max-height: 4rem;
            border-bottom: 0.063rem solid var(--line-color);
            padding-left: 1rem;

            display: flex;
            flex-direction: row;
            gap: 1rem;
            justify-content: unset;
            align-items: center;
            align-items: center;
        }
    }

    .customer-actions-container a:first-child
    {
        @media( min-width: 65em )
        {
            border-top: 0.063rem solid var(--line-color);
        }
    }

    .customer-actions-container a:last-child
    {
        @media( min-width: 65em )
        {
            border-bottom:unset;
        }
    }

    .customer-actions-container a.is-active
    {
        background-color: var( --blue-color );
        @media( min-width: 65em )
        {
            background-color: var( --line-color );
        }
    }

    .customer-page-info
    {
        display: flex;
        align-items: flex-end;
    }

    .customer-page-title
    {
        display: none;
        @media( min-width: 65em )
        {
            margin-bottom: 5rem;
            margin-left: 3rem;
        }
    }

    .customer-page-title.is-active
    {
        @media( min-width: 65em )
        {
            display: block;
        }
    }

    .customer-page
    {
        @media( min-width: 65em )
        {
            border-top: 0.063rem solid var(--line-color);

            display: grid;
            grid-template-columns: 20rem 1fr;
        }
    }

    .customer-page-helper
    {
        @media( min-width: 65em )
        {
            border-right: 0.063rem solid var(--line-color);
        }
    }

    .customer-page-container
    {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
