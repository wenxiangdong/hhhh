import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { useEventCallback } from 'rxjs-hooks';
import { map, withLatestFrom, switchMap, takeUntil, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import useDrag from './hooks/use-drag';
import SwiperAction from './components/SwiperAction';
import BreakText from './components/BreakText';
import "web-animations-js/web-animations-next-lite.min";
import { MessageContext, MessageProvider } from './message/message';
import Button from './Button';
import GradientBackground from './components/GradientBackground';
import VirtualList from './components/VirtualList';

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
const left = <div style={{ width: '100vw', height: '100vh', backgroundColor: 'tomato' }}></div>
const ROW_COUNT = 255;
const ROW_HEIGHT = 50;
function App() {

  const { enqueue } = useContext(MessageContext);


  const [onDrag, [x, y]] = useDrag();
  return (
    <MessageProvider>

      <div className="App" style={{ backgroundColor: "#eeeeee" }} >
        <div>使用v list</div>
        <VirtualList 
        height={400} 
        rowCount={ROW_COUNT} 
        rowHeight={ROW_HEIGHT} 
        rowRenderer={({ index, key, style }) => (
          <div key={key} style={{ ...style, height: ROW_HEIGHT, width: '100%'}}>
            {index}-{key}
          </div>
        )} />

        {/* <div>
          不用v list
        </div>
        <div style={{ overflow: "scroll", height: 500 }}>
          {
            Array(ROW_COUNT).fill(0).map((_, index) => (
              <div key={index} style={{ height: 20, borderBottom: '1px gray solid', width: '100%' }}>
                {index}
              </div>
            ))
          }
        </div> */}
      </div>
    </MessageProvider>
  );
}

export default App;
