import React from 'react';
import {View, Text, Pressable, Button} from 'react-native';
import tw from 'twrnc';

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
  const {title} = route.params;
  return (
    <View style={tw`flex h-full pt-5 items-center dark:bg-zinc-900`}>
      <View style={tw`flex w-full items-center`}>
        <Text style={tw`dark:text-white mb-5 font-bold text-lg`}>{title}</Text>
        <Pressable
          style={tw`flex w-11/12 bg-zinc-800 py-3 items-center rounded-lg`}
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
