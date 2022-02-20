import React from 'react';
import tw from 'twrnc';
import {View} from 'react-native';
import {DayGrid} from '../components/DayGrid';
import {RoutinesList} from '../components/RoutinesList';

export const DayScreen = ({navigation}) => {
  return (
    <View style={tw`flex w-full h-full`}>
      <View style={tw`dark:bg-zinc-800 bg-gray-100`}>
        <DayGrid />
      </View>

      <View style={tw`flex flex-row flex-wrap flex-grow pl-2 dark:pt-4 pt-3 dark:bg-black bg-white`}>
        <RoutinesList navigation={navigation} />
      </View>
    </View>
  );
};
