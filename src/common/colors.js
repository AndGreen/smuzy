import {defaultColor} from '../constants/routines';
import {action} from 'easy-peasy';
import {values} from 'lodash';

export const colors = {
  colors: values(defaultColor),

  newColor: action((state, color) => {
    state.colors.push(color);
  }),
  updateColor: action((state, {prev, next}) => {
    state.colors = state.colors.map(item => (item === prev ? next : item));
  }),
  deleteColor: action((state, color) => {
    state.colors = state.colors.filter(item => item !== color);
  }),
};
