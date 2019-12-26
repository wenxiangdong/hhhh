import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { useEventCallback } from 'rxjs-hooks';
import {map, withLatestFrom, switchMap, takeUntil, tap} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import useDrag from './hooks/use-drag';
import SwiperAction from './components/SwiperAction';
import BreakText from './components/BreakText';
import "web-animations-js/web-animations-next-lite.min";
import { MessageContext, MessageProvider } from './message/message';
import Button from './Button';
import GradientBackground from './components/GradientBackground';

const actions = [{
  label: '编辑',
  action: () => console.log('编辑'),
}, {
  label: '分享',
  action: () => console.log('删除'),
}, {
  label: '删除',
  action: () => console.log('删除'),
  color: 'tomato',
}];
const left = <div style={{width: '100vw', height: '100vh', backgroundColor: 'tomato'}}></div>
function App() {

  const {enqueue} = useContext(MessageContext);
  

  const [onDrag, [x, y]] = useDrag();
  return (
    <MessageProvider>
      <div className="App" >
        <GradientBackground />
      </div>
    </MessageProvider>
  );
}

export default App;
