/* filter data for stundet */
export const namespaced = true

export const state = {
    subscription_status: 'All',
    page_number: 1,
}

export const mutations = {
    SET_FILTER(state, {
        subscription_status,
        page_number,
    }) {
        state.subscription_status = subscription_status
        state.page_number = page_number
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