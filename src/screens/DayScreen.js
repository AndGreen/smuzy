import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {Pressable, Text, View} from 'react-native';
import {useStoreState} from 'easy-peasy';
import {DayGrid} from '../components/DayGrid';
import {Ionicons} from '@expo/vector-icons';

export const DayScreen = ({navigation}) => {
  const routines = useStoreState(state => state.routines.list);
  const [activeKey, setActiveKey] = useState(false);

  return (
    <View style={tw`flex w-full h-full`}>
      <View style={tw`mb-5 p-4 pl-2 bg-zinc-800`}>
        <DayGrid />
      </View>

      <View style={tw`flex flex-row flex-wrap flex-grow ml-2`}>
        <>
          {routines &&
            routines.map((routine, key) => {
              return (
                <Pressable
                  key={`routine-${key}`}
                  onLongPress={() => {
                    navigation.navigate('RoutineModal', {
                      ...routine,
                      isNew: false,
                    });
                  }}
                  onPress={() => {
                    setActiveKey(key !== activeKey ? key : false);
                  }}
                  style={tw`flex flex-row`}>
                  <View
                    style={tw`flex flex-row items-center mr-3 ${
                      key === activeKey ? 'bg-white' : 'bg-white/10'
                    } rounded-lg p-2 px-4 mb-4`}>
                    <View style={tw`w-4 h-4 bg-[${routine.color}] mr-2`} />
                    <Text
                      style={tw`${
                        key === activeKey ? 'text-black' : 'text-gray-300'
                      } text-base text-center`}>
                      {routine.title}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
        </>
        {activeKey === false && (
          <Pressable
            onPress={() => {
              navigation.navigate('RoutineModal', {
                isNew: true,
              });
            }}>
            <View
              style={tw`flex flex-row items-center mr-3 border border-white/10 rounded-lg px-2 pr-3 h-10 mb-4`}>
              <Ionicons
                name="add-outline"
                size={25}
                style={tw`text-zinc-800`}
              />
              <Text style={tw`text-gray-300 text-base text-center`}> New </Text>
            </View>
          </Pressable>
        )}
        {Number.isInteger(activeKey) && (
          <Pressable
            onPress={() => {
              setActiveKey(false);
            }}>
            <View style={tw`flex flex-row items-center rounded-lg h-10`}>
              <Ionicons
                name="close-outline"
                size={25}
                style={tw`text-zinc-800 mr-1`}
              />
              <Text style={tw`text-gray-300 text-base text-center`}>
                Cancel
              </Text>
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
};
