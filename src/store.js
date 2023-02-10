import {reactive} from 'vue'

export const store = reactive ({
    cards: [],
    archetypes: [],
    loaded: false,
});