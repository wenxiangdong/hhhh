import React, {useMemo, useState, useCallback} from "react";
import useDrag from "../hooks/use-drag";

const ACTION_WIDTH = 64;
const ACTION_COLOR = '#6190E8';
/** @type {{[key: string]: React.CSSProperties}} */
const styles = {
    wrapper: {
        width: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
    },
    content: {
        padding: '8px',
        width: '100%',
        minHeight: '32px',
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        backgroundColor: 'white',
        boxShadow: 'rgba(0,0,0,0.1) 2px 0 3px',
        transition: 'left 0.5s'
    },
    actionGroup: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    action: {
        width: `${ACTION_WIDTH}px`,
        padding: '8px',
        boxSizing: 'border-box',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

/**
 * 
 * @param {{
 * actions: {label: string; action: () => void; color: string;}[];
 * style: React.CSSProperties;
 * children: React.ReactNode
 * }} props
 */
export default function SwiperAction ({actions, style, children}) {
    const [onDrag, [x, y], [preX, preY]] = useDrag([0, 0]);

    const [reset, setReset] = useState(false);

    const left = useMemo(() => {
        console.log(x, preX, reset);
        // 最左位移，也就 action 按钮的总宽度 取反
        const limit = -ACTION_WIDTH * actions.length;
        // 这次位移与上次位移的差值
        const delt = x - preX;
        
        // 到底之后不再可以划动
        if (x > 0) {
            return 0;
        }
        if (x < limit) {
            return limit;
        }

        if (delt <= 0) {    // 向左划
            return delt < -ACTION_WIDTH ? limit : 0;
        } else {    // 向右划
            return delt > ACTION_WIDTH ? 0 : limit;
        }
    }, [x, actions, preX, reset]);

    const actionButtons = useMemo(() => (
        <div style={styles.actionGroup}>
        {actions.map((item, index) => (
            <span 
            key={item.label} 
            style={{...styles.action, backgroundColor: item.color || ACTION_COLOR}} 
            onClick={item.action}>
                {item.label}
            </span>
        ))}
        </div>
    ), [actions]);
    return (
        <div style={{...styles.wrapper, ...style}}>
            <div style={{...styles.content, left: left}} {...onDrag}>{children}</div>
            {actionButtons}
        </div>
    );
}