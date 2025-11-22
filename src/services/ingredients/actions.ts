import { serverUrl } from '@/utils/serverUrl';

import type { TIngredient } from '@/utils/types';
import type { Dispatch } from '@reduxjs/toolkit';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const TASKS_ERROR = 'TASKS_ERROR';
export const SET_BUNS = 'SET_BUNS';
export const ADD_COUNTER_INGREDIENT = 'ADD_COUNTER_INGREDIENT';
export const REMOVE_COUNTER_INGREDIENT = 'REMOVE_COUNTER_INGREDIENT';

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

export const setBuns = (
  id: TIngredient['_id']
): {
  type: string;
  payload: TIngredient['_id'];
} => ({
  type: SET_BUNS,
  payload: id,
});

export const addCounterIngredient = (
  id: TIngredient['_id']
): {
  type: string;
  payload: TIngredient['_id'];
} => ({
  type: ADD_COUNTER_INGREDIENT,
  payload: id,
});

export const removeCounterIngredient = (
  id: TIngredient['_id']
): {
  type: string;
  payload: TIngredient['_id'];
} => ({
  type: REMOVE_COUNTER_INGREDIENT,
  payload: id,
});
