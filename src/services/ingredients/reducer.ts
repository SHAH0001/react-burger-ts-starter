import { GET_INGREDIENTS, TASKS_ERROR, SET_COUNT_BUN } from './actions';

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
) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return { ...state, ingredients: action.payload };
    case TASKS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case SET_COUNT_BUN: {
      const TWO_BUNS = 2;
      const index = state.ingredients.findIndex(
        (item: TIngredient) => item._id === action.payload
      );
      const ingredients = state.ingredients.map((item: TIngredient) => {
        if (item.type === 'bun') {
          return {
            ...item,
            count: 0,
          };
        }
        return { ...item };
      });
      const item = ingredients[index];
      const updateItem: TIngredient = {
        ...item,
        count: TWO_BUNS,
      };
      return {
        ...state,
        ingredients: [
          ...ingredients.slice(0, index),
          updateItem,
          ...ingredients.slice(index + 1),
        ],
      };
    }
    default:
      return state;
  }
};
