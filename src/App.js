import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useEventCallback } from 'rxjs-hooks';
import {map, withLatestFrom, switchMap, takeUntil, tap} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import useDrag from './hooks/use-drag';
import SwiperAction from './components/SwiperAction';
import BreakText from './components/BreakText';

const actions = [{
  label: '编辑',
  action: () => console.log('编辑'),
}, {
  label: <button>删除</button>,
  action: () => console.log('删除'),
  color: 'tomato',
}];

function App() {

  return (
    <div className="App" style={{position: 'relative', width: '400px'}} >
      {/* <SwiperAction actions={actions} >
        
      </SwiperAction> */}
      {/* <SwiperAction actions={actions} ><div style={{textAlign: 'left'}}>联系人A</div></SwiperAction> */}
      <BreakText>这是{'很长'.repeat(200)}的文本</BreakText>
      <div>other things</div>
    </div>
  );
}

export default App;
