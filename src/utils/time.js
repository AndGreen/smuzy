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

export const getTimeBlockId = () =>
  getBlockId(new Date()) + timezoneBlockOffset;

export const getFormattedDate = date => {
  if (isToday(date)) return 'today';
  if (isTomorrow(date)) return 'tomorrow';
  if (isYesterday(date)) return 'yesterday';
  return format(date, 'MM/dd/yy');
};
