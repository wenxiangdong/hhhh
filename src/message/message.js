// @flow
import React, {useState, useCallback, useRef} from 'react';
import './message.css';
interface MessageItem {
    title: String;
    type: 'success' | 'error' | 'info',
    duration: Number
}
export const MessageContext = React.createContext({
    enqueue: (item: MessageItem) => {}
});

/**
 * 消息显示组件，后期考虑可以自行配置
 */
const MessageBar: React.FC<{message: MessageItem}> = ({message}) => {
    const bgColors = {
        info: '#2d8cf0',
        error: '#ed3f14',
        success: '#19be6b'
    }
    return (
        <div 
        style={{backgroundColor: bgColors[(message || {}).type]}}
        className={`MessageBar ${message ? 'MessageBar--show' : 'MessageBar--hidden'}`}>
           {message && message.title} 
        </div>
    );
}

const BACK_DURATION = 3000;
const DEAULT_DURATION = 3000;
const TRANSITION_TIME = 500;
export const MessageProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    const [messageToShow, setMessageToShow] = useState();
    /** 消息队列 */
    const messageList = useRef(/** @type {MessageItem[]} */[]);
    /** 消息进队 */
    const enqueueMessage = useCallback((item: MessageItem) => {
        item = {type: 'info', duration: DEAULT_DURATION, ...item};
        console.log('enqueue a message', item);
        messageList.current = [...messageList.current, item];
        checkMessage();
    }, [messageList]);
    /** 当前消息显示是否繁忙 */
    const busy = useRef(false);
    /** 显示消息 */
    const showMessage = useCallback((item: MessageItem) => {
        if (busy.current) {
        } else {
            busy.current = true;
            /** 真正的显示消息 */
            console.log('show a message', item);
            setMessageToShow(item);
            setTimeout(() => {
                busy.current = false;
                setMessageToShow(null);
            }, item.duration);
        }
    }, []);

    const checkMessage = useCallback(() => {
        if (!busy.current && messageList.current.length) {
            const item = messageList.current.shift();
            showMessage(item);
            setTimeout(checkMessage, item.duration + TRANSITION_TIME);
        }
    }, [messageList]);
   

    return (
        <MessageContext.Provider value={{
            enqueue: enqueueMessage
        }}>
            <MessageBar message={messageToShow} />
            {children}
        </MessageContext.Provider>
    );
}

