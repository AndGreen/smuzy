import React from 'react';
import {View} from 'react-native';
import tw from 'twrnc';

export const ProgressBar = ({percentage}) => {
  const width = percentage > 100 ? 100 : percentage;
  return (
    <View style={tw`w-28 h-1 mr-3 dark:bg-white/10`}>
      <View
        style={tw.style(`h-1 dark:bg-white`, width ? `w-[${width}%]` : 'w-0')}
      />
    </View>
  );
};
