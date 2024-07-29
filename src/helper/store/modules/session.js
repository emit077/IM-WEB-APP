/* filter data for stundet */
export const namespaced = true

export const state = {
    class_id_list: [],
    // student_status_list: [1],
    filter_date_from: "",
    filter_date_to: "",
    filter_count: 0,
}

export const mutations = {
    SET_FILTER(state, {
        class_id_list,
        // student_status_list,
        filter_date_from,
        filter_date_to,
        filter_count,
    }) {
        state.class_id_list = class_id_list
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