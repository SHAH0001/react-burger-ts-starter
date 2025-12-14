import { fetchWithRefresh } from '@/utils/api';
import { checkResponse } from '@/utils/checkResponse';
import { serverUrl } from '@/utils/serverUrl';

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
    if (!localStorage.getItem('accessToken')) {
      dispatch({
        type: SET_IS_AUTH_CHECKED,
      });
      return;
    }
    return fetchWithRefresh(`${serverUrl}auth/user`, {
      method: 'GET',
      headers: {
        authorization: localStorage.getItem('accessToken') ?? '',
      },
    })
      .then(checkResponse)
      .then((response) => {
        console.log('response: ', response);
        dispatch({
          type: SET_USER,
          payload: response,
        });
      });
  };
