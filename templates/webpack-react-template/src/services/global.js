import { axios } from 'util/Remote';

// 获取用户信息
export const getUserInfo = () => {
    return axios.get('/api/crm/userInfo');
};
