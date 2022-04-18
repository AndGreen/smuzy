import {
  endOfWeek,
  format,
  formatISO,
  getUnixTime,
  isToday,
  isTomorrow,
  isYesterday,
  startOfDay,
  startOfWeek,
} from 'date-fns';

export const BLOCK_DURATION = 20 * 60;
export const TIMEZONE_OFFSET =
  (-new Date().getTimezoneOffset() / BLOCK_DURATION) * 60;
export const FILE_TIME_FORMAT = 'MM_dd_yyyy';
export const TIME_FORMAT = 'dd.MM.yy';

export const getFileTime = () => format(new Date(), FILE_TIME_FORMAT);

export const getBlockId = date =>
  Math.floor(getUnixTime(date) / BLOCK_DURATION);

export const getDayFirstBlockId = date =>
  getBlockId(startOfDay(date)) + TIMEZONE_OFFSET;

export const getWeekRangeBlockId = date => {
  const first =
    getBlockId(startOfWeek(date, {weekStartsOn: 1})) + TIMEZONE_OFFSET;
  const last = getBlockId(endOfWeek(date, {weekStartsOn: 1})) + TIMEZONE_OFFSET;
  return [first, last];
};

export const getBlockIdByNumInDay = (date, blockNum) =>
  getDayFirstBlockId(date) + blockNum;

export const getTimeBlockId = () => getBlockId(new Date()) + TIMEZONE_OFFSET;

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
  if (!result) result = format(date, TIME_FORMAT);
  return `${result} - ${format(date, 'EE').toLowerCase()}`;
};

export const blocksToHours = blockCount => {
  const blockInHour = (60 * 60) / BLOCK_DURATION;
  return `${Math.floor(blockCount / blockInHour)}h ${
    (blockCount % blockInHour) * (BLOCK_DURATION / 60)
  }m`;
};

export const getISODate = date => formatISO(date, {representation: 'date'});

export const isBlockFuture = blockId => blockId > getTimeBlockId();

export const getWeekDaysFormatted = date => {
  const firstDayOfWeek = format(
    startOfWeek(date, {
      weekStartsOn: 1,
    }),
    TIME_FORMAT,
  );
  const lastDayOfWeek = format(
    endOfWeek(date, {
      weekStartsOn: 1,
    }),
    TIME_FORMAT,
  );

  return [firstDayOfWeek, lastDayOfWeek];
};
