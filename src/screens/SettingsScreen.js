import React, {useCallback, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {SelectList} from '../components/SelectList';
import tw from "twrnc";

export const SettingsScreen = () => {
  return (
    <SelectList
      items={['Export CSV', 'Import CSV', 'Request Feature', 'Feedback']}
      render={item => <Text style={tw`dark:text-zinc-200 text-base`}>{item}</Text>}
    />
  );
};
