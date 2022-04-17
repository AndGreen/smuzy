import React, {useEffect, useState} from 'react';
import {Button, Pressable, Text, View} from 'react-native';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {omit} from 'lodash';
import tw from 'twrnc';
import {SelectList} from '../../components/SelectList';
import {blocksToHours, getISODate} from '../../utils/time';

const RoundButton = ({onPress, disabled, children}) => {
  return (
    <Pressable
      onPress={() => {
        !disabled && onPress();
      }}>
      <View
        style={tw`w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 items-center justify-center`}>
        <Text style={tw`text-lg font-bold dark:text-zinc-400`}>{children}</Text>
      </View>
    </Pressable>
  );
};

export const GoalsModal = ({route, navigation}) => {
  const routines = useStoreState(state => state.routines);
  const displayedDate = useStoreState(state => state.ui.displayedDate);
  const ISODate = getISODate(displayedDate);
  const goals = useStoreState(state => state.goals);
  const updateGoals = useStoreActions(state => state.updateGoals);
  const [newGoals, setNewGoals] = useState(goals[ISODate]);
  const {isNew} = route.params;

  const handleSubmit = () => {
    updateGoals({[ISODate]: newGoals});
    navigation.goBack();
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
    }),
      [];
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={tw`mr-2`}>
          <Button onPress={handleSubmit} title="Save" />
        </View>
      ),
    });
  }, [newGoals]);

  useEffect(() => {
    if (isNew) {
      navigation.setOptions({title: 'New Goals'});
    }
  }, [isNew]);

  return (
    <SelectList
      items={routines}
      render={routine => {
        const itemGoal = newGoals?.[routine.id] || 0;
        return (
          <View style={tw`flex-row justify-between`}>
            <View style={tw`flex flex-row items-center`}>
              <View style={tw`rounded-full w-5 h-5 bg-[${routine.color}]`} />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={tw`ml-3 w-40 text-black dark:text-zinc-200`}>
                {routine.title}
              </Text>
            </View>

            <View style={tw`flex flex-row items-center`}>
              <RoundButton
                disabled={itemGoal - 1 < 0}
                onPress={() => {
                  setNewGoals(
                    itemGoal - 1 === 0
                      ? omit(newGoals, [routine.id])
                      : {...newGoals, [routine.id]: itemGoal - 1},
                  );
                }}>
                -
              </RoundButton>
              <Text style={tw`dark:text-white font-bold w-10 text-center`}>
                {itemGoal}
              </Text>
              <RoundButton
                disabled={itemGoal + 1 > 72}
                onPress={() =>
                  setNewGoals({
                    ...newGoals,
                    [routine.id]: itemGoal + 1,
                  })
                }>
                +
              </RoundButton>
              <Text
                allowFontScaling={false}
                style={tw`text-zinc-400 dark:text-zinc-600 w-16 text-center`}>
                {blocksToHours(itemGoal)}
              </Text>
            </View>
          </View>
        );
      }}
    />
  );
};
