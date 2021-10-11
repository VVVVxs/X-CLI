
import React from 'react';

/**
 * 登出
 * @param {object} props
 * @param {object} props.userInfo
 */
const LogOut = ({ userInfo = {} }) => {
    return (
        <div style={{ textAlign: 'right' }}>
            <h3 style={{ display: 'inline', color: '#ccc' }}>欢迎你：</h3>
            <h3 style={{ display: 'inline', color: '#F49B60' }}>
                {userInfo.userName}
            </h3>
        </div>
    );
};

export default LogOut;
