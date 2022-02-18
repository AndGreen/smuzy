import {Pressable, Text, View} from 'react-native';
import tw from 'twrnc';
import {Ionicons} from '@expo/vector-icons';
import React from 'react';
import {useStoreActions, useStoreState} from 'easy-peasy';

export const RoutinesList = ({navigation}) => {
  const list = useStoreState(state => state.routines);
  const active = useStoreState(state => state.ui.activeRoutine);
  const setActiveRoutine = useStoreActions(state => state.setActiveRoutine);

  return (
    <>
      <>
        {list?.map((routine, id) => {
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
                setActiveRoutine(routine.id !== active ? routine.id : null);
              }}
              style={tw`flex flex-row`}>
              <View
                style={tw`flex flex-row items-center mr-3 ${
                  routine.id === active ? 'bg-white' : 'bg-white/10'
                } rounded-lg p-2 px-4 mb-4`}>
                <View style={tw`w-4 h-4 bg-[${routine.color}] mr-2`} />
                <Text
                  style={tw`${
                    routine.id === active ? 'text-black' : 'text-gray-300'
                  } text-base text-center`}>
                  {routine.title}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </>
      {!active && (
        <Pressable
          onPress={() => {
            navigation.navigate('RoutineModal', {
              isNew: true,
            });
          }}>
          <View
            style={tw`flex flex-row items-center mr-3 border border-white/10 rounded-lg px-2 pr-3 h-10 mb-4`}>
            <Ionicons name="add-outline" size={25} style={tw`text-zinc-800`} />
            <Text style={tw`text-gray-300 text-base text-center`}> New </Text>
          </View>
        </Pressable>
      )}
      {active && (
        <Pressable
          onPress={() => {
            setActiveRoutine(null);
          }}>
          <View style={tw`flex flex-row items-center rounded-lg h-10`}>
            <Ionicons
              name="close-outline"
              size={25}
              style={tw`text-zinc-800 mr-1`}
            />
            <Text style={tw`text-gray-300 text-base text-center`}>Cancel</Text>
          </View>
        </Pressable>
      )}
    </>
  );
};
