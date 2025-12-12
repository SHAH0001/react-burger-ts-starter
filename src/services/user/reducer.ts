import { SET_USER, SET_AUTH_CHECKED, LOGOUT } from './actions';

import type { TUser } from '@/utils/user';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  user: TUser | null;
  isAuthChecked: boolean;
} = {
  user: null,
  isAuthChecked: false,
};

export const userReducer = (state = initialState, action: PayloadAction<string>) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload, isAuthChecked: true };
    case SET_AUTH_CHECKED:
      return { ...state, isAuthChecked: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};
