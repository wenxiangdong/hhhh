import React, { useRef, useMemo, useState, useCallback } from "react";
const VirtualList = ({
    height = 300,
    rowRenderer = ({ index, key, style }) => void 0,
    rowHeight,
    rowCount,
    extraCount = 4
}) => {
    // 整个列表的高度
    const wholeListHeight = useMemo(() => rowHeight * rowCount, [rowHeight, rowCount]);
    /** 
     * @type {React.MutableRefObject<HTMLDivElement>} 
     * 滚动列表的ref
     * */
    const scrollRef = useRef();
    /**
     * 可见的数量，即处于可视区域内的
     */
    const visibleCount = useMemo(() => Math.ceil(height / rowHeight), [height, rowHeight]);
    /** 计算需要渲染的 row下标范围 */
    const computeIndexRange = () => {
        const scrollTop = scrollRef.current ? scrollRef.current.scrollTop : 0;
        const startIndex = Math.floor(scrollTop / rowHeight) - extraCount;
        const endIndex = startIndex + visibleCount + 2 * extraCount;
        return [(startIndex < 0 ? 0 : startIndex), (endIndex < rowCount ? endIndex : rowCount)];
    };
    /** 渲染的row范围 */
    const [renderRange, setRenderRange] = useState(() => computeIndexRange());

    /**
     * 计算某一行的样式，主要是top偏移
     */
    const computeStyle = useCallback((index) => {
        return ({
            position: "absolute",
            top: `${index * rowHeight}px`
        });
    }, [rowHeight])

    const handleScroll = (e) => {
        const [start, end] = computeIndexRange();
        setRenderRange((preRange) => {
            // 判断是否要刷新
            const [preStart, preEnd] = preRange;
            if (preStart !== start || preEnd !== end) {
                return [start, end];
            } else {
                return preRange;
            }
        });
    }

    const rows = useMemo(() => {
        const [start, end] = renderRange;
        console.log("rerender", renderRange)
        return Array(end - start)
            .fill(0)
            .map((_, idx) => {

                const index = start + idx;
                const style = computeStyle(index);
                return rowRenderer({
                    index,
                    style,
                    key: `v-${index}`
                })
            });
    }, [renderRange, computeStyle, rowRenderer])

    return (
        <div ref={scrollRef} style={{ height, overflow: "scroll" }} onScroll={handleScroll}>
            <div style={{ position: 'relative', height: wholeListHeight }}>
                {
                    rows
                }
            </div>
        </div>
    );
}

export default VirtualList;