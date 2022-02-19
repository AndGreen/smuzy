import React from 'react';
import tw from 'twrnc';
import {View, Text} from 'react-native';

export const AboutScreen = ({navigation}) => {
  return (
    <View style={tw`flex w-full h-full items-center justify-center`}>
      <Text style={tw`text-white font-bold text-xl mb-2`}>S:muzy</Text>
    </View>
  );
};
