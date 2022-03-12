import React, {useCallback, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {SelectList, Gap} from '../components/SelectList';
import tw from 'twrnc';

export const SettingsScreen = () => {
  return (
    <SelectList
      items={[
        'Export to CSC file',
        'Import',
        Gap,
        'Request Feature',
        'Feedback',
        'Contact Support',
      ]}
      render={item => (
        <Text style={tw`dark:text-zinc-200 text-base`} key={item}>{item}</Text>
      )}
    />
  );
};
