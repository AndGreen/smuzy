import React, {useEffect, useState} from 'react';
import {getTimeBlockId} from '../utils/time';
import {useStoreActions, useStoreState} from 'easy-peasy';

export const TimeProvider = ({children}) => {
  const currentTimeBlock = useStoreState(state => state.ui.timeBlock);
  const updateTimeBlock = useStoreActions(state => state.updateTimeBlock);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const newTimeBlock = getTimeBlockId();
    if (newTimeBlock !== currentTimeBlock) updateTimeBlock(newTimeBlock);
  }, [time]);

  // useEffect(() => {}, [])
  return <>{children}</>;
};
