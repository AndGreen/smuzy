import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Button, TextInput} from 'react-native';
import {v4 as uuid} from 'uuid';
import tw from 'twrnc';
import {ColorPicker} from '../components/ColorPicker';
import {useStoreActions} from 'easy-peasy';

export const routineModalHeaderButtons = ({navigation, route}) => ({
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
  headerRight: () => {
    const {isNew, ...routine} = route.params;
    const newRoutine = useStoreActions(state => state.newRoutine);
    const updateRoutine = useStoreActions(state => state.updateRoutine);

    return (
      <View style={tw`mr-2`}>
        <Button
          onPress={() => {
            if (isNew) newRoutine(routine);
            else updateRoutine(routine);

            navigation.goBack();
          }}
          title="Save"
        />
      </View>
    );
  },
});

export const RoutineModal = ({route, navigation}) => {
  const {title, color, id, isNew} = route.params;
  const [routineName, onChangeRoutineName] = useState(title);
  const [activeColor, setActiveColor] = useState(color);
  const deleteRoutine = useStoreActions(state => state.deleteRoutine);

  useEffect(() => {
    if (isNew) {
      navigation.setOptions({title: 'New Routine'});
    }
  }, [isNew]);

  return (
    <View style={tw`flex h-full pt-5 items-center dark:bg-zinc-900`}>
      <View style={tw`flex w-full items-center`}>
        <View style={tw`mb-5 w-11/12`}>
          <TextInput
            clearButtonMode="while-editing"
            placeholder="Routine name"
            style={tw`dark:text-white h-10 w-full dark:bg-zinc-800 bg-gray-200 pl-2 rounded-lg`}
            onChangeText={onChangeRoutineName}
            value={routineName}
          />
        </View>
        <View style={tw`mb-5`}>
          <ColorPicker
            activeColor={activeColor}
            setActiveColor={setActiveColor}
          />
        </View>
        {!isNew && (
          <Pressable
            style={tw`flex w-11/12 dark:bg-zinc-800 bg-gray-200 py-3 items-center rounded-lg`}
            onPress={() => {
              deleteRoutine({id});
              navigation.goBack();
            }}>
            <Text style={tw`text-red-500 text-base`}>Delete Routine</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};
