import React, {useEffect} from 'react';
import {View, Text, Pressable, Button} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import tw from 'twrnc';
import ColorWheel from '../../components/ColorWheel/ColorWheel';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {defaultColor} from '../../constants/routines';
import {values} from 'lodash';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

export const ColorModal = ({route, navigation}) => {
  const {isNew, prevColor} = route.params;
  const colors = useStoreState(state => state.colors);
  const deleteColor = useStoreActions(state => state.deleteColor);
  const newColor = useStoreActions(state => state.newColor);
  const updateColor = useStoreActions(state => state.updateColor);

  const schema = yup
    .object({
      color: yup.string().notOneOf(colors, 'Color already used').required(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {color: prevColor},
    resolver: yupResolver(schema),
  });

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
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={errors.length > 0}
            title="Save"
          />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    if (isNew) {
      navigation.setOptions({title: 'New Color'});
    }
  }, [isNew]);

  const onSubmit = data => {
    if (isNew) {
      newColor(data.color);
    } else updateColor({prev: prevColor, next: data.color});

    navigation.goBack();
  };

  return (
    <View style={tw`flex h-full pt-5 items-center dark:bg-zinc-900`}>
      <View style={tw`flex w-full items-center`}>
        <View
          style={tw.style(
            `border w-11/12 border-transparent p-4 rounded-lg`,
            errors?.color && 'border-red-500 dark:border-red-500',
          )}>
          <View style={tw`flex items-center h-80`}>
            <Controller
              control={control}
              name="color"
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <ColorWheel
                  defaultColor={value}
                  onColorChange={e => {
                    onChange(e);
                  }}
                  thumbSize={35}
                  sliderSize={35}
                  noSnap={true}
                  row={false}
                  palette={values(defaultColor)}
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
              deleteColor(prevColor);
              navigation.goBack();
            }}>
            <Text style={tw`text-red-500 text-base`}>Delete Color</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};
