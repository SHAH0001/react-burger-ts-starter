import type { TUser } from '@/utils/user';

export const SET_USER = 'SET_USER';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const LOGOUT = 'LOGOUT';

export const setUser = (
  user: TUser
): {
  type: string;
  payload: TUser;
} => ({
  type: SET_USER,
  payload: user,
});

export const setAuthChecked = (
  isAuthChecked: boolean
): {
  type: string;
  payload: boolean;
} => ({
  type: SET_AUTH_CHECKED,
  payload: isAuthChecked,
});

export const logout = (): {
  type: string;
} => ({
  type: LOGOUT,
});
