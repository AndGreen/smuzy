import {createStore, action, persist} from 'easy-peasy';
import {asyncstorage} from './asyncstorage';
import {defaultRoutines} from '../constants/routines';

window.requestIdleCallback = null;

export const store = createStore(
  persist(
    {
      routines: [],
      history: {},
      form: {},
      ui: {
        timeBlock: null,
        displayedDate: new Date(),
        activeRoutine: null,
      },
      restoreDefaultRoutines: action(state => {
        state.routines = defaultRoutines;
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
      // Todo: rename update to set
      updateForm: action((state, payload) => {
        state.form = payload;
      }),
      setActiveRoutine: action((state, routineId) => {
        state.ui.activeRoutine = routineId;
      }),
      updateTimeBlock: action((state, blockId) => {
        state.ui.timeBlock = blockId;
      }),
      setDisplayedDate: action((state, date) => {
        state.ui.displayedDate = date;
      }),
      colorizeBlock: action((state, blockId) => {
        state.history[blockId] = state.ui.activeRoutine;
      }),
    },
    {storage: asyncstorage, allow: ['routines', 'history']},
  ),
  {middleware: []},
);
