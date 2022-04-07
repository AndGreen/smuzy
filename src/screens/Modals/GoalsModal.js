import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {useStoreState} from 'easy-peasy';
import {sortBy} from 'lodash';
import tw from 'twrnc';
import {SelectList} from '../../components/SelectList';
import {blocksToHours} from '../../utils/time';

const RoundButton = ({children}) => {
  return (
    <View
      style={tw`w-8 h-8 rounded-full bg-zinc-800 items-center justify-center`}>
      <Text style={tw`text-lg font-bold dark:text-zinc-400`}>{children}</Text>
    </View>
  );
};

export const GoalsModal = ({route, navigation, onSubmit = () => {}}) => {
  const routines = useStoreState(state => state.routines);
  const {isNew} = route.params;

  const handleSubmit = onSubmit => {
    onSubmit();
  };

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
      navigation.setOptions({title: 'New Goals'});
    }
  }, [isNew]);

  return (
    <SelectList
      items={routines}
      render={item => {
        return (
          <View style={tw`flex-row justify-between`}>
            <View style={tw`flex flex-row items-center`}>
              <View style={tw`rounded-full w-5 h-5 bg-[${item.color}]`} />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={tw`ml-3 w-40 text-black dark:text-zinc-200`}>
                {item.title}
              </Text>
            </View>

            <View style={tw`flex flex-row items-center`}>
              <RoundButton>-</RoundButton>
              <Text style={tw`dark:text-white font-bold w-10 text-center`}>
                0
              </Text>
              <RoundButton>+</RoundButton>
              <Text style={tw`dark:text-zinc-600 w-16 text-center`}>0h 0m</Text>
            </View>
          </View>
        );
      }}
    />
  );
};
