/**
 * @description: 更加安全的setState， 在调用组件已经 unmount 时，将不会继续执行setState方法
 * @author: 周金顺（周大胖子） <zhoudapangzi@douyu.tv>
 * @copyright:  © 2020 DouYu.tv
 */

import { useState, useRef, useCallback } from 'react';
import { useAction } from 'use-action';

const useSafeState = (...args) => {
    const isMounted = useRef(false);

    const [state, setState] = useState(...args);

    const dispatchState = useCallback((...arg) => {
        if (!isMounted.current) {
            return;
        }

        setState(...arg);
    }, []);

    useAction(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, []);

    return [state, dispatchState];
};

export default useSafeState;
