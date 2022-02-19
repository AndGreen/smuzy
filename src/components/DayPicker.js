import tw from 'twrnc';
import {Text, View, Pressable, Platform, Modal} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getFormattedDate} from '../utils/time';
import {getUnixTime} from 'date-fns';

export const DayPicker = ({navigation}) => {
  const isIos = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';
  const [showAndroid, setShowAndroid] = useState(false);
  const displayedDate = useStoreState(state => state.ui.displayedDate);
  const setDisplayedDate = useStoreActions(state => state.setDisplayedDate);

  const onChange = (event, selectedDate) => {
    if (isAndroid) setShowAndroid(false);
    if (selectedDate) setDisplayedDate(selectedDate);
  };

  return (
    <View style={tw`flex-row`}>
      <Pressable
        onPress={() => {
          if (isIos)
            navigation.navigate('CalendarModal', {
              displayedDate: getUnixTime(displayedDate),
            });
          if (isAndroid && !showAndroid) setShowAndroid(true);
        }}>
        <View style={tw`p-2 flex flex-row items-center`}>
          <Text style={tw`text-white text-base font-bold`}>
            {getFormattedDate(displayedDate)}
          </Text>
          <Ionicons
            name="chevron-down-outline"
            size={15}
            style={tw`text-white mt-1 ml-1`}
          />
        </View>
      </Pressable>

      {isAndroid && showAndroid && (
        <DateTimePicker value={displayedDate} mode="date" onChange={onChange} />
      )}
    </View>
  );
};
