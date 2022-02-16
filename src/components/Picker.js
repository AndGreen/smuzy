import tw from 'twrnc';
import {Text, View, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export const Picker = ({children, style, pressed, onPress}) => {
  return (
    <View style={tw`${style} h-12`}>
      <Pressable onPress={onPress}>
        <View
          style={tw`w-full h-full bg-white/50 rounded-lg dark:bg-zinc-800 bg-gray-200 flex flex-row items-center justify-between px-3`}>
          <View style={tw`flex flex-row`}>
            <View style={tw`flex flex-row`}>{children}</View>
          </View>
          <View>
            <Ionicons
              name={pressed ? 'chevron-up-outline' : 'chevron-down-outline'}
              size={16}
              style={tw`text-white`}
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
};
