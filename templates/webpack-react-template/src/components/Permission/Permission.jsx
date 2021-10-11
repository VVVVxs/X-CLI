import { memo, useCallback } from 'react';
import { useUserInfo } from 'core/hooks/index';

export const usePermission = () => {
    const [userInfo = {}] = useUserInfo();
    const permission = userInfo.button || [];

    const checkPermission = useCallback((permissionKey) => {
        let hasPermission = false;

        if (typeof permissionKey === 'string' && permission.includes(permissionKey)) {
            hasPermission = true;
        }

        if (Array.isArray(permissionKey)) {
            for (let i = 0; i < permissionKey.length; i++) {
                const key = permissionKey[i];
                if (permission.includes(key)) {
                    hasPermission = true;
                    break;
                }
            }
        }

        return hasPermission;
    }, [permission]);

    return [permission, checkPermission];
};

const Permission = ({ permissionKey, children }) => {
    const checkPermission = usePermission()[1];

    const hasPermission = checkPermission(permissionKey);

    return hasPermission ? children : null;
};

export default memo(Permission);
