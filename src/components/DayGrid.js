import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {addDays, subDays} from 'date-fns';
import {useStoreActions, useStoreState} from 'easy-peasy';
import * as Haptics from 'expo-haptics';
import tw from 'twrnc';
import {DAY_LINES} from '../common/constants';
import {getColorListByRoutines} from '../utils';
import {usePlatform} from '../utils/hooks';
import {
  getBlockIdByNumInDay,
  getBlockRange,
  getDayFirstBlockId,
} from '../utils/time';
import {FuturePattern} from './FuturePattern';
import {Slidable} from './Slidable';

const elements = [...new Array(9)];

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
    <Slidable
      onLeftSlide={() => {
        setDisplayedDate(subDays(displayedDate, 1));
      }}
      onRightSlide={() => {
        setDisplayedDate(addDays(displayedDate, 1));
      }}>
      <View style={tw`w-full flex p-3 pl-2`}>
        <View style={tw`w-full`}>
          {DAY_LINES.map((lineLabel, lineNum) => (
            <View
              style={tw`flex flex-row items-center`}
              key={`day-line-${lineNum}`}>
              <Text
                allowFontScaling={false}
                style={tw`text-xs dark:text-gray-500 w-9 text-right mr-2`}>
                {lineLabel}
              </Text>
              <View style={tw`flex flex-row`}>
                {elements.map((_, i) => {
                  const blockId = getBlockIdByNumInDay(
                    displayedDate,
                    lineNum * elements.length + i,
                  );
                  const isCanColorize =
                    blockId >= getDayFirstBlockId(subDays(new Date(), 1));
                  const blockColor = colorsByRoutine[history[blockId]];

                  return (
                    <Pressable
                      onPress={() => {
                        if (isCanColorize) {
                          colorizeBlocks(
                            multipleBlock
                              ? getBlockRange(multipleBlock, blockId)
                              : [blockId],
                          );

                          Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Light,
                          );
                        }
                      }}
                      onLongPress={() => {
                        if (activeRoutine) colorizeBlocks([blockId]);
                        if (isCanColorize) {
                          setMultipleStartBlock(blockId);
                        }
                      }}
                      style={tw`flex items-center justify-center`}
                      key={blockId}>
                      {blockId > timeBlock && blockColor && <FuturePattern />}
                      {blockId === timeBlock && (
                        <View
                          style={tw`absolute w-[9.5vw] h-[9.5vw] border-2 z-10
                             dark:border-white border-sky-500`}
                        />
                      )}
                      <View
                        style={tw.style(
                          `flex items-center justify-center 
                              border border-zinc-500 dark:border-black 
                              w-[9.5vw] h-[9.5vw] border-t-0 border-l-0`,
                          blockColor && `bg-[${blockColor}]`,
                          lineNum === 0 && 'border-t',
                          i === 0 && 'border-l',
                          (i === 3 || i === 6) &&
                            `border-l-2 ${isAndroid ? 'ml-[-1]' : ''}`,
                          lineNum === 0 && i === 0 && 'rounded-tl-lg',
                          lineNum === 0 &&
                            i === elements.length - 1 &&
                            'rounded-tr-lg',
                          lineNum === DAY_LINES.length - 1 &&
                            i === 0 &&
                            'rounded-bl-lg',
                          lineNum === DAY_LINES.length - 1 &&
                            i === elements.length - 1 &&
                            'rounded-br-lg',
                        )}>
                        {blockId === multipleBlock && (
                          <Ionicons
                            name="copy-outline"
                            size={25}
                            style={tw.style(
                              blockColor ? 'text-zinc-800' : 'text-white',
                            )}
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
    </Slidable>
  );
};
