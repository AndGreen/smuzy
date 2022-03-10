import React from 'react';
import tw from 'twrnc';
import {View, FlatList} from 'react-native';

export const Gap = Symbol('Gap');

export const SelectList = ({items, render}) => {
  return (
    <View style={tw`h-full`}>
      <FlatList
        style={tw`flex-1 py-3 px-2 bg-white dark:bg-black`}
        data={items}
        renderItem={({item, index}) => (
          <View
            style={tw.style(
              `border-white dark:border-black bg-gray-100 dark:bg-zinc-900 
              min-h-12 justify-center px-3`,
              index !== items.length - 1 && 'border-b',
              (index === 0 || items[index - 1] === Gap) && 'rounded-t-lg',
              (index === items.length - 1 || items[index + 1] === Gap) && 'rounded-b-lg',
              item === Gap && 'bg-white dark:bg-black h-3',
            )}>
            {item !== Gap ? render(item) : <View></View>}
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
