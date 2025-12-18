import { fetchWithRefresh } from '@/utils/api';
import { serverUrl } from '@/utils/serverUrl';

import type { UserResponse } from '../types';
import type { TUser } from '@/utils/user';
import type { Dispatch } from '@reduxjs/toolkit';

export const SET_USER = 'SET_USER';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const SET_IS_AUTH_CHECKED = 'SET_IS_AUTH_CHECKED';
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

export const getUser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      if (!localStorage.getItem('accessToken')) {
        dispatch({
          type: SET_IS_AUTH_CHECKED,
        });

        return;
      }

      const data = await fetchWithRefresh<UserResponse>(`${serverUrl}auth/user`, {
        headers: {
          authorization: localStorage.getItem('accessToken') ?? '',
          'Content-Type': 'application/json',
        },
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatch({
        type: SET_USER,
        payload: data.user,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error(message);
    }
  };
