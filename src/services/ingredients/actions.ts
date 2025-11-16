import { serverUrl } from '@/utils/serverUrl';

import type { Dispatch } from '@reduxjs/toolkit';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const TASKS_LOAD_SUCCESS = 'TASKS_LOAD_SUCCESS';
export const TASKS_LOADING = 'TASKS_LOADING';
export const TASKS_ERROR = 'TASKS_ERROR';

export const loadingIngredients =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch({
      type: TASKS_LOADING,
    });
    return fetch(`${serverUrl}ingredients`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`Ошибка ${response.status}`));
      })
      .then(({ data }) => {
        dispatch({
          type: GET_INGREDIENTS,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: TASKS_ERROR,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          payload: error.message,
        });
      });
  };
