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

  return (
    <div className="App" >
      <ShakeHeadPage left={left}>看我靠我靠</ShakeHeadPage>
    </div>
  );
}

export default App;
