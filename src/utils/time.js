import {
  format,
  getUnixTime,
  isToday,
  isTomorrow,
  isYesterday,
  startOfDay,
} from 'date-fns';

export const blockDurationMinutes = 20;
export const timezoneOffset = -new Date().getTimezoneOffset() * 60;

export const getBlockId = date =>
  Math.floor(getUnixTime(date) / (blockDurationMinutes * 60));

export const getDayFirstBlockId = date =>
  getBlockId(startOfDay(date)) + timezoneOffset;

export const getTimeBlockId = () => getBlockId(new Date()) + timezoneOffset;

export const getFormattedDate = date => {
  if (isToday(date)) return 'today';
  if (isTomorrow(date)) return 'tomorrow';
  if (isYesterday(date)) return 'yesterday';
  return format(date, 'MM/dd/yy');
};
