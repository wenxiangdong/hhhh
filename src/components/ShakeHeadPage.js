import React, { useMemo, useState, useRef, useEffect, useLayoutEffect } from 'react';
import {makeStyles} from '@material-ui/styles';
import useDrag from '../hooks/use-drag';

const useStyle = makeStyles({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
    },
    wrapper: {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
    },
    page: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        boxSizing: 'border-box',
        transition: 'left 0.5s'
    },
    main_page: {
        boxShadow: 'rgba(0,0,0,0.1) 0 0 5px',
        zIndex: 10,
    },
    touch_area: ({margin}) => ({
        width: margin + 'px',
        position: 'absolute',
        top: '32px',
        bottom: '32px',
        backgroundColor: 'gray',
    }),
    touch_area_left: {
        left: 0,
    },
    touch_area_right: {
        right: 0,
    },
})

const SLIDE_DISTANCE = 64;
/**
 * 
 * @param {{
 * left: React.ReactNode;
 * right: React.ReactNode;
 * children: React.ReactNode;
 * margin: number;
 * }} props
 */
const ShakeHeadPage = ({left, right, children, margin}) => {
    const styles = useStyle({margin});
    const [onDrag, [x], [preX]] = useDrag();
    const preLeft = useRef('0px');
    const [leftPosition, setLeftPosition] = useState('0px');


    useLayoutEffect(() => {
        const delt = x - preX;
        if (delt < - SLIDE_DISTANCE) {
            setLeftPosition(pre => pre === '0px' ? `calc(${margin}px - 100vw)` : '0px');
        } else if (delt > SLIDE_DISTANCE) {
            setLeftPosition(pre => pre === '0px' ? `calc(100vw - ${margin}px)` : '0px');
        }
    }, [x, preX, margin]);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={`${styles.page} ${styles.main_page}`} style={{left: x}}>
                    <div className={`${styles.touch_area} ${styles.touch_area_left}`} {...onDrag}></div>
                    <div className={`${styles.touch_area} ${styles.touch_area_right}`} {...onDrag}></div>
                    {children}
                </div>
            </div>
        </div>
    );
};

ShakeHeadPage.defaultProps = {
    margin: 16,
}

export default ShakeHeadPage;