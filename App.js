import React from 'react';
import {StoreProvider} from 'easy-peasy';
import {store} from './src/common/store';
import tw, {useDeviceContext} from 'twrnc';
import {Navigation} from './src/Navigation';

const App = () => {
  useDeviceContext(tw);

  return (
    <StoreProvider store={store}>
      <Navigation />
    </StoreProvider>
  );
};
export default App;
