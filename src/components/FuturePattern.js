import React from 'react';
import {View} from 'react-native';
import Svg, {Line, Pattern, Rect} from 'react-native-svg';
import tw from 'twrnc';
import {useIsDark} from '../utils/hooks';

export const FuturePattern = () => {
  const isDark = useIsDark();
  return (
    <View style={tw`absolute w-full h-full z-10`}>
      <Svg height="100%" width="100%" viewBox="0 0 50 50">
        <Pattern
          id="pattern"
          patternUnits="userSpaceOnUse"
          width="18"
          height="18">
          <Line
            x1="50"
            y1="50"
            x2="0"
            y2="0"
            stroke={tw.color(isDark ? 'black' : 'zinc-600')}
            strokeWidth="1"
          />
        </Pattern>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
      </Svg>
    </View>
  );
};
