import axios from 'axios'

const apiUrlPrefix = '/api/v1';

export function getCompanyServices(state) {
    const { companyId, apiKey } = state.company;

    return axios.get(`${apiUrlPrefix}/${companyId}/services`, { params: { api_key: apiKey } });
}

export function getCompanyService(state, serviceId) {
    const { companyId, apiKey } = state.company;

    return axios.get(`${apiUrlPrefix}/${companyId}/services/${serviceId}`, { params: { api_key: apiKey } });
}


export function getServiceComponents(state, serviceId, {dateMode}) {
    const { companyId, apiKey } = state.company;

    return axios.get(`${apiUrlPrefix}/${companyId}/services/${serviceId}/components`, { 
        params: {
          api_key: apiKey,
          date_mode: dateMode,
        }
      });
}

export function sumbitCompilation(state, payload) {
    const { companyId, apiKey } = state.company;
    console.log(state);

    return axios.post(`${apiUrlPrefix}/${companyId}/compilation`, {
        api_key: apiKey,
        ...payload,
    });
}