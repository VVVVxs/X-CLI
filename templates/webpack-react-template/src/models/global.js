/**
 *  声明当前model层
 */

import { getUserInfo } from 'services/global';

export default {
    namespace: 'global',

    state: {
        menuList: [],
        robotList: [],
        userInfo: {},
    },

    effects: {
        * getUserInfo({ payload }, { call, put }) {
            const response = yield call(getUserInfo);
            if (response.data.code === 0) {
                return response.data.data;
            }
            return {};
        },

    },

    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
};
