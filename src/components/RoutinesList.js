import React from 'react';
import {Pressable, Text, View} from 'react-native';

import {useStoreActions, useStoreState} from 'easy-peasy';
import tw from 'twrnc';

import {Button} from './Button';

export const RoutinesList = ({navigation}) => {
  const list = useStoreState(state => state.routines);
  const active = useStoreState(state => state.ui.activeRoutine);
  const setActiveRoutine = useStoreActions(state => state.setActiveRoutine);

  return (
    <>
      <>
        {list?.map((routine, id) => {
          const isChosen = routine.id === active;
          return (
            <Pressable
              key={`routine-${routine.id}`}
              onLongPress={() => {
                navigation.navigate('RoutineModal', {
                  ...routine,
                  isNew: false,
                });
              }}
              onPress={() => {
                setActiveRoutine(!isChosen ? routine.id : null);
              }}
              style={tw`flex flex-row`}>
              <View
                style={tw.style(
                  `flex flex-row items-center h-10 mr-3 rounded-lg p-2 px-3 mb-3`,
                  isChosen
                    ? 'dark:bg-white bg-sky-600'
                    : 'dark:bg-zinc-900 bg-gray-100',
                )}>
                <View
                  style={tw.style(
                    `w-4 h-4 rounded-full bg-[${routine.color}] mr-2`,
                    isChosen && 'border dark:border-0 border-white',
                  )}
                />
                <Text
                  style={tw.style(
                    `text-base text-center`,
                    isChosen
                      ? 'dark:text-black text-white'
                      : 'dark:text-gray-300 text-black',
                  )}>
                  {routine.title}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </>
      <Button
        onPress={() => {
          navigation.navigate('RoutineModal', {
            isNew: true,
          });
        }}>
        New
      </Button>
    </>
  );
};
