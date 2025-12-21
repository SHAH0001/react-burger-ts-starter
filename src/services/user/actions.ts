import { fetchWithRefresh } from '@/utils/api';
import { serverUrl } from '@/utils/serverUrl';

import type { UserResponse, TLoginResponse } from '../types';
import type { TUser } from '@/utils/user';
import type { Dispatch } from '@reduxjs/toolkit';

export const SET_USER = 'SET_USER';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const SET_IS_AUTH_CHECKED = 'SET_IS_AUTH_CHECKED';
export const LOGOUT = 'LOGOUT';
// import { setUser } from '@/services/user/actions';
import { checkResponse } from '@/utils/checkResponse';
import { useLocation, useNavigate } from 'react-router-dom';

import type { TLocationState } from '@/utils/types';
import { useDispatch } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';

// import type { TLocationState } from '@/utils/types';
// import { useLocation } from 'react-router-dom';

// import type { TLocationState } from '@/utils/types';

// const dispatch = useDispatch();
// eslint-disable-next-line react-hooks/rules-of-hooks
const navigate = useNavigate();
// eslint-disable-next-line react-hooks/rules-of-hooks
const location = useLocation();
const dispatch = useDispatch();
const state = location.state as TLocationState;
const from = state?.from?.pathname ?? '/';

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

export const login = async (email: string, password: string): Promise<void> => {
  if (!email || !password) {
    return;
  }

  try {
    const response = await fetch(`${serverUrl}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await checkResponse<TLoginResponse>(response);

    if (!data.success) {
      throw new Error('Login failed');
    }

    dispatch(setUser(data.user));
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    void navigate(from, { replace: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(message);
  }
};
