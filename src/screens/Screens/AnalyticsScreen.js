import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {addWeeks, getISODay, isThisWeek, subWeeks} from 'date-fns';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {sortBy} from 'lodash';
import tw from 'twrnc';
import {SelectList} from '../../components/SelectList';
import {Slidable} from '../../components/Slidable';
import {useStatistic} from '../../utils/hooks';
import {blocksToHours, getWeekDaysFormatted} from '../../utils/time';

export const AnalyticsScreen = ({navigation}) => {
  const routines = useStoreState(state => state.routines);
  const {displayedWeek} = useStoreState(state => state.ui);
  const setDisplayedWeek = useStoreActions(state => state.setDisplayedWeek);
  const [analytics, prevAnalytics] = useStatistic();

  const [startOfWeek, endOfWeek] = getWeekDaysFormatted(displayedWeek);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: isThisWeek(displayedWeek)
        ? `This week (${getISODay(new Date())}/7)`
        : `${startOfWeek} - ${endOfWeek}`,
    });
  });

  return (
    <Slidable
      onLeftSlide={() => {
        setDisplayedWeek(subWeeks(displayedWeek, 1));
      }}
      onRightSlide={() => {
        if (!isThisWeek(displayedWeek))
          setDisplayedWeek(addWeeks(displayedWeek, 1));
      }}>
      <View style={tw`h-full`}>
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
                    allowFontScaling={false}
                    style={tw`text-black w-18 font-bold dark:text-zinc-200 no-underline`}>
                    {itemBlocks ? blocksToHours(itemBlocks) : '-'}
                  </Text>
                  <View style={tw`w-18`}>
                    {itemBlocks !== prevItemBlocks && (
                      <Text
                        allowFontScaling={false}
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
      </View>
    </Slidable>
  );
};
