import React from 'react';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import tw from 'twrnc';
import {getBlockIdByNumInDay, getDayFirstBlockId} from '../utils/time';
import * as Haptics from 'expo-haptics';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import {subDays, addDays} from 'date-fns';
import {FuturePattern} from './FuturePattern';
import {usePlatform} from '../utils/hooks';

const lines = [
  '00:00',
  '03:00',
  '06:00',
  '09:00',
  '12:00',
  '15:00',
  '18:00',
  '21:00',
];

const elements = [...new Array(9)];

const getColorListByRoutines = routines => {
  const colors = {};
  routines.forEach(item => {
    colors[item.id] = item.color;
  });
  return colors;
};

export const DayGrid = () => {
  const routines = useStoreState(state => state.routines);
  const timeBlock = useStoreState(state => state.ui.timeBlock);
  const displayedDate = useStoreState(state => state.ui.displayedDate);
  const history = useStoreState(state => state.history);

  const setDisplayedDate = useStoreActions(state => state.setDisplayedDate);
  const colorizeBlock = useStoreActions(state => state.colorizeBlock);
  const colorsByRoutine = getColorListByRoutines(routines);

  const {isAndroid} = usePlatform();

  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={({nativeEvent}) => {
        if (nativeEvent.state === State.ACTIVE) {
          setDisplayedDate(addDays(displayedDate, 1));
        }
      }}>
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={({nativeEvent}) => {
          if (nativeEvent.state === State.ACTIVE) {
            setDisplayedDate(subDays(displayedDate, 1));
          }
        }}>
        <View style={tw`w-full flex p-3 pl-2`}>
          <View style={tw`w-full rounded-lg`}>
            {lines.map((lineLabel, lineNum) => (
              <View
                style={tw`flex flex-row items-center`}
                key={`day-line-${lineNum}`}>
                <Text
                  style={tw`text-xs dark:text-gray-500 w-9 text-right mr-2`}>
                  {lineLabel}
                </Text>
                <View style={tw`flex flex-row`}>
                  {elements.map((_, i) => {
                    const blockId = getBlockIdByNumInDay(
                      displayedDate,
                      lineNum * elements.length + i,
                    );

                    const blockColor = colorsByRoutine[history[blockId]];

                    const getBorderSize = () => {
                      const top = `border-t-${lineNum === 0 ? '' : '-0'}`;
                      let left = `border-l${i === 0 ? '' : '-0'}`;
                      if (i === 3 || i === 6)
                        left = `border-l-2 ${isAndroid ? 'ml-[-1]' : ''}`;
                      return `${top} ${left}`;
                    };

                    return (
                      <Pressable
                        onPress={() => {
                          colorizeBlock(blockId);
                          Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Light,
                          );
                        }}
                        style={tw`flex z-20 items-center justify-center`}
                        key={blockId}>
                        {blockId > timeBlock && blockColor && <FuturePattern />}
                        {blockId === timeBlock && (
                          <View
                            style={tw`absolute w-[9.5vw] h-[4.5vh] border-2 z-10 dark:border-white border-sky-500`}
                          />
                        )}
                        <View
                          style={tw`border border-zinc-800 dark:border-black w-[9.5vw] h-[4.5vh] ${
                            blockColor && `bg-[${blockColor}]`
                          } ${getBorderSize()}`}
                        />
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};
