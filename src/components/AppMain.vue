<script>
import AppCounter from './AppCounter.vue';
import AppCard from './AppCard.vue'
import {store} from '../store';
import axios from 'axios';
    export default {
        name:'AppMain',
        components: {
            AppCounter,
            AppCard,
        },
        data() {
            return {
                store,
                archetypeFilter: '',
            };
        },
        methods: {
            getCards() {
                axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php').then((response) => {
                    this.store.cards = response.data.data.slice(0,50);
                    this.store.loaded = true;
                });
            },
            getArchetypes() {
                axios.get('https://db.ygoprodeck.com/api/v7/archetypes.php').then((response) => {
                    const sortedArchetypes = response.data.sort((a, b) => {
                        const nameA = a.archetype_name.toUpperCase();
                        const nameB = b.archetype_name.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                    });
                    this.store.archetypes = sortedArchetypes;
                });
            },
            filterCards() {
                if (this.archetypeFilter != '') {
                    axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php', {
                        params: {
                            archetype: this.archetypeFilter,
                        }
                    }).then((response) => {
                        this.store.cards = response.data.data.slice(0,50);
                    });
                }
                else {
                    this.getCards();
                }
            },
        },
        created() {
            this.getCards();
            this.getArchetypes();
        },
    };
</script>

<template>
    <main class="py-4 bg-primary">
        <div class="container">

            <section class="my-content" v-if="store.loaded">
                <section class="mb-4">
                    <select class="form-select w-25" name="filter" v-model="archetypeFilter" @change="filterCards()">
                        <option value="" selected> Select an archetype</option>
                        <option v-for="archetype in store.archetypes" :value="archetype.archetype_name">
                            {{ archetype.archetype_name }}
                        </option>
                    </select>
                </section>
                <section class="p-5 bg-light">
                    <AppCounter />
                    <div class="row row-cols-5 g-3">
                        <div class="col text-center" v-for="card in store.cards">
                            <AppCard :card="card"/>
                        </div>
                    </div>
                </section>
            </section>
            
            <section v-else class="loader">
                <section class="mb-4 placeholder-glow">
                    <select class="form-select w-25 placeholder"></select>
                </section>
                <section class="p-5 bg-light">
                    <div class="row p-2 bg-dark text-light placeholder-glow">
                        <p class="m-0 w-25 placeholder"></p>
                    </div>
                    <div class="row row-cols-5 g-3">
                        <div class="col text-center " v-for="i in 15">
                            <div class="my-card h-100 p-2 bg-primary placeholder-glow">
                                <img class="img-fluid placeholder" src= "https://via.placeholder.com/168x246?text=" alt="placeholder">
                                <p class="my-3 text-light placeholder-glow">
                                    <span class="placeholder col-6">  </span>
                                </p>
                                <p class="m-0 placeholder-wave">
                                    <span class="placeholder col-6"></span>
                                </p>
                            </div>
                        </div>
                    </div>   
                </section>
            </section>

        </div>
    </main>
</template>

<style  lang="scss" scoped>
</style>