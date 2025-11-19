import { ATTACH_BUN } from './actions';

import type { TIngredient } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  constructor: TIngredient[];
  bun: null | TIngredient;
} = {
  constructor: [],
  bun: null,
};

export const constructorReducer = (
  state = initialState,
  action: PayloadAction<string>
) => {
  switch (action.type) {
    case ATTACH_BUN:
      return { bun: action.payload };
    default:
      return state;
  }
};
