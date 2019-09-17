import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useEventCallback } from 'rxjs-hooks';
import {map, withLatestFrom, switchMap, takeUntil, tap} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import useDrag from './hooks/use-drag';

function Dev() {

}

function App() {

  const [onDrag, [x, y]] = useDrag([0, 0]);

  return (
    <div className="App" style={{position: 'relative'}} >
      <h1>{x}, {y}</h1>
      <div>
        <div 
        // onMouseDown={clickCallback}
        {...onDrag}
        style={{
          position: 'absolute',
          width: '100px',height: '100px', backgroundColor: 'tomato', left: x}}></div>
      </div>
    </div>
  );
}

export default App;
