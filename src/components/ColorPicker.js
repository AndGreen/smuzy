import React from 'react';
import {View, Pressable} from 'react-native';
import tw from 'twrnc';
import {Ionicons} from '@expo/vector-icons';

export const ColorPicker = ({
  routines,
  colors,
  activeColor,
  setActiveColor,
  onNewColor,
  onUpdateColor,
}) => {
  return (
    <View style={tw`flex flex-row w-80 flex-wrap`}>
      {colors.map((color, index) => {
        const isActive = activeColor === color;
        const isUsed = routines.find(item => item.color === color);

        return (
          <Pressable
            key={`${color}-${index}}`}
            onPress={() => {
              if (!isUsed) setActiveColor(color);
            }}
            onLongPress={() => {
              if (!isUsed) onUpdateColor(color);
            }}>
            <View
              style={tw.style(
                `w-13 h-13 rounded-full mr-3 mb-3 justify-center items-center`,
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
                <Ionicons
                  name="checkmark-outline"
                  size={25}
                  style={tw`text-black/20 dark:text-white/10`}
                />
              )}
            </View>
          </Pressable>
        );
      })}
      <Pressable
        onPress={() => {
          onNewColor();
        }}>
        <View
          style={tw`w-13 h-13 rounded-full mr-3 mb-3 border border-zinc-300 dark:border-zinc-800 justify-center items-center`}>
          <Ionicons
            name="add"
            size={25}
            style={tw`text-black/20 text-zinc-500 dark:text-zinc-400`}
          />
        </View>
      </Pressable>
    </View>
  );
};
