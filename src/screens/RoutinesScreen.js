import React from 'react';
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
import {GmailStyleSwipeableRow} from "../components/GmailStyleSwipeableRow";

export const RoutinesHeadRightButton = () => {
  const addRoutines = useStoreActions(actions => actions.addDefaultRoutines);
  return (
    <View style={tw`mr-3`}>
      <TouchableOpacity
        onPress={() => {
          addRoutines();
          alert('');
        }}>
        <Ionicons name="create-outline" size={25} style={tw`text-white`} />
      </TouchableOpacity>
    </View>
  );
};

const LeftActions = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'blue', justifyContent: 'center'}}>
      <Text
        style={{
          color: 'white',
          paddingHorizontal: 10,
          fontWeight: '600',
        }}>
        Left Action
      </Text>
    </View>
  );
};

const ListItem = ({item, index, itemCount}) => (
  <GmailStyleSwipeableRow renderRightActions={LeftActions}>
    <View
      style={tw`${
        index !== itemCount - 1 && 'border-b'
      } bg-white dark:bg-black border-zinc-200 dark:border-zinc-900`}>
      <View style={tw`flex flex-row pl-2 h-14 items-center`}>
        <View style={tw`w-6 h-6 bg-[${item.color}]`} />
        <Text style={tw`border-b ml-3 text-base text-black dark:text-zinc-200`}>
          {item.title}
        </Text>
      </View>
    </View>
  </GmailStyleSwipeableRow>
);

export const RoutinesScreen = () => {
  const routines = useStoreState(state => state.routines.list);

  return (
    <FlatList
      style={tw`flex-1`}
      data={routines}
      renderItem={props => <ListItem {...props} itemCount={routines.length} />}
      keyExtractor={item => item.id}
    />
  );
};
