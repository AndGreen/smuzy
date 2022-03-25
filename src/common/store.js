import {createStore, action, persist} from 'easy-peasy';
import {asyncstorage} from './asyncstorage';
import {defaultRoutines} from '../constants/routines';

window.requestIdleCallback = null;

export const store = createStore(
  persist(
    {
      routines: defaultRoutines,
      history: {},
      ui: {
        timeBlock: null,
        multipleBlock: null,
        displayedDate: new Date(),
        activeRoutine: null,
      },
      restoreDefaultRoutines: action(state => {
        state.routines = defaultRoutines;
      }),
      restoreHistory: action((state, payload) => {
        state.history = payload;
      }),
      newRoutine: action((state, payload) => {
        state.routines.push(payload);
      }),
      updateRoutine: action((state, payload) => {
        state.routines = state.routines.map(item =>
          item.id === payload.id ? payload : item,
        );
      }),
      deleteRoutine: action((state, payload) => {
        state.routines = state.routines.filter(item => item.id !== payload);
      }),
      setActiveRoutine: action((state, routineId) => {
        state.ui.activeRoutine = routineId;
        state.ui.multipleBlock = null;
      }),
      setTimeBlock: action((state, blockId) => {
        state.ui.timeBlock = blockId;
      }),
      setDisplayedDate: action((state, date) => {
        state.ui.displayedDate = date;
        state.ui.multipleBlock = null;
      }),
      setMultipleStartBlock: action((state, blockId) => {
        state.ui.multipleBlock = blockId;
        state.ui.activeRoutine = state.history[blockId];
      }),
      colorizeBlocks: action((state, blockIdList) => {
        const newHistoryObjects = blockIdList.reduce(
          (newObjects, blockId) => ({
            ...newObjects,
            [blockId]: state.ui.activeRoutine,
          }),
          {},
        );
        state.history = {
          ...state.history,
          ...newHistoryObjects,
        };
        state.ui.multipleBlock = null;
        if (blockIdList.length > 1) state.ui.activeRoutine = null;
      }),
    },
    {storage: asyncstorage, allow: ['routines', 'history']},
  ),
  {middleware: []},
);
