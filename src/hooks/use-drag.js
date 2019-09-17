import { useEventCallback } from 'rxjs-hooks';
import {map, withLatestFrom, switchMap, takeUntil, tap} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

/**
 * 
 * @param {[number, number]} initialPostion 
 * @returns {[{onTouchStart: (e: any) => void; onMouseDown: (e: any) => void}, [number, number]]}
 */
function useDrag(initialPostion = [0, 0]) {
    const [callback, position] = useEventCallback((event$, state$) =>
        event$.pipe(
            withLatestFrom(state$),
            // tap(([event, prePos]) => {event.persist();console.log(event, prePos)}),
            map(([event, prePos]) => {
                if (event.touches) {
                    return [event.touches[0].clientX, event.touches[0].clientY, prePos, true];
                } else {
                    return [event.clientX, event.clientY, prePos, false];
                }
                
            }),
            switchMap(([x, y, prePos, isTouch]) => {
                if (isTouch) {
                    return fromEvent(window, 'touchmove').pipe(
                        // tap(e => console.log(e)),
                        map(touchEvent => [touchEvent.changedTouches[0].clientX - x + prePos[0], touchEvent.changedTouches[0].clientY - y + prePos[1]]),
                        takeUntil(fromEvent(window, 'touchend')),
                    );
                } else {
                    return fromEvent(window, 'mousemove').pipe(
                        map(mouseEvent => [mouseEvent.clientX - x + prePos[0], mouseEvent.clientY - y + prePos[1]]),
                        takeUntil(fromEvent(window, 'mouseup')),
                    );
                }
            })
        ),
    initialPostion);
    return [{
        onTouchStart: callback,
        onMouseDown: callback,
    }, position];
}

export default useDrag;