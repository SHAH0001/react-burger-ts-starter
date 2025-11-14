import { GET_INGREDIENTS } from './actions';

import type { TIngredient } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  ingredients: TIngredient[];
  test: string;
} = {
  ingredients: [],
  test: 'hello',
};

export const ingredientsReducer = (
  state = initialState,
  action: PayloadAction<string>
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return { ...state, ingredients: [state, action.payload] };
    default:
      return state;
  }
};
