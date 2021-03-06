import api from '../../fetch/api'
import * as types from '../types'


const state = {
    // 用户登录状态
    loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
    // 用户登录信息
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    // 用户数据信息
    userData: []
}

const actions = {
    /**
     * 用户登录
     * @param {any} {commit}
     * @param {any} accesstoken
     */
    setUserInfo({ commit }, res) {
        localStorage.setItem('userInfo', JSON.stringify(res))
        localStorage.setItem('loginStatus', true)
        commit(types.SET_USER_INFO, res)
        commit(types.SET_LOGIN_STATUS, true)
    },

    /**
     * 退出登录
     * @param {any} {commit}
     */
    setSignOut({ commit }) {
        localStorage.removeItem('loginStatus')
        localStorage.removeItem('userInfo')
        commit(types.SET_LOGIN_STATUS, false)
        commit(types.SET_USER_INFO, {})
    },

    /**
     * 请求用信息
     * @param {any} {commit}
     * @param {any} name
     */
    getUserData({ commit }, name) {
        commit(types.COM_LOADING_STATUS, true)
        api.UserInfo(name)
            .then(res => {
                commit(types.COM_LOADING_STATUS, false)
                commit(types.GET_USER_DATA, res.data)
            })
    }
}

const getters = {
    getUserData: state => state.userData
}

const mutations = {
    [types.SET_USER_INFO](state, res) {
        state.userInfo = res
    },
    [types.SET_LOGIN_STATUS](state, status) {
        state.loginStatus = status
    },
    [types.GET_USER_DATA](state, res) {
        state.userData = res
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}