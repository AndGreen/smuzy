import tw from 'twrnc';
import {Text, View, Pressable, Platform, Modal} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getFormattedDate} from '../utils/time';

export const DayPicker = () => {
  const isIos = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';
  const [pressed, setPressed] = useState(false);
  const [showIos, setShowIos] = useState(false);
  const [showAndroid, setShowAndroid] = useState(false);
  const activeDate = useStoreState(state => state.days.displayedDate);
  const setDisplayedDate = useStoreActions(state => state.setDisplayedDate);

  const onChange = (event, selectedDate) => {
    if (isAndroid) setShowAndroid(false);
    if (isIos) setShowIos(false);

    if (selectedDate) setDisplayedDate(selectedDate);

    setPressed(false);
  };

  return (
    <View style={tw`flex-row`}>
      <Pressable
        onPress={() => {
          setPressed(true);
          if (isIos) setShowIos(true);
          if (isAndroid && !showAndroid) setShowAndroid(true);
        }}>
        <View style={tw`p-2 flex flex-row items-center`}>
          <Text style={tw`text-white text-base font-bold`}>
            {getFormattedDate(activeDate)}
          </Text>
          <Ionicons
            name={pressed ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={15}
            style={tw`text-white mt-1 ml-1`}
          />
        </View>
      </Pressable>

      {isIos && (
        <Modal
          presentationStyle="pageSheet"
          animationType="slide"
          visible={showIos}>
          <View>
            <DateTimePicker
              value={activeDate}
              mode="date"
              display="inline"
              style={tw`bg-zinc-900 w-full h-full`}
              onChange={onChange}
            />
          </View>
        </Modal>
      )}

      {isAndroid && showAndroid && (
        <DateTimePicker value={activeDate} mode="date" onChange={onChange} />
      )}
    </View>
  );
};
