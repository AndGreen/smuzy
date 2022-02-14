import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import {colors} from '../constants/routines';
import {map} from 'lodash';
import {Ionicons} from '@expo/vector-icons';

export const ColorPicker = ({activeColor, setActiveColor}) => {
  return (
    <View style={tw`flex flex-row flex-wrap w-11/12 mb-5 ml-5`}>
      {map(colors, color => {
        const isActive = activeColor === color;
        const borderColor = isActive ? 'white' : 'zinc-800';
        return (
          <View
            style={tw`w-14 h-14 ${
              isActive ? 'border-2' : 'border'
            } border-${borderColor} bg-[${color}] justify-center items-center`}>
            {isActive && (
              <Ionicons
                name="checkmark-outline"
                size={25}
                style={tw`text-white`}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};
