import React, { useContext, useRef, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useEventCallback } from 'rxjs-hooks';
import { map, withLatestFrom, switchMap, takeUntil, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import SwiperAction from './components/SwiperAction';
import BreakText from './components/BreakText';
import "web-animations-js/web-animations-next-lite.min";
import { MessageContext, MessageProvider } from './message/message';
import Button from './Button';
import GradientBackground from './components/GradientBackground';
import VirtualList from './components/VirtualList';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Backend from 'react-dnd-html5-backend'

const left = <div style={{ width: '100vw', height: '100vh', backgroundColor: 'tomato' }}></div>
const ROW_COUNT = 255;
const ROW_HEIGHT = 50;
const app = {
  name: "启动工作",
  desc: "开启一天的工作",
  icon: "https://mkpub-release.menkor.com/affair/13200957/avatar/vzR2bVp8mD/small_affair_avatar.jpeg?x-oss-process=image/resize,h_96"
}
const category = {
  name: "分类",
  apps: Array(3).fill("").map((_, index) => ({ ...app, id: 'app' + index }))
}
const result = Array(5).fill("").map((_, index) => ({ ...category, id: "module" + index }));
function App() {

  const { enqueue } = useContext(MessageContext);
  const [apps, setApps] = useState(category.apps);
  const handleDragEnd = (result) => {
    const { source: { index: fromIndex }, destination: { index: toIndex } } = result;
    setApps(preState => {
      const nextState = Array.from(preState);
      const [moved] = nextState.splice(fromIndex, 1);
      console.log(moved);
      nextState.splice(toIndex, 0, moved);
      return nextState;
    })
  }
  return (
    <MessageProvider>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div
              ref={provided.innerRef}
              className="App"
              style={{ backgroundColor: "#eeeeee" }}
              {...provided.droppableProps} >
              {
                apps.map((app, index) => (
                  <Item key={app.id} id={app.id} index={index} />
                ))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </MessageProvider>
  );
}


const Item = React.memo(({ id, index }) => {
  const [dragDisabled, setDragDisabled] = useState(true);



  return (
    <Draggable draggableId={id} index={index} isDragDisabled={dragDisabled}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          style={{
            width: 50,
            height: 50
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <span>
            {id}
          </span>
          <span 
          onMouseLeave={() => {setDragDisabled(true)}}
          onMouseEnter={() => {setDragDisabled(false)}}>
            handler
          </span>
        </div>
      )}
    </Draggable>
  );
})

export default App;
