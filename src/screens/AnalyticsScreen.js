import React, {useCallback, useState} from 'react';
import tw from 'twrnc';
import {View, Text, FlatList} from 'react-native';
import {useStoreState} from 'easy-peasy';
import {sortBy} from 'lodash';
import {useFocusEffect} from '@react-navigation/native';
import {blocksToHours, getWeekRangeBlockId} from '../utils/time';
import {SelectList} from '../components/SelectList';

export const AnalyticsScreen = ({}) => {
  const routines = useStoreState(state => state.routines);
  const history = useStoreState(state => state.history);
  const [firstBlock, lastBlock] = getWeekRangeBlockId(new Date());
  const [analytics, setAnalytics] = useState(routines);
  const [statistic, setStatistic] = useState(0);

  const updateAnalytics = () => {
    let newStatistics = 0;
    let newAnalytics = analytics.map(item => ({...item, blocks: 0}));

    for (let block = firstBlock; block <= lastBlock; block++) {
      const routineId = history[block];
      if (routineId) {
        newStatistics++;
        newAnalytics = newAnalytics.map(routine =>
          routine.id === routineId
            ? {...routine, blocks: routine.blocks + 1}
            : routine,
        );
      }
    }
    newAnalytics = sortBy(newAnalytics, 'blocks').reverse();
    setStatistic(newStatistics);
    setAnalytics(newAnalytics);
  };

  useFocusEffect(
    useCallback(() => {
      updateAnalytics();
    }, [routines, history]),
  );

  return (
    <SelectList
      items={analytics}
      render={(item) => (
        <View style={tw`flex-row justify-between`}>
          <View style={tw`flex flex-row items-center`}>
            <View style={tw`rounded-sm w-4 h-4 bg-[${item.color}]`} />
            <Text style={tw`border-b ml-3 text-base text-black dark:text-zinc-200`}>
              {item.title}
            </Text>
          </View>

          <View style={tw`flex flex-row items-center`}>
            <Text
              style={tw`border-b text-black font-bold dark:text-zinc-200`}>
              {blocksToHours(item.blocks || 0)}
            </Text>
            <Text style={tw`border-b ml-4 w-8 text-black dark:text-zinc-400`}>
              {item.blocks ? Math.floor((item.blocks / statistic) * 100) : 0}%
            </Text>
          </View>
        </View>
      )}
    />
  );
};
