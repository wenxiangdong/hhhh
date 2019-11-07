import React, { useContext } from 'react';
import { MessageContext } from './message/message';
export default () => {
    const {enqueue} = useContext(MessageContext);
    const addMessage = () => {
        console.log('click')
        enqueue({
          title: '消息',
          duration: 2000
        })
      }
    return <button onClick={addMessage}>add</button>;
}