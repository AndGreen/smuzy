import tw from 'twrnc';
import {Text, View, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export const Picker = ({children = 'today', pressed, onPress}) => {
  return (
    <View style={tw``}>
      <Pressable onPress={onPress}>
        <View style={tw`p-2 flex flex-row items-center`}>
          <Text style={tw`text-white text-base font-bold`}>{children}</Text>
          <Ionicons
            name={pressed ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={15}
            style={tw`text-white mt-1 ml-1`}
          />
        </View>
      </Pressable>
    </View>
  );
};
