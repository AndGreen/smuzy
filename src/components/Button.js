import React from 'react';
import {Pressable, Text, View} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import tw from 'twrnc';

export const Button = ({onPress, children, icon = 'add-outline'}) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={tw`flex flex-row items-center mr-3 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 pr-3 h-10 mb-4`}>
        <Ionicons name={icon} size={25} style={tw`text-zinc-800`} />
        <Text style={tw`dark:text-gray-300 text-black text-base text-center`}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
};
