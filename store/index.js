import Backend from "@/services/BackendService.js";
// State
export const state = () => ({
    favorites: [],
    listPokemons: [],
    list: []
})

// Getters
export const getters = {
    getFavorite(state, id) {
        let exist = state.favorites.indexOf(id);
        return exist ? true : false
    },
    getAllFavorites(state) {
        return state.favorites
    },
    getListFavorites(state) {
        return state.list?.filter((item) => item.fav == true)
    },
    getListAll(state) {
        return state.list
    }
}

// Actions
export const actions = {
    newFavorite({ commit }, value) {
        commit('addFavorite', value.id);
    },
    getOneFavorite({ commit }, value) {
        commit('getOneFavorite', value.id);
    },
    setNewList({ commit }, value) {
        commit('addNewList', value)
    },
    getPokemonsApi({ commit }) {
        Backend.getAllPokemons()
            .then((response) => {
                let pokemons = response.data.results;
                commit('createList', pokemons)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    setListOnlyFavorite({ commit }) {
        commit('setOnlyFavoriteList')
    },
    setListAll({ commit }) {
        commit('setAllPokemonsList')
    }
}
// Mutattions
export const mutations = {
    createList(state, pokemons) {
        for (let i = 0; i < pokemons.length; i++) {
            const element = pokemons[i];
            let fav = state.favorites?.filter(
                (item) => item === element.name
            );
            element["fav"] = fav.length < 1 ? false : true;
        }
        state.list = pokemons
        state.listPokemons = pokemons
    },
    addFavorite(state, favorite) {
        let exist = state.favorites?.indexOf(favorite);
        if (exist === -1) {
            state.favorites.push(favorite)
        }
    },
    getOneFavorite(state, favorite) {
        let exist = state.favorites?.indexOf(favorite);
        return (exist === -1) ? false : true
    },
    addNewList(state, list) {
        state.list = list
        state.listPokemons = list
    },
    setOnlyFavoriteList(state) {
        const favorite = state.list?.filter((item) => item.fav == true)
        state.list = favorite
    },
    setAllPokemonsList(state) {
        const listAll = state.listPokemons
        state.list = listAll
    },
    emptyList(state) {
        state.listPokemons = []
        state.listPokemonsFavorite = []
    },
}
