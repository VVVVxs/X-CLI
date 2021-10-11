/**
 * @description: 获取组件渲染次数
 * @author: 周金顺（周大胖子） <zhoudapangzi@douyu.tv>
 * @copyright:  © 2020 DouYu.tv
 */

import { useRef } from 'react';

export default function useRenderCount() {
    const count = useRef(0);
    count.current += 1;
    return count.current;
}
