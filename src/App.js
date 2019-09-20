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

const actions = [{
  label: '编辑',
  action: () => console.log('编辑'),
}, {
  label: <button>删除</button>,
  action: () => console.log('删除'),
  color: 'tomato',
}];
const left = <div style={{width: '100vw', height: '100vh', backgroundColor: 'tomato'}}></div>
function App() {

  const [onDrag, [x, y]] = useDrag();
  return (
    <div className="App" >
      {/* <div style={{position: 'relative'}}>
        <div {...onDrag} style={{position: 'absolute', width: '100px', height: '100px', backgroundColor: 'tomato', left: x, top: y}}></div>
      </div> */}
      <ShakeHeadPage left={left}>我我我我</ShakeHeadPage>
    </div>
  );
}

export default App;
