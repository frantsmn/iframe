export default {
    namespaced: true,
    state: {
        pickedDate: null,
        pickedEvent: null
    },
    getters: {

    },
    mutations: {
        applyDate(state, date) {
            state.pickedDate = date;
            console.log('[vuex] Date applied', state.pickedDate);
        },
        applyEvent(state, event) {
            state.pickedEvent = event;
            console.log('[vuex] Event applied', state.pickedEvent);
        },
    },
    actions: {

    }
}
