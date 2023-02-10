<script>
import { objectToString } from '@vue/shared';
    export default {
        name:'AppCard',
        props: {
            card: Object,
        },
    };
</script>

<template>
    <div class="my-card h-100 p-2 bg-primary ">
        <img class="img-fluid" :src= "card.card_images[0].image_url_small" :alt="card.name">
        <p class="my-3 text-light fw-bold">{{card.name}}</p>
        <p class="m-0">{{card.type}}</p>
    </div>
</template>

<style  lang="scss" scoped>
</style>