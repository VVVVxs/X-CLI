/** 存放一些公用hook */

import { useEffect, useState, useCallback, useRef } from 'react';
import { message } from 'antd';
import useSafeState from './useSafeState';

export { default as useEffectOnce } from './useEffectOnce';
export { default as useMeasure } from './useMeasure';
export { default as useMeasureDirty } from './useMeasureDirty';
export { default as useRenderCount } from './useRenderCount';
export { default as useSharedState } from './useSharedState';
export { default as useTableState } from './useTableState';
export { default as useUserInfo } from './useUserInfo';

export { useSafeState };

/**
 *
 * @param {Promise} service promise请求
 * @param {object} payload 参数
 * @param {Array} desp 依赖项
 */
export const useDataApi = (service, payload, desp) => {
    // data 请求后的数据 loadding事请求的状态
    const [result, setResult] = useState({ data: undefined, loading: false });
    let isDidGetData = false;

    useEffect(() => {
        setResult({ data: undefined, loading: true });
        const changeState = (prevState) => {
            const newState = JSON.parse(JSON.stringify(prevState));

            newState.loading = false;

            return newState;
        };
        const request = async () => {
            service(payload || {}).then((res) => {
                if (!isDidGetData && res.code === 0) {
                    setResult({ data: res.data, loading: false });
                }
            }).catch((err) => {
                setResult(changeState);
                message.warn(err.reason || '请求失败');
            });
        };

        request();

        return () => {
            isDidGetData = true;
        };
    }, desp || []);

    return result;
};

/**
 * 合并组件的状态，避免多次更新状态导致的重复更新
 * @param {object}} initialState 初始值
 */
export const useSetState = (initialState) => {
    const [state, setState] = useSafeState(initialState);
    const setMergeState = useCallback(
        (patch) => {
            setState((prevState) => Object.assign({}, prevState, patch instanceof Function ? patch(prevState) : patch));
        },
        [setState],
    );

    return [state, setMergeState];
};

/**
 * 持久化函数，保证引用地址不会变，并且函数依旧能获取外部最新状态
 * @param {*} fn 函数
 */
export const usePersistenceFn = (fn) => {
    const ref = useRef(() => { });
    ref.current = fn;

    return useCallback((...args) => ref.current(...args), [ref]);
};
