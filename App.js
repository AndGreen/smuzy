import React from 'react';
import {StoreProvider} from 'easy-peasy';
import {store} from './src/common/store';
import tw, {useDeviceContext} from 'twrnc';
import {Navigation} from './src/common/navigation';
import {TimeProvider} from './src/components/TimeProvider';

const App = () => {
  useDeviceContext(tw);

  return (
    <StoreProvider store={store}>
      <TimeProvider>
        <Navigation />
      </TimeProvider>
    </StoreProvider>
  );
};
export default App;
