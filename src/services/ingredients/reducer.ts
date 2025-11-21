import {
  GET_INGREDIENTS,
  TASKS_ERROR,
  SET_BUNS,
  ADD_COUNTER_INGREDIENT,
} from './actions';

import type { TIngredient } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  ingredients: TIngredient[];
  error: null | Error;
  loading: boolean;
} = {
  ingredients: [],
  error: null,
  loading: false,
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
    case ADD_COUNTER_INGREDIENT: {
      const localPayload: TIngredient = action.payload as unknown as TIngredient;
      const localIngredients = state.ingredients.map((item: TIngredient) => {
        if (item._id === localPayload._id) {
          return {
            ...item,
            count: (item.count += 1),
          };
        }
        return item;
      });
      return { ...state, ingredients: localIngredients };
    }
    case SET_BUNS: {
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
