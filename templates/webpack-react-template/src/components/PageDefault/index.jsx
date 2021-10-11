
import { translate } from 'core/Translate';
import { connect } from 'dva';

export { default as PageWrapper } from './PageWrapper';

const mapStateToProps = (state) => {
    return {
        userInfo: state.global.userInfo,
    };
};
const PageDefault = ({ userInfo = {} }) => {
    console.log('usereInfo', userInfo);
    return (
        <div className="welcome-container">
            <div className="welcome-content">
                欢迎你：<span>{userInfo.userCode || ''}</span>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, null)(PageDefault);
