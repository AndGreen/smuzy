import {useCallback, useState} from 'react';
import {Platform, useColorScheme} from 'react-native';
import {getWeekRangeBlockId} from './time';
import {useStoreState} from 'easy-peasy';
import {useFocusEffect} from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

export const useIsDark = () => {
  const scheme = useColorScheme();
  return scheme === 'dark';
};

export const usePlatform = () => {
  const isIos = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';
  return {isIos, isAndroid};
};

export const useStatistic = date => {
  const routines = useStoreState(state => state.routines);
  const history = useStoreState(state => state.history);
  const [firstBlock, lastBlock] = getWeekRangeBlockId(date);
  const [analytics, setAnalytics] = useState({});

  useFocusEffect(
    useCallback(() => {
      let newAnalytics = {};

      for (let block = firstBlock; block <= lastBlock; block++) {
        const routineId = history[block];
        if (routineId) {
          newAnalytics[routineId] = newAnalytics[routineId] + 1 || 1;
        }
      }

      setAnalytics(newAnalytics);
    }, [routines, history]),
  );

  return analytics;
};

export const useSaveFile = (fileName, fileData) => {
  const [status] = MediaLibrary.usePermissions();
  return useCallback(async () => {
    if (status !== 'none') {
      let fileUri = FileSystem.documentDirectory + fileName;
      await FileSystem.writeAsStringAsync(fileUri, fileData, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      await Sharing.shareAsync(fileUri);
    }
  }, []);
};

export const useReadFile = () => {
  const [status] = MediaLibrary.usePermissions();
  return useCallback(async onSuccess => {
    if (status !== 'none') {
      const document = await DocumentPicker.getDocumentAsync({
        // copyToCacheDirectory: true,
      });
      const data = await FileSystem.readAsStringAsync(document.uri);
      onSuccess(data);
    }
  }, []);
};
