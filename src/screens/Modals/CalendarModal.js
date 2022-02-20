import React from 'react';
import {View} from 'react-native';
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
    <View style={tw`flex h-full w-full items-center`}>
      <DateTimePicker
        value={displayedDate}
        mode="date"
        display="inline"
        style={tw`dark:bg-zinc-900 w-full h-full`}
        onChange={onChange}
      />
    </View>
  );
};
