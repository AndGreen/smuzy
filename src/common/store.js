import {createStore, action, persist} from 'easy-peasy';
import {asyncstorage} from './asyncstorage';
import {defaultRoutines} from '../constants/routines';

window.requestIdleCallback = null;

export const store = createStore(
  persist(
    {
      routines: {
        active: null,
        list: [],
      },
      forms: {
        active: {},
      },
      days: {
        timeBlock: null,
        displayedDate: new Date(),
        history: {},
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
      // Todo: rename update to set
      updateActiveForm: action((state, payload) => {
        state.forms.active = payload;
      }),
      setActiveRoutine: action((state, routineId) => {
        state.routines.active = routineId;
      }),
      updateTimeBlock: action((state, blockId) => {
        state.days.timeBlock = blockId;
      }),
      setDisplayedDate: action((state, date) => {
        state.days.displayedDate = date;
      }),
      colorizeBlock: action((state, blockId) => {
        state.days.history[blockId] = state.routines.active;
      }),
    },
    {storage: asyncstorage},
  ),
  {middleware: []},
);
