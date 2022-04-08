import React from 'react';
import {View} from 'react-native';
import tw from 'twrnc';

export const ProgressBar = ({progress}) => {
  const width = 28;
  const progressWidth = progress ? `w-[${Math.floor(progress * 100)}%]` : 'w-0';
  return (
    <View style={tw`w-${width} h-1 mr-3 dark:bg-white/10`}>
      <View style={tw.style(`h-1 dark:bg-white`, progressWidth)} />
    </View>
  );
};
