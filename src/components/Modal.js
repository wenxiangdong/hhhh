import React from 'react';
import { makeStyles } from '@material-ui/styles';
const useStyle = makeStyles({
    overlay: {
        position: 'fixed',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        backgroundColor: 'rgba(0,0,0,0.3)',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: '15px',
        overflow: 'auto',
        boxSizing: 'border-box',
    }
});