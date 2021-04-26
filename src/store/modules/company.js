export default {
  namespaced: true,
  state: {
    companyId: null,
    apiKey: '',
  },
  actions: {
    setWidgetSettings({ commit }, settings) {
      commit('setWidgetSettings', settings);
    }
  },
  mutations: {
    setWidgetSettings(state, settings) {
      state.companyId = settings.companyId;
      state.apiKey = settings.apiKey;
    }
  },
  getters: {
    widgetCompany(state) {
      return state.companyId;
    },
    apiKey(state) {
      return state.apiKey;
    }
  },
}