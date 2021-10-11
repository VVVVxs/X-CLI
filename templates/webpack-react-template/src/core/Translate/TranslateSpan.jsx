/**
 * @description:
 * @author: 周金顺（周大胖子） <zhoudapangzi@douyu.tv>
 * @copyright:  © 2020 DouYu.tv
 */

import TranslateText from './TranslateText';

const TranslateSpan = (props) => {
    return (
        <span>
            <TranslateText
                {...props}
            />
        </span>
    );
};

export default TranslateSpan;
