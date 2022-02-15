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
      restoreDefaultRoutines: action(state => {
        state.routines.list = defaultRoutines;
      }),
      newRoutine: action((state, payload) => {
        state.routines.list.push({...payload});
      }),
      updateRoutine: action((state, payload) => {
        const result = state.routines.list.map(item =>
          item.id === payload.id ? payload : item,
        );
        console.log(payload);
        console.log(result);
        // state.routines.list = state.routines.list.map(item =>
        //   item.id === payload.id ? payload : item,
        // );
      }),
      deleteRoutine: action((state, payload) => {
        state.routines.list = state.routines.list.filter(
          item => item.id !== payload.id,
        );
      }),
    },
    {storage: asyncstorage},
  ),
);
