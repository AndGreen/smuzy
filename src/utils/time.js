import {
  format,
  getUnixTime,
  isToday,
  isTomorrow,
  isYesterday,
  startOfDay,
} from 'date-fns';

export const blockDuration = 20 * 60;
export const timezoneBlockOffset =
  (-new Date().getTimezoneOffset() / blockDuration) * 60;

export const getBlockId = date => Math.floor(getUnixTime(date) / blockDuration);

export const getDayFirstBlockId = date =>
  getBlockId(startOfDay(date)) + timezoneBlockOffset;

export const getBlockIdByNumInDay = (date, blockNum) =>
  getDayFirstBlockId(date) + blockNum;

export const getTimeBlockId = () =>
  getBlockId(new Date()) + timezoneBlockOffset;

export const getBlockRange = (startBlockId, endBlockId) => {
  const [start, end] =
    startBlockId < endBlockId
      ? [startBlockId, endBlockId]
      : [endBlockId, startBlockId];
  return [...new Array(end - start + 1)].map((_, i) => start + i);
};

export const getFormattedDate = date => {
  let result;
  if (isToday(date)) result = 'today';
  if (isTomorrow(date)) result = 'tomorrow';
  if (isYesterday(date)) result = 'yesterday';
  if (!result) result = format(date, 'MM/dd/yy');
  return `${result} - ${format(date, 'EE').toLowerCase()}`;
};
