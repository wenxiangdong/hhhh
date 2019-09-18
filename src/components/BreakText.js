import React, {useState, useCallback} from "react";
import {makeStyles} from "@material-ui/styles";

const useStyle = makeStyles({
    text: ({lines}) => ({
        display: '-webkit-box',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textAlign: 'justify',
    }),
    text_all: {
        WebkitLineClamp: 'unset',
        textAlign: 'justify',
    },
    bottom: {
        marginTop: '8px',
        textAlign: 'right',
        color: '#C9C9C9',
    },
})
const BreakText = ({style, children, lines}) => {
    const styles = useStyle({lines});
    const [showMore, setShowMore] = useState(false);
    const handleClickShowMore = useCallback(() => {
        setShowMore(pre => !pre);
    });
    return (
        <div >
            <input 
            checked={showMore}
            onChange={handleClickShowMore}
            className={styles.input} 
            type='checkbox' 
            name='more' 
            id='more' 
            style={{display: 'none'}}/>
            <div className={`${showMore ? styles.text_all : styles.text}`}>{children}</div>
            <div className={styles.bottom}>
                <label htmlFor='more'>
                    {showMore ? '收起' : '更多'}
                </label>
            </div>
        </div>
    );
}

BreakText.defaultProps = {
    lines: 3,
    style: {},
}
export default BreakText;