import React from 'react';
import {Pressable, Text, View} from 'react-native';
import tw from 'twrnc';
import {useStoreActions, useStoreState} from 'easy-peasy';
import DateTimePicker from '@react-native-community/datetimepicker';

export const CalendarModal = ({navigation}) => {
  const displayedDate = useStoreState(state => state.ui.displayedDate);
  const setDisplayedDate = useStoreActions(state => state.setDisplayedDate);

  const onChange = (event, selectedDate) => {
    if (selectedDate) setDisplayedDate(selectedDate);
    navigation.goBack();
  };

  return (
    <View style={tw`flex h-full w-full items-center dark:bg-zinc-900`}>
      <DateTimePicker
        value={displayedDate}
        mode="date"
        display="inline"
        style={tw`dark:bg-zinc-900 w-full `}
        onChange={onChange}
      />
      <Pressable
        style={tw`name:todayButton flex w-11/12 dark:bg-zinc-800
             bg-gray-200 py-3 items-center rounded-lg`}
        onPress={() => {
          setDisplayedDate(new Date());
          navigation.goBack();
        }}>
        <Text style={tw`text-blue-500 text-base`}>Today</Text>
      </Pressable>
    </View>
  );
};
