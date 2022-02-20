import {Platform, useColorScheme} from 'react-native';

export const useIsDark = () => {
  const scheme = useColorScheme();
  return scheme === 'dark';
};

export const usePlatform = () => {
  const isIos = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';
  return {isIos, isAndroid};
};
