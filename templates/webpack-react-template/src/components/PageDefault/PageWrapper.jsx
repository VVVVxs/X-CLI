/**
 * @description:
 * @author: 周金顺（周大胖子） <zhoudapangzi@douyu.tv>
 * @copyright:  © 2020 DouYu.tv
 */

const PageWrapper = ({ children }) => {
    return (
        <div
            style={{
                padding: '0 12px',
                minHeight: 'calc(100vh - 110px)',
            }}
        >
            {children}
        </div>
    );
};

export default PageWrapper;
