import React, {useState} from 'react';
import tw from 'twrnc';
import {
  Button,
  FlatList,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {Ionicons} from '@expo/vector-icons';

export const routinesHeaderButtons = ({navigation}) => {
  return {
    headerRight: () => (
      <View style={tw`mr-3`}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RoutineModal', {
              isNew: true,
            });
          }}>
          <Ionicons
            name="create-outline"
            size={25}
            style={tw`dark:text-white text-black`}
          />
        </TouchableOpacity>
      </View>
    ),
    headerLeft: () => {
      const restoreDefaultRoutines = useStoreActions(
        state => state.restoreDefaultRoutines,
      );
      return (
        <View style={tw`mr-3`}>
          <Button
            onPress={() => {
              restoreDefaultRoutines();
              alert('restored!');
            }}
            title="restore"
          />
        </View>
      );
    },
  };
};

export const RoutinesScreen = ({navigation}) => {
  const routines = useStoreState(state => state.routines.list);

  return (
    <View style={tw`h-full`}>
      <FlatList
        style={tw`flex-1`}
        data={routines}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() => {
              navigation.navigate('RoutineModal', {
                ...item,
                isNew: false,
              });
            }}>
            <View
              style={tw`${
                index !== routines.length - 1 && 'border-b'
              } border-zinc-200 dark:border-zinc-900`}>
              <View style={tw`flex flex-row pl-2 h-12 items-center`}>
                <View style={tw`w-5 h-5 bg-[${item.color}]`} />
                <Text style={tw`border-b ml-3 text-black dark:text-zinc-200`}>
                  {item.title}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
