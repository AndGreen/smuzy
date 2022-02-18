import React, {useState, useRef, useEffect} from 'react';
import {AppState} from 'react-native';

export const AppStateProvider = ({children}) => {
  const appState = useRef(AppState.currentState);
  const [showApp, setShowApp] = useState(true);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setShowApp(false);
        setShowApp(true);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  return <>{showApp && children}</>;
};
