import React from 'react';
import {Text, useColorScheme, View} from 'react-native';
import tw from 'twrnc';

export const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() == 'dark';
  const textColorDarkMode = isDarkMode ? 'text-white' : 'text-black';

  return (
    <View style={tw`pl-6 pr-6 mt-7`}>
      <Text style={tw`text-2xl font-semibold ${textColorDarkMode}`}>
        {title}
      </Text>
      <Text
        style={tw`mt-2 text-lg font-normal leading-tight ${textColorDarkMode}`}>
        {children}
      </Text>
    </View>
  );
};
