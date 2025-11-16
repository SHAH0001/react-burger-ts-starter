import {
  GET_INGREDIENTS,
  TASKS_ERROR,
  // TASKS_LOAD_SUCCESS,
  // TASKS_LOADING,
} from './actions';

import type { TIngredient } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  ingredients: TIngredient[];
} = {
  ingredients: [],
};

export const ingredientsReducer = (
  state = initialState,
  action: PayloadAction<string>
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      console.log('state: ', state);
      console.log('action.payload: ', action.payload);
      return { ...state, ingredients: action.payload };
    // case TASKS_LOAD_SUCCESS:
    //   return { ...state, tasks: action.payload, loading: false };
    // case TASKS_LOADING:
    //   return { ...state, loading: true, error: null };
    case TASKS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
