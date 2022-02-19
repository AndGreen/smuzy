import React from 'react';
import {StoreProvider} from 'easy-peasy';
import {store} from './src/common/store';
import tw, {useDeviceContext} from 'twrnc';
import {Navigation} from './src/screens/Navigation';
import {TimeProvider} from './src/components/Providers/TimeProvider';
import {AppStateProvider} from './src/components/Providers/AppStateProvider';

const App = () => {
  useDeviceContext(tw);

  return (
    <AppStateProvider>
      <StoreProvider store={store}>
        <TimeProvider>
          <Navigation />
        </TimeProvider>
      </StoreProvider>
    </AppStateProvider>
  );
};
export default App;
