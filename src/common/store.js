import {createStore, action, persist} from 'easy-peasy';
import {asyncstorage} from './asyncstorage';
import {defaultRoutines} from '../constants/routines';
import {getDayBlocks} from '../utils/time';
import {logger} from 'redux-logger/src';

window.requestIdleCallback = null;

export const store = createStore(
  persist(
    {
      routines: {
        list: [],
      },
      forms: {
        active: {},
      },
      days: {
        displayed: {
          date: new Date(),
          currentBlockId: null,
          blocks: [],
        },
        archive: {},
      },
      restoreDefaultRoutines: action(state => {
        state.routines.list = defaultRoutines;
      }),
      newRoutine: action((state, payload) => {
        state.routines.list.push(payload);
      }),
      updateRoutine: action((state, payload) => {
        state.routines.list = state.routines.list.map(item =>
          item.id === payload.id ? payload : item,
        );
      }),
      deleteRoutine: action((state, payload) => {
        state.routines.list = state.routines.list.filter(
          item => item.id !== payload,
        );
      }),
      updateActiveForm: action((state, payload) => {
        state.forms.active = payload;
      }),
      updateCurrentBlock: action((state, payload) => {
        state.days.displayed.currentBlockId = payload;
      }),
      getDayBlocks: action((state, payload) => {
        state.days.displayed.blocks = getDayBlocks(state.days.displayed);
      }),
    },
    {storage: asyncstorage},
  ),
  {middleware: [logger]},
);
