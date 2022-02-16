import React from 'react';
import tw from 'twrnc';
import {Text, View} from 'react-native';
import {useStoreState} from 'easy-peasy';

const numOnLines = 8;
const numOfBlocksInLine = 9;

const linesLabels = [
  '00:00',
  '03:00',
  '06:00',
  '09:00',
  '12:00',
  '15:00',
  '18:00',
  '21:00',
];

let days = [];
for (let i = 0; i < numOnLines; i++) {
  days[i] = [];
  for (let j = 0; j < numOfBlocksInLine; j++) {
    days[i][j] = '';
  }
}

const getColorListByRoutines = routines => {
  const colors = {};
  routines.forEach(item => {
    colors[item.id] = item.color;
  });
  return colors;
};

export const DayScreen = () => {
  const routines = useStoreState(state => state.routines.list);
  const colorsMap = getColorListByRoutines(routines);

  return (
    <View style={tw`w-full h-full flex items-center pt-20`}>
      {/* Todo: better h-full or not? */}
      <View style={tw`p-2 h-full w-full pt-4 rounded-t-lg bg-zinc-800`}>
        {days.map((line, lineNum) => (
          <View
            style={tw`flex flex-row items-center`}
            key={`day-line-${lineNum}`}>
            <Text style={tw`text-xs dark:text-gray-500 w-1/11 text-right mr-2`}>
              {linesLabels[lineNum]}
            </Text>
            <View style={tw`flex flex-row`}>
              {line.map((day, i) => {
                const bordersLWidth = () => {
                  if (i === 0) return 'border-l';
                  else if (i === 3 || i === 6) return 'border-l-2';
                  else return 'border-l-0';
                };
                const borderTWidth = lineNum === 0 ? 'border-t' : 'border-t-0';
                return (
                  <View
                    style={tw`border ${
                      bordersLWidth() + ' ' + borderTWidth
                    } dark:border-black w-10 h-10 rounded-lg`}
                    id={lineNum * 9 + i}
                    key={`day-block-${lineNum}-${i}`}
                    active={lineNum === 2 && i === 4}
                    colorsMap={colorsMap}
                  />
                );
              })}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
