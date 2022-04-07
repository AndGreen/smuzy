import {action} from 'easy-peasy';

export const goals = {
  goals: {},

  updateGoals: action((state, dateGoals) => {
    state.goals = {...state.goals, ...dateGoals};
  }),
};
