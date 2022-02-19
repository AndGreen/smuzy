import React from 'react';
import tw from 'twrnc';
import {View} from 'react-native';
import {DayGrid} from '../components/DayGrid';
import {RoutinesList} from '../components/RoutinesList';

export const DayScreen = ({navigation}) => {
  return (
    <View style={tw`flex w-full h-full`}>
      <View style={tw`mb-5 bg-zinc-800`}>
        <DayGrid />
      </View>

      <View style={tw`flex flex-row flex-wrap flex-grow ml-2`}>
        <RoutinesList navigation={navigation} />
      </View>
    </View>
  );
};
