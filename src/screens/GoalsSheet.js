import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import {useStoreState} from 'easy-peasy';
import tw from 'twrnc';
import {Button} from '../components/Button';
import {SelectList} from '../components/SelectList';
import {blocksToHours, getISODate} from '../utils/time';

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
  const displayedDate = useStoreState(state => state.ui.displayedDate);
  const ISODate = getISODate(displayedDate);
  const routines = useStoreState(state => state.routines);
  const goals = useStoreState(state => state.goals);
  const dateGoals = goals[ISODate];
  const bottomSheetRef = useRef(null);
  const [index, setIndex] = useState(0);

  const handleSnapToIndex = (index = 1) =>
    bottomSheetRef.current.snapToIndex(index);

  const snapPoints = useMemo(() => [60, height - 10], [height]);

  const handleSheetChanges = index => {
    setIndex(index);
  };

  useEffect(() => {}, [goals]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={index}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundComponent={CustomBackground}
      handleComponent={CustomHandle}>
      <View style={tw`h-full px-2`}>
        <View style={tw`mb-3`}>
          <Text
            onPress={() => {
              handleSnapToIndex(index ? 0 : 1);
            }}
            style={tw.style(
              `text-base text-center font-bold`,
              index
                ? 'text-black dark:text-white'
                : 'text-gray-400 dark:text-neutral-600',
            )}>
            Goals
          </Text>
        </View>

        {dateGoals ? (
          <SelectList
            items={routines
              .filter(routine => dateGoals[routine.id] > 0)
              .map(routine => ({
                ...routine,
                onLongPress: () => {
                  navigation.navigate('GoalsModal', {});
                },
              }))}
            style="dark:bg-zinc-900 p-0"
            itemStyle="dark:border-[#131315] border-t border-b-0"
            itemFirstStyle="border-t-0"
            render={routine => {
              return (
                <View style={tw`flex-row justify-between`}>
                  <View style={tw`flex flex-row items-center`}>
                    <View
                      style={tw`rounded-full w-5 h-5 bg-[${routine.color}]`}
                    />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={tw`ml-3 w-40 text-black dark:text-zinc-200`}>
                      {routine.title}
                    </Text>
                  </View>

                  <View style={tw`flex flex-row items-center`}>
                    <Text
                      style={tw`dark:text-white font-bold w-10 text-center`}>
                      {dateGoals[routine.id]}
                    </Text>
                    <Text style={tw`dark:text-zinc-600 w-15`}>
                      {blocksToHours(dateGoals[routine.id])}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <View style={tw`items-center mt-3`}>
            <Button
              onPress={() => {
                navigation.navigate('GoalsModal', {
                  isNew: true,
                });
              }}>
              New goals
            </Button>
          </View>
        )}
      </View>
    </BottomSheet>
  );
};
