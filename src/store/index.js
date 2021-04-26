import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

import company from './modules/company'
import items from './modules/items'
import dates from './modules/dates'
import booking from './modules/booking'

Vue.config.devtools = true;
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    apiKey: 'someApiKey'
  },
  modules: {
    company,
    items,
    dates,
    booking
  },
  actions: {
    fetchData({ state }, companyId) {
      // this.dispatch("company/fetchCompanyWhatever", { apiKey: state.apiKey, companyId })
      // .then(company => {
          this.dispatch("items/fetchItems", { apiKey: state.apiKey, companyId })
      // });
    }
  }
});


// import {
//   getCompanyServices,
//   getCompanyService,
//   getServiceComponents,
//   sumbitCompilation
// } from '@/http'

// export default new Vuex.Store({
//   strict: true,
//   modules: {
//     company,
//   },
//   state: {
//     error: null,

//     dateMode: "WITHOUT_DATE", // ["WITH_DATE", "WITHOUT_DATE"]

//     servicesList: [],
//     selectedService: null,

//     modificationsList: [],
//     selectedModification: null,

//     addressesList: [],
//     selectedAddress: null,

//     personalList: [],
//     selectedPersonal: null,

//     dateOptions: [
//       { label: 'Выбрать время', mode: "WITH_DATE" },
//       { label: 'Без выбора даты и времени', mode: "WITHOUT_DATE" }
//     ],
//   },
//   actions: {
//     async fetchServices({ commit, rootState }) {
//       try {
//         const response = await getCompanyServices(rootState);
//         commit('setServicesList', response.data);
//       } catch (e) {
//         commit('setError', e)
//       }
//     },

//     async selectService({ commit, state, rootState, dispatch }, serviceId) {
//       if (0 !== state.servicesList.length) {
//         const service = state.servicesList.find((serviceItem) => serviceItem.id === serviceId);

//         commit('setSelectedService', service);
//       } else {
//         try {
//           const response = await getCompanyService(rootState, serviceId);
//           commit('setSelectedService', response.data);
//         } catch (e) {
//           commit('setError', e)
//         }
//       }
//     },

//     async fetchServiceСomponents({ commit, state, rootState, dispatch }) {
//       const { companyId, apiKey } = rootState.company;
//       const serviceId = rootState.selectedService.id;

//       try {
//         const response = await getServiceComponents(rootState, serviceId, { dateMode: state.dateMode });
//         commit('setServiceComponents', response.data);
//       } catch (e) {
//         commit('setError', e)
//       }
//     },

//     selectModification({ commit }, modification) {
//       commit('setSelectedModification', modification);
//     },

//     selectAddress({ commit }, address) {
//       commit('setSelectedAddress', address);
//     },

//     selectPersonal({ commit }, modification) {
//       commit('setSelectedPersonal', modification);
//     },

//     async sumbitCompilationForm({ commit, rootState, state }) {
//       const response = await sumbitCompilation(rootState, {
//         companyId: state.company.companyId,
//         serviceId: state.selectedService.id,
//         addressId: state.selectedAddress ? state.selectedAddress.id : null,
//         userId: state.selectedPersonal ? state.selectedPersonal.id : null,
//       });

//       console.log(response);
//     },
//   },
//   getters: {
//     servicesList(state) {
//       return state.servicesList;
//     },
//     selectedService(state) {
//       return state.selectedService;
//     },
//     modificationsList(state) {
//       return state.modificationsList;
//     },
//     selectedModification(state) {
//       return state.selectedModification;
//     },
//     addressesList(state) {
//       return state.addressesList;
//     },
//     selectedAddress(state) {
//       return state.selectedAddress;
//     },
//     personalList(state) {
//       return state.personalList;
//     },
//     selectedPersonal(state) {
//       return state.selectedPersonal;
//     },
//   },
//   mutations: {
//     setServicesList(state, services) {
//       state.servicesList = services;
//     },
//     setSelectedService(state, service) {
//       state.selectedService = service;
//     },
//     setServiceComponents(state, { addreses, modifications, personal }) {
//       state.modificationsList = modifications;
//       state.addressesList = addreses;
//       state.personalList = personal;
//     },
//     setSelectedModification(state, modification) {
//       state.selectedModification = modification;
//     },
//     setSelectedAddress(state, address) {
//       state.selectedAddress = address;
//     },
//     setSelectedPersonal(state, modification) {
//       state.selectedPersonal = modification;
//     },
//     setError(state, error) {
//       state.error = error;
//     },
//   },
// })
