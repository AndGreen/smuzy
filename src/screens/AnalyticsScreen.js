import React, {useEffect} from 'react';
import tw from 'twrnc';
import {View, Text} from 'react-native';
import {useStoreState} from 'easy-peasy';
import {blocksToHours} from '../utils/time';
import {SelectList} from '../components/SelectList';
import {useStatistic} from '../utils/hooks';
import {
  getISODay,
  subWeeks,
} from 'date-fns';
import {sortBy} from 'lodash';

export const AnalyticsScreen = ({navigation}) => {
  const routines = useStoreState(state => state.routines);
  const analytics = useStatistic(new Date());
  const prevAnalytics = useStatistic(subWeeks(new Date(), 1));

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `week (${getISODay(new Date())}/7)`,
    });
  });

  return (
    <SelectList
      items={sortBy(routines, item => analytics[item.id] || 0).reverse()}
      render={item => {
        const itemBlocks = analytics[item.id] || 0;
        const prevItemBlocks = prevAnalytics[item.id] || 0;

        return (
          <View style={tw`flex-row justify-between`}>
            <View style={tw`flex flex-row items-center`}>
              <View style={tw`rounded-full w-5 h-5 bg-[${item.color}]`} />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={tw`ml-3 w-40 text-black dark:text-zinc-200`}>
                {item.title}
              </Text>
            </View>

            <View style={tw`flex flex-row items-center`}>
              <Text
                style={tw`text-black w-18 font-bold dark:text-zinc-200 no-underline`}>
                {itemBlocks ? blocksToHours(itemBlocks) : '-'}
              </Text>
              <View style={tw`w-18`}>
                {itemBlocks !== prevItemBlocks && (
                  <Text
                    style={tw.style(
                      `no-underline`,
                      itemBlocks > prevItemBlocks
                        ? 'text-green-600'
                        : 'text-zinc-500',
                    )}>
                    {itemBlocks > prevItemBlocks ? '+ ' : '- '}
                    {blocksToHours(Math.abs(itemBlocks - prevItemBlocks))}
                  </Text>
                )}
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};
