import React, {useState} from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {DayGrid} from '../../components/DayGrid';
import {RoutinesList} from '../../components/RoutinesList';
import {GoalsSheet} from '../GoalsSheet';

export const DayScreen = ({navigation}) => {
  const [height, setHeight] = useState(null);

  const isHeight = children => (height ? children : null);

  return (
    <View style={tw`flex h-screen flex-1`}>
      <View style={tw`dark:bg-zinc-800 bg-gray-100`}>
        <DayGrid />
      </View>

      <View
        onLayout={event => {
          setHeight(event.nativeEvent.layout.height);
        }}
        style={tw`dark:bg-black bg-white pt-3 pl-3 flex-1`}>
        <View>
          {isHeight(<RoutinesList height={height} navigation={navigation} />)}
        </View>
      </View>

      {isHeight(<GoalsSheet navigation={navigation} height={height} />)}
    </View>
  );
};
