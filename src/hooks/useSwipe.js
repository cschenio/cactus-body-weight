import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export function useSwipe(onSwipeLeft = null, onSwipeRight = null, rangeOffset = 4) {

  let firstTouch = 0;

  // Set user touch start position.
  function onTouchStart(e) {
    firstTouch = e.nativeEvent.pageX;
  }

  // When touch ends check for swipe directions.
  function onTouchEnd(e){

    // Get touch position and screen size.
    const positionX = e.nativeEvent.pageX;
    const range = windowWidth / rangeOffset;

    // Check if position is growing positively and has reached specified range.
    if (positionX - firstTouch > range) {
      onSwipeRight();
    }
    // Check if position is growing negatively and has reached specified range.
    else if (firstTouch - positionX > range) {
      onSwipeLeft();
    }
  }

  return {onTouchStart, onTouchEnd};
}
