/**
 * @description:
 * @author: 周金顺（周大胖子） <zhoudapangzi@douyu.tv>
 * @copyright:  © 2020 DouYu.tv
 */

import { useLayoutEffect } from 'react';
import useSafeState from './useSafeState';
import useEffectOnce from './useEffectOnce';

export default function createSharedState(initialState = {}, key = '#:global') {
    const store = {
        state: {
            ...initialState,
            __storeKey: key, // 注入key值，方便调试追踪
        },
        storeKey: key,
        setters: [],
        setState(state) {
            let realState = state;
            const { __storeKey, ...otherState } = store.state;
            if (typeof state === 'function') {
                realState = state(otherState);
            }
            store.state = {
                ...realState,
                __storeKey,
            };
            store.setters.forEach((setter) => setter(store.state));
        },
    };

    const hook = () => {
        const [sharedState, stateSetter] = useSafeState(store.state);

        useEffectOnce(() => () => {
            // 组件注销时，删除 setter 事件
            store.setters = store.setters.filter((setter) => setter !== stateSetter);
        });

        useLayoutEffect(() => {
            // 组件挂载时增加事件
            if (!store.setters.includes(stateSetter)) {
                store.setters.push(stateSetter);
            }
        });

        return [sharedState, store.setState];
    };

    Object.defineProperty(hook, 'data', {
        get: () => store.state,
    });

    return hook;
}
