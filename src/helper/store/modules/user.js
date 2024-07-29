export const namespaced = true

export const state = {
    name: localStorage.getItem("name") || null,
    account_type: localStorage.getItem("account_type") || null,
}

export const mutations = {
    SET_USER(state, {name, account_type}) {
        state.name = name
        state.account_type = account_type
    },
}

export const actions = {
    setUser({commit}, items) {
        commit('SET_USER', items)
    },
}
export const getters = {
    getUser: state => {
        return state;
    },
}