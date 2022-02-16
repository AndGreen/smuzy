import React, {useState} from 'react';
import tw from 'twrnc';
import {Text, View} from 'react-native';
import {useStoreState} from 'easy-peasy';
import {DayGrid} from '../components/DayGrid';
import {Picker} from '../components/Picker';
import {HoldItem} from 'react-native-hold-menu';
import {Feather as Icon} from '@expo/vector-icons';

export const DayScreen = () => {
  const MenuItems = [
    {text: 'Actions', icon: 'home', isTitle: true, onPress: () => {}},
    {text: 'Action 1', icon: 'edit', onPress: () => {}},
    {text: 'Action 2', icon: 'map-pin', withSeparator: true, onPress: () => {}},
    {text: 'Action 3', icon: 'trash', isDestructive: true, onPress: () => {}},
  ];

  const [isPressed, setPressed] = useState(false);
  return (
    <View style={tw`pt-5`}>
      <View style={tw`flex flex-row justify-center pb-5`}>
        <View style={tw`flex flex-row justify-between w-11/12`}>
          <HoldItem
            activateOn="tap"
            items={[
              {
                text: 'Reply',
                onPress: () => {},
              },
              {
                text: 'Edit',
                onPress: () => {},
              },
              {
                text: 'Delete',
                onPress: () => {},
              },
            ]}>
            <Picker pressed={isPressed} style="w-14/24">
              <View style={tw`w-5 h-5 border border-black`} />
              <Text style={tw`ml-3 text-sm dark: text-gray-200 font-bold`}>
                Empty Routine
              </Text>
            </Picker>
          </HoldItem>
          <Picker style="w-9/24">
            <Text style={tw`text-sm dark: text-gray-200 font-bold`}>Today</Text>
          </Picker>
        </View>
      </View>
      <DayGrid />
    </View>
  );
};
