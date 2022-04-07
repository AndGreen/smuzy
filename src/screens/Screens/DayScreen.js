import React, {useState} from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {DayGrid} from '../../components/DayGrid';
import {RoutinesList} from '../../components/RoutinesList';
import {GoalsSheet} from '../GoalsSheet';

export const DayScreen = ({navigation}) => {
  const [height, setHeight] = useState(350);

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

      <GoalsSheet navigation={navigation} height={height} />
    </View>
  );
};
