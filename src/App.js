import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useEventCallback } from 'rxjs-hooks';
import {map, withLatestFrom, switchMap, takeUntil, tap} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

function Dev() {

}

function App() {

  const [clickCallback, [x, y]] = useEventCallback((event$, state$) =>
    event$.pipe(
      withLatestFrom(state$),
      // tap(([event, prePos]) => {event.persist();console.log(event, prePos)}),
      map(([event, prePos]) => [event.touches[0].clientX, event.touches[0].clientY, prePos]),
      switchMap(([x, y, prePos]) => 
        fromEvent(window, 'touchmove').pipe(
          tap(e => console.log(e)),
          map(touchEvent => [touchEvent.changedTouches[0].clientX - x + prePos[0], touchEvent.changedTouches[0].clientY - y + prePos[1]]),
          takeUntil(fromEvent(window, 'touchend'))
        )
      )
    ),
    [0, 0],
  )

  return (
    <div className="App" style={{position: 'relative'}} >
      <h1>{x}, {y}</h1>
      <div>
        <div 
        // onMouseDown={clickCallback}
        onTouchStart={clickCallback}
        style={{
          position: 'absolute',
          width: '100px',height: '100px', backgroundColor: 'tomato', top: y, left: x}}></div>
      </div>
    </div>
  );
}

export default App;
