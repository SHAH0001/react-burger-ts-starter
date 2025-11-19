import { serverUrl } from '@/utils/serverUrl';

import type { TIngredient } from '@/utils/types';
import type { Dispatch } from '@reduxjs/toolkit';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const TASKS_LOADING = 'TASKS_LOADING';
export const TASKS_ERROR = 'TASKS_ERROR';
export const SET_COUNT_BUN = 'SET_COUNT_BUN';

export const loadingIngredients =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    return fetch(`${serverUrl}ingredients`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`Ошибка ${response.status}`));
      })
      .then(({ data }) => {
        const payload = data.map((item: TIngredient) => {
          return {
            ...item,
            count: 0,
            key: '',
          };
        });
        dispatch({
          type: GET_INGREDIENTS,
          payload,
        });
      })
      .catch((error) => {
        dispatch({
          type: TASKS_ERROR,
          payload: error.message,
        });
      });
  };

export const setCountBun = (
  id: TIngredient['_id']
): {
  type: string;
  payload: TIngredient['_id'];
} => ({
  type: SET_COUNT_BUN,
  payload: id,
});
