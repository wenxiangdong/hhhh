import React, {useMemo, useState, useCallback, useLayoutEffect} from "react";
import useDrag from "../hooks/use-drag";
import { makeStyles } from "@material-ui/styles";

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
        // padding: '8px',
        width: '100%',
        // minHeight: '32px',
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        backgroundColor: 'white',
        boxShadow: 'rgba(0,0,0,0.1) 2px 0 3px',
        transition: 'left 0.5s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        borderRight: 'white 1px solid',
    },
};


/**
 * 
 * @param {{
    * actions: {label: React.ReactNode; action: () => void; color: string;}[];
    * style: React.CSSProperties;
    * children: React.ReactNode;
    * mode: 'under' | 'after';  // 表示菜单是被覆盖在下方，还是紧跟在后面
    * enableAutoClose: boolean;
    * }} props
    */
export default function SwiperAction ({children, mode = 'under', ...rest}) {
    let component;
    switch(mode) {
        case 'under':
            component = (<SwiperActionUnder {...rest}>{children}</SwiperActionUnder>);
            break;
        case 'after':
            component = (<SwiperActionAfter {...rest}>{children}</SwiperActionAfter>);
            break;
        default:
            throw new Error('mode not supported');
    }
    return component;
}

/**
 * 
 * @param {{
 * actions: {label: React.ReactNode; action: () => void; color: string;}[];
 * style: React.CSSProperties;
 * children: React.ReactNode
 * }} props
 */
function SwiperActionUnder ({actions, style, children, enableAutoClose}) {
    const [onDrag, [x], [preX]] = useDrag([0, 0]);
    const [left, setLeft] = useState('0px');

    useLayoutEffect(() => {
        // 最左位移，也就 action 按钮的总宽度 取反
        const limit = -ACTION_WIDTH * actions.length;
        // 这次位移与上次位移的差值
        const delt = x - preX;
        
        // 到底之后不再可以划动
        if (x > 0) {
            setLeft('0px');
            return;
        }
        if (x < limit) {
            setLeft(limit + 'px');
            return;
        }

        if (delt <= 0) {    // 向左划
            setLeft(`${delt < -ACTION_WIDTH ? limit : 0}px`);
        } else {    // 向右划
            setLeft(`${delt > ACTION_WIDTH ? 0 : limit}px`);
        }
    }, [x, actions]);

    const handleClickMenu = useCallback(() => {
        enableAutoClose && setLeft('0px');
    }, [enableAutoClose]);

    const actionButtons = useMemo(() => (
        <div style={styles.actionGroup} onClick={handleClickMenu}> 
        {actions.map((item, index) => (
            <div 
            key={item.label} 
            style={{...styles.action, backgroundColor: item.color || ACTION_COLOR}} 
            onClick={item.action}>
                {item.label}
            </div>
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



const useStyle = makeStyles({
    wrapper: {
        width: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
        position: 'relative',
    },
    container: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        minHeight: '32px',
        boxSizing: 'border-box',
        transition: 'left 0.5s',
        display: 'flex',
    },
    content: {
        // minHeight: '32px',
        boxSizing: 'border-box',
        backgroundColor: 'white',
        boxShadow: 'rgba(0,0,0,0.1) 2px 0 3px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    action: {
        width: `${ACTION_WIDTH}px`,
        padding: '8px',
        boxSizing: 'border-box',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRight: 'white 1px solid',
    },
    actionGroup: {
        display: 'flex',
        alignItems: 'center',
    },

})

/**
 * 
 * @param {{
* actions: {label: React.ReactNode; action: () => void; color: string;}[];
* style: React.CSSProperties;
* children: React.ReactNode
* }} props
*/
function SwiperActionAfter ({actions, style, children, enableAutoClose}) {
    const styles = useStyle();
    
    // const [left, setLeft] = useState('0px');

    const [onDrag, [x], [preX]] = useDrag([0, 0]);

    const [left, setLeft] = useState('0px');

    useLayoutEffect(() => {
        // 最左位移，也就 action 按钮的总宽度 取反
        const limit = -ACTION_WIDTH * actions.length;
        // 这次位移与上次位移的差值
        const delt = x - preX;
        
        // 到底之后不再可以划动
        if (x > 0) {
            setLeft('0px');
            return;
        }
        if (x < limit) {
            setLeft(limit + 'px');
            return;
        }

        if (delt <= 0) {    // 向左划
            setLeft(`${delt < -ACTION_WIDTH ? limit : 0}px`);
        } else {    // 向右划
            setLeft(`${delt > ACTION_WIDTH ? 0 : limit}px`);
        }
    }, [x, actions]);

    const handleClickMenu = useCallback(() => {
        enableAutoClose && setLeft('0px');
    }, [enableAutoClose]);

    const actionButtons = useMemo(() => (
        <div onClick={handleClickMenu} className={styles.actionGroup}>
            {
                actions.map((item, index) => (
                    <div 
                    key={item.label} 
                    className={styles.action}
                    style={{backgroundColor: item.color || ACTION_COLOR}} 
                    onClick={item.action}>
                        {item.label}
                    </div>
                ))
            }
        </div>
    ), [actions]);
    const containerWidth = useMemo(() => {
        return `calc(100% + ${actions.length} * ${ACTION_WIDTH}px)`;
    }, [actions]);
    const contentWidth = useMemo(() => `calc(100% - ${actions.length} * ${ACTION_WIDTH}px)`, [actions]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container} style={{width: containerWidth, left}} {...onDrag}>
                <div className={styles.content} style={{width: contentWidth}}>
                    {children}
                </div>
                {actionButtons}
            </div>
        </div>
    );
}

SwiperAction.defaultProps = {
    actions: [],
    style: {},
}