import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useEventCallback } from 'rxjs-hooks';
import {map, withLatestFrom, switchMap, takeUntil, tap} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import useDrag from './hooks/use-drag';
import SwiperAction from './components/SwiperAction';

const actions = [{
  label: '编辑',
  action: () => console.log('编辑'),
}, {
  label: '删除',
  action: () => console.log('删除'),
  color: 'tomato',
}];

function App() {

  return (
    <div className="App" style={{position: 'relative'}} >
      <SwiperAction actions={actions} >
        <div style={{textAlign: 'left'}}>联系人A</div>
      </SwiperAction>
    </div>
  );
}

export default App;
