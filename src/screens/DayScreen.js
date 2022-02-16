import React, {useState} from 'react';
import tw from 'twrnc';
import {Pressable, Text, View} from 'react-native';
import {useStoreState} from 'easy-peasy';
import {DayGrid} from '../components/DayGrid';
import {map} from 'lodash';
import {colors} from '../constants/routines';
import {Ionicons} from '@expo/vector-icons';

export const DayScreen = () => {
  const [isPressed, setPressed] = useState(false);
  const [activeColor, setActiveColor] = useState();
  const routines = useStoreState(state => state.routines.list);
  const [activeKey, setActiveKey] = useState(false);
  return (
    <View style={tw`flex w-full h-full`}>
      <View style={tw`mb-5 p-4 pl-2 bg-zinc-800`}>
        <DayGrid />
      </View>

      <View style={tw`flex flex-row flex-wrap flex-shrink ml-3`}>
        {/*<View*/}
        {/*  style={tw`flex flex-row items-center mr-3  rounded-lg p-2 mb-4`}>*/}
        {/*  /!*<View style={tw`w-4 h-4 bg-zinc-800 mr-1`} />*!/*/}
        {/*  <Ionicons name="close-outline" size={25} style={tw`text-zinc-800`} />*/}
        {/*  /!*<Text style={tw`text-zinc-700 text-base text-center`}> Empty</Text>*!/*/}
        {/*</View>*/}
        <>
          {routines &&
            routines.map((routine, key) => {
              return (
                <Pressable
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
          <View
            style={tw`flex flex-row items-center mr-3 border border-white/10 rounded-lg px-2 pr-3 h-10 mb-4`}>
            <Ionicons name="add-outline" size={25} style={tw`text-zinc-800`} />
            <Text style={tw`text-gray-300 text-base text-center`}> New </Text>
          </View>
        )}
        {Number.isInteger(activeKey) && (
          <View
            style={tw`flex flex-row items-center mr-3  rounded-lg px-2 h-10 mb-4`}>
            <Ionicons
              name="close-outline"
              size={25}
              style={tw`text-zinc-800`}
            />
            <Text style={tw`text-gray-300 text-base text-center`}>
              {' '}
              Cancel{' '}
            </Text>
          </View>
        )}
      </View>

      {/*<View style={tw`flex flex-row flex-wrap w-11/12`}>*/}
      {/*  {routines && routines.map(routine, color => {*/}
      {/*    const isActive = activeColor === color;*/}
      {/*    const borderColor = isActive*/}
      {/*      ? 'border-white'*/}
      {/*      : 'dark:border-zinc-800 border-white';*/}
      {/*    return (*/}
      {/*      <Pressable*/}
      {/*        key={color}*/}
      {/*        onPress={() => {*/}
      {/*          setActiveColor(color);*/}
      {/*        }}>*/}
      {/*        <View*/}
      {/*          style={tw`w-14 h-14 ${*/}
      {/*            isActive ? 'border-2' : 'border'*/}
      {/*          } ${borderColor} bg-[${color}] justify-center items-center`}>*/}
      {/*          {isActive && (*/}
      {/*            <Ionicons*/}
      {/*              name="checkmark-outline"*/}
      {/*              size={25}*/}
      {/*              style={tw`text-white`}*/}
      {/*            />*/}
      {/*          )}*/}
      {/*        </View>*/}
      {/*      </Pressable>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</View>*/}
    </View>
  );
};
