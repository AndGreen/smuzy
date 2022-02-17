import React, {useEffect, useState} from 'react';
import {getCurrentBlockId} from '../utils/time';
import {useStoreActions} from 'easy-peasy';

export const TimeProvider = ({children}) => {
  const updateCurrentBlock = useStoreActions(
    state => state.updateCurrentBlock,
  );
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    updateCurrentBlock(getCurrentBlockId());
  }, [time]);

  // useEffect(() => {}, [])
  return <>{children}</>;
};
