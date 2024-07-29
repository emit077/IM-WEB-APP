/* filter data for lead */
export const namespaced = true

export const state = {
    lead_status_list: [],
    lead_type_list: [],
    city_id_list: [],
    bda_id_list: [],
    filter_date_from: "",
    filter_date_to: "",
    filter_count: 0,
}

export const mutations = {
    SET_FILTER(state, {
        lead_status_list,
        lead_type_list,
        city_id_list,
        bda_id_list,
        filter_date_from,
        filter_date_to,
        filter_count,
    }) {
        state.lead_status_list = lead_status_list
        state.lead_type_list = lead_type_list
        state.city_id_list = city_id_list
        state.bda_id_list = bda_id_list
        state.filter_date_from = filter_date_from
        state.filter_date_to = filter_date_to
        state.filter_count = filter_count
    },
}
export const actions = {
    setFilter({
                  commit
              }, items) {
        commit('SET_FILTER', items)
    },
}
export const getters = {
    getFilter: state => {
        return state;
    },
}