/* filter data for stundet */
export const namespaced = true

export const state = {
    status_list: [],
    filter_date_from: "",
    filter_date_to: "",
    filter_count: 0,
}

export const mutations = {
    SET_FILTER(state, {
        status_list,
        filter_date_from,
        filter_date_to,
        filter_count,
    }) {
        state.status_list = status_list
        state.filter_date_from = filter_date_from
        state.filter_date_to = filter_date_to
        state.filter_count = filter_count
    },
}
export const actions = {
    setFilter({commit}, items) {
        commit('SET_FILTER', items)
    },
}
export const getters = {
    getFilter: state => {
        return state;
    },
}