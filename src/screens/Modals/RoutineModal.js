import React, {useEffect} from 'react';
import {View, Text, Pressable, Button, TextInput} from 'react-native';
import uuid from 'react-native-uuid';
import tw from 'twrnc';
import {ColorPicker} from '../../components/ColorPicker';
import {useStoreActions, useStoreState} from 'easy-peasy';

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
    const {isNew} = route.params;
    const form = useStoreState(state => state.form);
    const newRoutine = useStoreActions(state => state.newRoutine);
    const updateRoutine = useStoreActions(state => state.updateRoutine);

    return (
      <View style={tw`mr-2`}>
        <Button
          onPress={() => {
            if (isNew) {
              newRoutine({
                id: uuid.v4(),
                ...form,
              });
            } else updateRoutine(form);
            navigation.goBack();
          }}
          title="Save"
        />
      </View>
    );
  },
});

export const RoutineModal = ({route, navigation}) => {
  const {isNew, ...params} = route.params;
  const form = useStoreState(state => state.form);
  const setForm = useStoreActions(state => state.setForm);
  const deleteRoutine = useStoreActions(state => state.deleteRoutine);

  useEffect(() => {
    setForm(params);
    return () => {
      setForm({});
    };
  }, []);

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
            placeholderTextColor="gray"
            autoCapitalize="none"
            clearButtonMode="while-editing"
            placeholder="Routine name"
            style={tw`dark:text-white w-full leading-tight text-base dark:bg-zinc-800 bg-gray-200 p-3 rounded-lg`}
            onChangeText={value => {
              setForm({...form, title: value});
            }}
            value={form.title}
          />
        </View>
        <View style={tw`mb-5`}>
          <ColorPicker
            activeColor={form.color}
            setActiveColor={value => {
              setForm({...form, color: value});
            }}
          />
        </View>
        {!isNew && (
          <Pressable
            style={tw`flex w-11/12 dark:bg-zinc-800 bg-gray-200 py-3 items-center rounded-lg`}
            onPress={() => {
              deleteRoutine(form.id);
              navigation.goBack();
            }}>
            <Text style={tw`text-red-500 text-base`}>Delete Routine</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};
