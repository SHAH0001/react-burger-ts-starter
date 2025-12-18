import { checkResponse } from '@/utils/checkResponse';
import { serverUrl } from '@/utils/serverUrl';

import type { TLoadingIngredientsResponse } from '../types';
import type { TIngredient } from '@/utils/types';
import type { Dispatch } from '@reduxjs/toolkit';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const TASKS_ERROR = 'TASKS_ERROR';
export const SET_BUNS = 'SET_BUNS';
export const ADD_COUNTER_INGREDIENT = 'ADD_COUNTER_INGREDIENT';
export const REMOVE_COUNTER_INGREDIENT = 'REMOVE_COUNTER_INGREDIENT';
export const MODAL_INGREDIENT = 'MODAL_INGREDIENT';

export const loadingIngredients =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const response = await fetch(`${serverUrl}ingredients`);
      const data = await checkResponse<TLoadingIngredientsResponse>(response);

      if (!data.success) {
        throw new Error(data.message);
      }

      const payload = data.data.map((item: TIngredient) => {
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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';

      dispatch({
        type: TASKS_ERROR,
        payload: message,
      });
    }
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

export const modalIngredient = (
  ingredient: TIngredient
): {
  type: string;
  payload: TIngredient;
} => ({
  type: MODAL_INGREDIENT,
  payload: ingredient,
});
