import React from 'react';
import {View, Pressable} from 'react-native';
import tw from 'twrnc';
import {colors} from '../constants/routines';
import {map} from 'lodash';
import {Ionicons} from '@expo/vector-icons';

export const ColorPicker = ({routines, activeColor, setActiveColor}) => {
  return (
    <View style={tw`flex flex-row flex-wrap pl-3`}>
      {map(colors, color => {
        const isActive = activeColor === color;
        const isUsed = routines.find(item => item.color === color);

        return (
          <Pressable
            key={color}
            onPress={() => {
              if (!isUsed) setActiveColor(color);
            }}>
            <View
              style={tw.style(
                `w-14 h-14 rounded-full mr-3 mb-3 justify-center items-center`,
                isActive && 'border-2 dark:border-white',
                isUsed ? `bg-[${color}]/20 border-black` : `bg-[${color}]`,
              )}>
              {isActive && (
                <Ionicons
                  name="checkmark-outline"
                  size={25}
                  style={tw`text-white`}
                />
              )}
              {isUsed && (
                <Ionicons name="close" size={25} style={tw`text-black/20 dark:text-white/20`} />
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};
