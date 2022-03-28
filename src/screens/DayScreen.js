import React, {useMemo, useRef, useState} from 'react';
import tw from 'twrnc';
import {View, Text} from 'react-native';
import {DayGrid} from '../components/DayGrid';
import {RoutinesList} from '../components/RoutinesList';
import BottomSheet from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';

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

export const DayScreen = ({navigation}) => {
  const bottomSheetRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [height, setHeight] = useState(350);

  const handleSnapToIndex = () => bottomSheetRef.current.snapToIndex(1);

  const snapPoints = useMemo(() => [65, height - 10], [height]);

  const handleSheetChanges = index => {
    setIndex(index);
  };

  return (
    <View style={tw`flex w-full h-full`}>
      <View style={tw`dark:bg-zinc-800 bg-gray-100`}>
        <DayGrid />
      </View>

      <View
        onLayout={event => {
          setHeight(event.nativeEvent.layout.height);
        }}
        style={tw`flex flex-row flex-wrap flex-grow pl-2 pt-3 dark:bg-black bg-white`}>
        <RoutinesList navigation={navigation} />
      </View>

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
            Budgets
          </Text>
          <Text style={tw`dark:text-zinc-600 text-center mt-5 text-lg`}>
            Feature coming soon... 🥦
          </Text>
        </View>
      </BottomSheet>
    </View>
  );
};
