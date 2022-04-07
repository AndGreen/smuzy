import React, {useMemo, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import Animated from 'react-native-reanimated';

import BottomSheet from '@gorhom/bottom-sheet';
import tw from 'twrnc';

import {Button} from '../components/Button';

const CustomBackground = ({style}) => (
  <Animated.View
    style={tw.style(style, `bg-gray-100 dark:bg-zinc-900 rounded-lg`)}
  />
);

const CustomHandle = ({style}) => (
  <View style={tw`items-center`}>
    <Animated.View
      style={tw.style(
        style,
        `h-1.3 mt-2.8 mb-2 flex items-center bg-white dark:bg-black w-5 rounded`,
      )}
    />
  </View>
);

export const GoalsSheet = ({height, navigation}) => {
  const bottomSheetRef = useRef(null);
  const [index, setIndex] = useState(0);

  const handleSnapToIndex = () => bottomSheetRef.current.snapToIndex(1);

  const snapPoints = useMemo(() => [60, height - 10], [height]);

  const handleSheetChanges = index => {
    setIndex(index);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={index}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundComponent={CustomBackground}
      handleComponent={CustomHandle}>
      <View style={tw`h-full px-3`}>
        <Text
          onPress={() => {
            handleSnapToIndex(1);
          }}
          style={tw.style(
            `text-base text-center font-bold`,
            index
              ? 'text-black dark:text-white'
              : 'text-gray-400 dark:text-neutral-600',
          )}>
          Goals
        </Text>
        <View style={tw`items-center mt-3`}>
          <Button
            onPress={() => {
              // navigation.navigate('RoutineModal', {
              //   isNew: true,
              // });
            }}>
            New goals
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
};
