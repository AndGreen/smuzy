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
  return (
    <View style={tw`flex w-full h-full`}>
      <View style={tw`mb-5 p-5 pl-2 bg-zinc-800`}>
        <DayGrid />
      </View>

      <View style={tw`flex flex-row flex-wrap flex-shrink ml-3`}>
        <>
          {routines &&
            routines.map(routine => {
              return (
                <View
                  style={tw`flex flex-row items-center mr-3 bg-white/10 rounded-lg p-2 px-4 mb-4`}>
                  <View style={tw`w-4 h-4 bg-[${routine.color}] mr-2`} />
                  <Text style={tw`text-gray-300 text-base text-center`}>
                    {routine.title}
                  </Text>
                </View>
              );
            })}
        </>
        
        <View
          style={tw`flex flex-row items-center mr-3 border border-zinc-800 rounded-lg p-2 pr-4 mb-4`}>
          <Ionicons name="add-outline" size={25} style={tw`text-gray-300`}/>
          <Text style={tw`text-gray-300 text-base text-center`}> New routine</Text>
        </View>
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
