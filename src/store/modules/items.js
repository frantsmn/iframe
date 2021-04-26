export default {
    namespaced: true,
    state: {
        items: []
    },
    getters: {},
    mutations: {
        applyItems(state, items) {
            state.items = items;
            console.log('[vuex] Items applied', state.items);
        }
    },
    actions: {
        fetchItems() {
            return new Promise((resolve, reject) => {
                fetch("./data/widget/cards.json")
                    .then(response => response.json())
                    .then(items => {
                        console.log('[vuex] Items loaded', items);
                        this.commit('items/applyItems', items);
                        resolve();
                    })
                    .catch(error => {
                        console.error('[vuex] action "fetchItems", ', error);
                        reject(error);
                    })
            });
        }
    }
}
