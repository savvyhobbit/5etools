import { findInPath } from "../js/utils";

export default function registerSwipe(element, direction, handler, mustBeInEl, cantBeInEl) {
    const TOUCH_DISTANCE_DELTA = 50;
    const CANCEL_DISTANCE_DELTA = 20;

    // Prevents TouchMove
    var hardStop = false;

    var xDown = null;
    var yDown = null;

    element.addEventListener("touchstart", handleTouchStart, false);
    element.addEventListener("touchmove", handleTouchMove, false);
    element.addEventListener("touchend", handleTouchEnd, false);

    function handleTouchStart(evt) {
        if (mustBeInEl) {
            let isInEl = findInPath(mustBeInEl, evt);
            if (!isInEl) {
                hardStop = true;
                return;
            }
        }
        if (cantBeInEl) {
            let isInEl = findInPath(cantBeInEl, evt);
            if (isInEl) {
                hardStop = true;
                return;
            }
        }
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    }

    function handleTouchEnd(evt) {
        if (hardStop) {
            hardStop = false;
        }

        xDown = null;
        yDown = null;
    }

    function handleTouchMove(evt) {
        if (hardStop || !xDown || !yDown) {
            return;
        }
        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (xDiff > TOUCH_DISTANCE_DELTA) {
            if (direction === 'left') {
                if (yDiff < CANCEL_DISTANCE_DELTA && -1 * yDiff < CANCEL_DISTANCE_DELTA) {
                    handler();
                } else {
                    console.error('swipe cancelled');
                }
            }
            xDown = null;
            yDown = null;
        }
        if (-1 * xDiff > TOUCH_DISTANCE_DELTA) {
            if (direction === "right") {
                if (yDiff < CANCEL_DISTANCE_DELTA && -1 * yDiff < CANCEL_DISTANCE_DELTA) {
                    handler();
                } else {
                    console.error('swipe cancelled');
                }
            }
            xDown = null;
            yDown = null;
        }
        if (yDiff > TOUCH_DISTANCE_DELTA) {
            if (direction === "up") {
                handler();
            }
            xDown = null;
            yDown = null;
        }
        if (-1 * yDiff > TOUCH_DISTANCE_DELTA) {
            if (direction === "down") {
                handler();
            }
            xDown = null;
            yDown = null;
        }
    }
};
