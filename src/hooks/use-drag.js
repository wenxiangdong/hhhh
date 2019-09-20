import { useEventCallback } from 'rxjs-hooks';
import {map, withLatestFrom, switchMap, takeUntil, tap} from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';
import { useEffect } from 'react';

/**
 * 提取client X Y
 * @param {*} e 
 */
const getEventPos = (e) => {
    let pos = [0, 0];
    // console.log(e);
    if (e instanceof TouchEvent) {
        const touch = e.changedTouches[0];
        pos = [touch.clientX, touch.clientY];
    } else if (e instanceof MouseEvent) {
        pos = [e.clientX, e.clientY];
    }
    return pos;
}


/**
 * 
 * @param {[number, number]} initialPostion 
 * @param {(pos: number[]) => void}
 * @returns {[{onTouchStart: (e: any) => void; onMouseDown: (e: any) => void}, [number, number]]}
 */
function useDrag(initialPostion = [0, 0], onDragEnd) {
    const dragEnd$ = merge(
        fromEvent(window, 'touchend'),
        fromEvent(window, 'mouseup'),
    ).pipe(
        map((e) => {
            const pos = getEventPos(e);
            onDragEnd && onDragEnd(pos);
        }),
    );
    const [callback, [posX, posY, prePos]] = useEventCallback((event$, state$) =>
        event$.pipe(
            withLatestFrom(state$),
            // tap(([event, prePos]) => {event.persist();console.log(event, prePos)}),
            map(([event, prePos]) => {
                // event.persist();
                // console.log(event);
                if (event.touches) {
                    return [...getEventPos(event), prePos, true, event.touches[0].target];
                } else {
                    return [...getEventPos(event), prePos, false, event.target];
                }
                
            }),
            switchMap(([x, y, prePos, isTouch, target]) => {
                if (isTouch) {
                    return fromEvent(window, 'touchmove').pipe(
                        // tap(e => console.log(e)),
                        map(touchEvent => {
                            let pos = getEventPos(touchEvent);
                            return [pos[0] - x + prePos[0], pos[1] - y + prePos[1], prePos]
                        }),
                        takeUntil(dragEnd$),
                    );
                } else {
                    return fromEvent(window, 'mousemove').pipe(
                        map(mouseEvent => {
                            let pos = getEventPos(mouseEvent);
                            return [pos[0] - x + prePos[0], pos[1] - y + prePos[1], prePos]
                        }),
                        takeUntil(dragEnd$),
                    );
                }
            }),
            tap(console.log)
        ),
    [...initialPostion, [0, 0]]);
    return [{
        onTouchStart: callback,
        onMouseDown: callback,
    }, [posX, posY], prePos];
}

export default useDrag;