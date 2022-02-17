import React, {useEffect, useState} from 'react';
import {getTimeBlockId} from '../utils/time';
import {useStoreActions} from 'easy-peasy';

export const TimeProvider = ({children}) => {
  const updateTimeBlock = useStoreActions(
    state => state.updateTimeBlock,
  );
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    updateTimeBlock(getTimeBlockId());
  }, [time]);

  // useEffect(() => {}, [])
  return <>{children}</>;
};
