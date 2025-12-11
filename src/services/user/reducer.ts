import { SET_USER } from './actions';

import type { TUser } from '@/utils/user';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  user: TUser | null;
} = {
  user: null,
};

export const userReducer = (state = initialState, action: PayloadAction<string>) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
