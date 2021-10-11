/**
 * @description: 跟踪HTML元素的尺寸变更
 * @author: 周金顺（周大胖子） <zhoudapangzi@douyu.tv>
 * @copyright:  © 2020 DouYu.tv
 */

import { useLayoutEffect, useMemo, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useMeasure = () => {
    const [elem, ref] = useState(null);
    const [rect, setRect] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    });

    const observer = useMemo(
        () => new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                const { x, y, width, height, top, left, bottom, right } = entry.contentRect;
                setRect({ x, y, width, height, top, left, bottom, right });
            }
        }),
        [],
    );

    useLayoutEffect(() => {
        if (!elem) return () => {};
        observer.observe(elem);
        return () => {
            observer.disconnect();
        };
    }, [elem]);

    return [ref, rect];
};

export default useMeasure;
