import React, {useState} from 'react';
import {View, Text, Pressable, Button, TextInput} from 'react-native';
import tw from 'twrnc';
import {ColorPicker} from '../components/ColorPicker';

export const renderRoutineModalHeader = ({navigation}) => ({
  title: 'Edit Routine',
  headerLeft: () => (
    <View style={tw`ml-2`}>
      <Button
        onPress={() => {
          navigation.goBack();
        }}
        title="Cancel"
      />
    </View>
  ),
  headerRight: () => (
    <View style={tw`mr-2`}>
      <Button onPress={() => {}} title="Save" />
    </View>
  ),
});

export const RoutineModal = ({route, navigation}) => {
  const {title, color} = route.params;
  const [text, onChangeText] = useState(title);
  const [activeColor, setActiveColor] = useState(color);
  return (
    <View style={tw`flex h-full pt-5 items-center dark:bg-zinc-900`}>
      <View style={tw`flex w-full items-center`}>
        <TextInput
          clearButtonMode="while-editing"
          placeholder="Routine name"
          style={tw`h-10 w-11/12 dark:bg-zinc-800 bg-gray-200 pl-5 text-black dark:text-white rounded-lg mb-5`}
          onChangeText={onChangeText}
          value={text}
        />
        <ColorPicker
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
        <Pressable
          style={tw`flex w-11/12 dark:bg-zinc-800 bg-gray-200 py-3 items-center rounded-lg`}
          onPress={() => {
            alert('deleted');
            navigation.goBack();
          }}>
          <Text style={tw`text-red-500 text-base`}>Delete Routine</Text>
        </Pressable>
      </View>
    </View>
  );
};
