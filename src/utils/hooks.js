import {useCallback, useState} from 'react';
import {Platform, useColorScheme} from 'react-native';
import {getWeekRangeBlockId} from './time';
import {useStoreState} from 'easy-peasy';
import {useFocusEffect} from '@react-navigation/native';

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
