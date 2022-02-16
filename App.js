import React from 'react';
import {StoreProvider} from 'easy-peasy';
import {store} from './src/common/store';
import tw, {useDeviceContext} from 'twrnc';
import {Navigation} from './src/common/navigation';
import {HoldMenuProvider} from 'react-native-hold-menu';
import {StatusBar} from 'expo-status-bar';
import {useColorScheme} from "react-native";

const App = () => {
  const scheme = useColorScheme();
  const isDarkTheme = scheme === 'dark';
  useDeviceContext(tw);

  return (
    <StoreProvider store={store}>
      <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
      <HoldMenuProvider theme='light'>
        <Navigation isDarkTheme={isDarkTheme} />
      </HoldMenuProvider>
    </StoreProvider>
  );
};
export default App;
