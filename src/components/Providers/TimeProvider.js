import React, {useEffect, useState} from 'react';
import {getTimeBlockId} from '../../utils/time';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {getUnixTime} from 'date-fns';

export const TimeProvider = ({children}) => {
  const currentTimeBlock = useStoreState(state => state.ui.timeBlock);
  const setTimeBlock = useStoreActions(state => state.setTimeBlock);
  const [time, setTime] = useState(getUnixTime(new Date()));

  useEffect(() => {
    setTimeBlock(getTimeBlockId());

    const id = setInterval(() => {
      setTime(getUnixTime(new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (currentTimeBlock !== getTimeBlockId(time))
      setTimeBlock(getTimeBlockId());
  }, [time]);

  // useEffect(() => {}, [])
  return <>{children}</>;
};
