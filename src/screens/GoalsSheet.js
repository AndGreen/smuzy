import React, {useMemo, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import {useStoreState} from 'easy-peasy';
import tw from 'twrnc';
import {Button} from '../components/Button';
import {ProgressBar} from '../components/ProgressBar';
import {SelectList} from '../components/SelectList';
import {useGoalsList} from '../utils/hooks';
import {blocksToHours} from '../utils/time';

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
  const {goals, isDone, isWasted} = useGoalsList();
  const displayedDate = useStoreState(state => state.ui.displayedDate);
  const bottomSheetRef = useRef(null);
  const [index, setIndex] = useState(0);

  const handleSnapToIndex = (index = 1) =>
    bottomSheetRef.current.snapToIndex(index);

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

        {isDone && (
          <View style={tw`justify-center items-center mb-4 mt-2`}>
            <Text
              style={tw`text-center text-base text-green-500 
              border border-green-500/10 rounded
              p-2 w-80% pl-3`}>
              You are awesome! 🎉
            </Text>
          </View>
        )}

        {isWasted && (
          <View style={tw`justify-center items-center mb-4 mt-2`}>
            <Text
              style={tw`text-center text-base text-red-500 
              border border-red-500/10 rounded
              p-2 w-80% pl-3`}>
              It so sad 😢
            </Text>
          </View>
        )}

        {goals ? (
          <SelectList
            items={goals}
            onLongPress={() => {
              navigation.navigate('GoalsModal', {});
            }}
            style="dark:bg-zinc-900 p-0"
            itemStyle="dark:border-[#131315] border-t border-b-0 pr-0"
            itemFirstStyle="border-t-0"
            render={goal => {
              return (
                <View style={tw`flex-row justify-between`}>
                  <View style={tw`flex flex-row items-center`}>
                    <View style={tw`rounded-full w-5 h-5 bg-[${goal.color}]`} />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={tw`ml-3 text-black w-20 dark:text-zinc-200`}>
                      {goal.title}
                    </Text>
                  </View>

                  <View style={tw`flex flex-row items-center`}>
                    <View style={tw`mr-1`}>
                      <ProgressBar
                        percentage={Math.floor(
                          (goal.progress / goal.goal) * 100,
                        )}
                      />
                    </View>
                    <Text
                      style={tw`dark:text-white font-bold w-10 text-center`}>
                      {goal.progress}{' '}
                      <Text style={tw`dark:text-zinc-600 font-normal`}>
                        / {goal.goal}
                      </Text>
                    </Text>
                    <Text style={tw`dark:text-zinc-600 w-15 ml-3`}>
                      {blocksToHours(goal.goal)}
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
