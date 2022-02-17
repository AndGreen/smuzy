import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {Pressable, Text, View} from 'react-native';
import {useStoreState} from 'easy-peasy';
import {DayGrid} from '../components/DayGrid';
import {Ionicons} from '@expo/vector-icons';
import {RoutinesList} from "../components/RoutinesList";

export const DayScreen = ({navigation}) => {
  return (
    <View style={tw`flex w-full h-full`}>
      <View style={tw`mb-5 p-4 pl-2 bg-zinc-800`}>
        <DayGrid />
      </View>

      <View style={tw`flex flex-row flex-wrap flex-grow ml-2`}>
        <RoutinesList navigation={navigation} />
      </View>
    </View>
  );
};
