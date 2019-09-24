import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useEventCallback } from 'rxjs-hooks';
import {map, withLatestFrom, switchMap, takeUntil, tap} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import useDrag from './hooks/use-drag';
import SwiperAction from './components/SwiperAction';
import BreakText from './components/BreakText';
import ShakeHeadPage from './components/ShakeHeadPage';
import "web-animations-js/web-animations-next-lite.min";

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

  const [onDrag, [x, y]] = useDrag();
  return (
    <div className="App" >
      <SwiperAction actions={actions}><div>哈哈</div></SwiperAction>
      <SwiperAction actions={actions} mode='after' enableAutoClose={true}><div>哈哈</div></SwiperAction>
    </div>
  );
}

export default App;
