import React from 'react';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';

export const Slidable = ({children, onLeftSlide, onRightSlide}) => {
  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={({nativeEvent}) => {
        if (nativeEvent.state === State.ACTIVE) {
          onRightSlide();
        }
      }}>
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={({nativeEvent}) => {
          if (nativeEvent.state === State.ACTIVE) {
            onLeftSlide();
          }
        }}>
        {children}
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};
