import {createStore, action, persist} from 'easy-peasy';
import {asyncstorage} from './asyncstorage';
import {defaultRoutines} from '../constants/routines';
window.requestIdleCallback = null;

export const store = createStore(
  persist(
    {
      routines: {
        list: [],
      },
      addDefaultRoutines: action(state => {
        state.routines.list = defaultRoutines;
      }),
    },
    {storage: asyncstorage},
  ),
);
