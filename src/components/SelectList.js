import React from 'react';
import {FlatList, Pressable, View} from 'react-native';
import tw from 'twrnc';

export const Gap = Symbol('Gap');

export const SelectList = ({
  items,
  render,
  style,
  onPress,
  onLongPress,
  itemStyle,
  itemFirstStyle,
}) => {
  return (
    <View style={tw`h-full`}>
      <FlatList
        style={tw.style(`flex-1 py-3 px-2 bg-white dark:bg-black`, style)}
        data={items}
        keyExtractor={(item, index) => item.id || index}
        renderItem={({item, index}) => (
          <Pressable
            onPress={item.onPress || onPress}
            onLongPress={item.onLongPress || onLongPress}>
            <View
              style={tw.style(
                `border-white dark:border-black bg-gray-100 dark:bg-zinc-900 
              min-h-12 justify-center px-3`,
                index !== items.length - 1 && 'border-b',
                (index === 0 || items[index - 1] === Gap) && 'rounded-t-lg',
                (index === items.length - 1 || items[index + 1] === Gap) &&
                  'rounded-b-lg',
                item === Gap && 'bg-white dark:bg-black h-3',

                itemStyle,
                index === 0 && itemFirstStyle,
              )}>
              {item !== Gap ? render(item, index) : <View />}
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};
