import React from 'react';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {View, Text, Pressable} from 'react-native';
import tw from 'twrnc';
import {getBlockIdByNumInDay, getBlockRange} from '../utils/time';
import * as Haptics from 'expo-haptics';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import {subDays, addDays} from 'date-fns';
import {FuturePattern} from './FuturePattern';
import {usePlatform} from '../utils/hooks';
import {Ionicons} from '@expo/vector-icons';

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
  const activeRoutine = useStoreState(state => state.ui.activeRoutine);
  const timeBlock = useStoreState(state => state.ui.timeBlock);
  const multipleBlock = useStoreState(state => state.ui.multipleBlock);
  const displayedDate = useStoreState(state => state.ui.displayedDate);
  const history = useStoreState(state => state.history);

  const setDisplayedDate = useStoreActions(state => state.setDisplayedDate);
  const setMultipleStartBlock = useStoreActions(
    state => state.setMultipleStartBlock,
  );
  const colorizeBlocks = useStoreActions(state => state.colorizeBlocks);
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
          <View style={tw`w-full`}>
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

                    return (
                      <Pressable
                        onPress={() => {
                          colorizeBlocks(
                            multipleBlock
                              ? getBlockRange(multipleBlock, blockId)
                              : [blockId],
                          );

                          Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Light,
                          );
                        }}
                        onLongPress={() => {
                          if (activeRoutine) colorizeBlocks([blockId]);
                          setMultipleStartBlock(blockId);
                        }}
                        style={tw`flex items-center justify-center`}
                        key={blockId}>
                        {blockId > timeBlock && blockColor && <FuturePattern />}
                        {blockId === timeBlock && (
                          <View
                            style={tw`absolute w-[9.5vw] h-[4.5vh] border-2 z-10
                             dark:border-white border-sky-500`}
                          />
                        )}
                        <View
                          style={tw.style(
                            `flex items-center justify-center 
                              border border-zinc-500 dark:border-black 
                              w-[9.5vw] h-[4.5vh] border-t-0 border-l-0`,
                            blockColor && `bg-[${blockColor}]`,
                            lineNum === 0 && 'border-t',
                            i === 0 && 'border-l',
                            (i === 3 || i === 6) &&
                              `border-l-2 ${isAndroid ? 'ml-[-1]' : ''}`,
                            lineNum === 0 && i === 0  && 'rounded-tl-lg',
                            lineNum === 0 && i === (elements.length - 1) && 'rounded-tr-lg',
                            (lineNum === lines.length - 1) && i === 0 && 'rounded-bl-lg',
                            (lineNum === lines.length - 1) && i === (elements.length - 1) && 'rounded-br-lg'
                          )}>
                          {blockId === multipleBlock && (
                            <Ionicons
                              name="copy-outline"
                              size={25}
                              style={tw`${
                                blockColor ? 'text-zinc-800' : 'text-white'
                              }`}
                            />
                          )}
                        </View>
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
