import { useSharedState } from 'core/hooks/index';
import { useCallback, useRef } from 'react';
import { useAction } from 'use-action';

const userInfoControl = useSharedState({
    userInfo: {},
});

export default function useUserInfo() {
    const isMounted = useRef(false);
    useAction(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    const [userInfo, setUserInfo] = userInfoControl();

    const dispatchUserInfo = useCallback((...args) => {
        if (!isMounted.current) {
            return;
        }
        setUserInfo(...args);
    }, []);
    return [userInfo, dispatchUserInfo];
}
