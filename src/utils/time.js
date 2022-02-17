import {getUnixTime, startOfDay} from 'date-fns';

export const blockDurationMinutes = 20;
export const timezoneOffset = -new Date().getTimezoneOffset() * 60;
// export const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getBlockId = date =>
  Math.floor(getUnixTime(date) / (blockDurationMinutes * 60));

export const getDayStartBlockId = date =>
  getBlockId(startOfDay(date)) + timezoneOffset;

export const getCurrentBlockId = () => getBlockId(new Date()) + timezoneOffset;

// ----------------------------------------------

export const getDayBlocks = ({blocks, date}) => {
  const startBlock = getDayStartBlockId(date);
  return [...new Array(72)].map((item, blockNum) => {
    const blockId = startBlock + blockNum;
    return {id: blockId, routine: blocks[blockId]};
  });
};
