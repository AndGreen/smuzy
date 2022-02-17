import React from 'react';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {View, Text, Pressable} from 'react-native';
import tw from 'twrnc';
import {getDayFirstBlockId} from '../utils/time';
import * as Haptics from 'expo-haptics';

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
  const routines = useStoreState(state => state.routines.list);
  const timeBlock = useStoreState(state => state.days.timeBlock);
  const displayedDate = useStoreState(state => state.days.displayedDate);
  const history = useStoreState(state => state.days.history);

  const colorizeBlock = useStoreActions(state => state.colorizeBlock);
  const dayFirstBlockId = getDayFirstBlockId(displayedDate);
  const colorsByRoutine = getColorListByRoutines(routines);

  return (
    <View style={tw`w-full flex items-center`}>
      <View style={tw`w-full rounded-lg`}>
        {lines.map((lineLabel, lineNum) => (
          <View
            style={tw`flex flex-row items-center`}
            key={`day-line-${lineNum}`}>
            <Text style={tw`text-xs dark:text-gray-500 w-1/11 text-right mr-2`}>
              {lineLabel}
            </Text>
            <View style={tw`flex flex-row`}>
              {elements.map((_, i) => {
                const blockId =
                  dayFirstBlockId + (lineNum * elements.length + i);
                const blockColor = colorsByRoutine[history[blockId]];

                const bordersLWidth = () => {
                  if (i === 0) return 'border-l';
                  else if (i === 3 || i === 6) return 'border-l-2';
                  else return 'border-l-0';
                };
                const borderTWidth = lineNum === 0 ? 'border-t' : 'border-t-0';

                return (
                  <Pressable
                    onPress={() => {
                      colorizeBlock(blockId);
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }}
                    key={blockId}>
                    <View
                      style={tw`border ${
                        bordersLWidth() + ' ' + borderTWidth
                      } dark:border-black w-10 h-10 ${
                        timeBlock === blockId &&
                        'border-2 border-t-2 border-l-2 dark:border-white'
                      } ${blockColor && `bg-[${blockColor}]`}`}
                    />
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
