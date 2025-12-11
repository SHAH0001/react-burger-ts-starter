import type { TUser } from '@/utils/user';

export const SET_USER = 'SET_USER';

export const setUser = (
  user: TUser
): {
  type: string;
  payload: TUser;
} => ({
  type: SET_USER,
  payload: user,
});
