import { ATTACH_BUN, ADD_INGREDIENT } from './actions';

import type { TIngredient } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  burgerConstructor: TIngredient[];
  bun: null | TIngredient;
} = {
  burgerConstructor: [],
  bun: null,
};

export const constructorReducer = (
  state = initialState,
  action: PayloadAction<string>
) => {
  switch (action.type) {
    case ATTACH_BUN:
      return { ...state, bun: action.payload };
    case ADD_INGREDIENT:
      return {
        ...state,
        burgerConstructor: [...state.burgerConstructor, action.payload],
      };
    default:
      return state;
  }
};
