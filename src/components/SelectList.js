import React from 'react';
import tw from 'twrnc';
import {View, FlatList} from 'react-native';

export const SelectList = ({items, render}) => {
  return (
    <View style={tw`h-full`}>
      <FlatList
        style={tw`flex-1 py-3 px-2 bg-white dark:bg-black`}
        data={items}
        renderItem={({item, index}) => (
          <View
            style={tw.style(
              index === 0 && 'rounded-t-lg',
              index !== items.length - 1 && 'border-b',
              index === items.length - 1 && 'rounded-b-lg',
              `border-white dark:border-black bg-gray-100 dark:bg-zinc-900 min-h-12 justify-center px-3`,
            )}>
            {render(item)}
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
