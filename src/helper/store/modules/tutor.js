/* filter data for stundet */
export const namespaced = true

export const state = {
    city_id_list: [],
    class_id_list: [],
    student_status_list: [1],
    profile_status: "",
    filter_date_from: "",
    filter_date_to: "",
    filter_count: 0,
    time_slot_id_list: [],
    pincode_list: [],
    gender: ""
}

export const mutations = {
    SET_FILTER(state, {
        city_id_list,
        class_id_list,
        student_status_list,
        profile_status,
        time_slot_id_list,
        filter_date_from,
        filter_date_to,
        pincode_list,
        filter_count,
        gender,
    }) {
        state.city_id_list = city_id_list
        state.class_id_list = class_id_list
        state.student_status_list = student_status_list
        state.profile_status = profile_status
        state.time_slot_id_list = time_slot_id_list
        state.filter_date_from = filter_date_from
        state.filter_date_to = filter_date_to
        state.pincode_list = pincode_list
        state.gender = gender
        state.filter_count = filter_count
    },
}
export const actions = {
    setFilter({ commit }, items) { commit('SET_FILTER', items) },
}
export const getters = {
    getFilter: state => {
        return state;
    },
}