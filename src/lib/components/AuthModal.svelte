<script>
    import { clickOutside } from '$lib/clickOutside.js';
    import { Modal } from 'attractions';
    import { auth } from '$lib/auth';
    import RegisterModal from '$lib/components/RegisterModal.svelte';
    import LoginModal from '$lib/components/LoginModal.svelte';

    export let handleModalAuth = () => {
        $auth = '';
    }

</script>

{#if $auth == 'login'}
    <Modal open=true>
        <div class="modal-login" use:clickOutside on:click_outside={handleModalAuth}>
            <LoginModal handleModalAuth={handleModalAuth}/>
        </div>
    </Modal>
{/if}

{#if $auth == 'register'}
    <Modal open=true>
        <div class="modal-register" use:clickOutside on:click_outside={handleModalAuth}>
            <RegisterModal handleModalAuth={handleModalAuth}/>
        </div>
    </Modal>
{/if}
