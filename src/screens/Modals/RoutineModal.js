import React, {useEffect} from 'react';
import {View, Text, Pressable, Button, TextInput} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import uuid from 'react-native-uuid';
import tw from 'twrnc';
import {ColorPicker} from '../../components/ColorPicker';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const RoutineModal = ({route, navigation}) => {
  const {isNew, ...params} = route.params;
  const routines = useStoreState(state => state.routines);
  const colors = useStoreState(state => state.colors);
  const deleteRoutine = useStoreActions(state => state.deleteRoutine);
  const newRoutine = useStoreActions(state => state.newRoutine);
  const updateRoutine = useStoreActions(state => state.updateRoutine);

  const schema = yup
    .object({
      title: yup.string().required(),
      color: yup.string().oneOf(colors, 'Color required').required(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues: params, resolver: yupResolver(schema)});

  useEffect(() => {
    navigation.setOptions({
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
          <Button onPress={handleSubmit(onSubmit)} title="Save" />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    if (isNew) {
      navigation.setOptions({title: 'New Routine'});
    }
  }, [isNew]);

  const onSubmit = data => {
    if (isNew) {
      newRoutine({
        id: uuid.v4(),
        ...data,
      });
    } else updateRoutine({...params, ...data});
    navigation.goBack();
  };

  return (
    <View style={tw`flex h-full pt-5 items-center dark:bg-zinc-900`}>
      <View style={tw`flex w-full items-center`}>
        <View style={tw`mb-5 w-11/12`}>
          <Controller
            control={control}
            name="title"
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholderTextColor={
                  errors?.title ? tw.color('red-500') : 'gray'
                }
                maxLength={30}
                autoCapitalize="none"
                clearButtonMode="while-editing"
                placeholder={
                  errors?.title ? 'Routine name required' : 'Routine name'
                }
                style={tw.style(
                  `dark:text-white w-full leading-tight text-base
                  dark:bg-zinc-800 bg-gray-200 p-3 rounded-lg border border-transparent`,
                  errors?.title && 'border-red-500 dark:border-red-500',
                )}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <View
          style={tw.style(
            `border w-11/12 border-transparent p-4 rounded-lg`,
            errors?.color && 'border-red-500 dark:border-red-500',
          )}>
          <View style={tw`flex items-center`}>
            <Controller
              control={control}
              name="color"
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <ColorPicker
                  routines={routines.filter(
                    item => item.color !== params.color,
                  )}
                  colors={colors}
                  activeColor={value}
                  setActiveColor={value => {
                    onChange(value);
                  }}
                  onNewColor={() => {
                    navigation.navigate('ColorModal', {isNew: true});
                  }}
                  onUpdateColor={item => {
                    navigation.navigate('ColorModal', {prevColor: item});
                  }}
                />
              )}
            />
          </View>
          {errors?.color && (
            <Text style={tw`text-red-500 text-base ml-1 mt-1`}>
              {errors.color.message}
            </Text>
          )}
        </View>
        {!isNew && (
          <Pressable
            style={tw`name:removeButton mt-5 flex w-11/12 dark:bg-zinc-800
             bg-gray-200 py-3 items-center rounded-lg`}
            onPress={() => {
              deleteRoutine(params.id);
              navigation.goBack();
            }}>
            <Text style={tw`text-red-500 text-base`}>Delete Routine</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};
