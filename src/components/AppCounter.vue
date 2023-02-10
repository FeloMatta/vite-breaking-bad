<script>
    import {store} from '../store';
    export default {
        name:'AppCounter',
        data() {
            return {
                store,
            };
        },
    };
</script>

<template>
    <div class="row bg-dark text-light fw-bold ">
            <p class="m-0 py-2 ">Found {{store.cards.length}} cards</p>
    </div>
</template>

<style  lang="scss" scoped>
</style>