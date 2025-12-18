import { fetchWithRefresh } from '@/utils/api';
import { serverUrl } from '@/utils/serverUrl';

import type { TOrderResponse } from '../types';
import type { TIngredient } from '@/utils/types';
import type { Dispatch } from '@reduxjs/toolkit';

export const ATTACH_BUN = 'ATTACH_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_CARD = 'MOVE_CARD';
export const ORDER_COST = 'ORDER_COST';
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';
export const ORDER_NUMBER_ERROR = 'ORDER_NUMBER_ERROR';
export const IS_LOADING_PLACE_ORDER = 'IS_LOADING_PLACE_ORDER';

export const attachBun = (
  bun: TIngredient
): {
  type: string;
  payload: TIngredient;
} => ({
  type: ATTACH_BUN,
  payload: bun,
});

export const addIngredient = (
  ingredient: TIngredient
): {
  type: string;
  payload: TIngredient;
} => ({
  type: ADD_INGREDIENT,
  payload: ingredient,
});

export const removeIngredient = (
  key: TIngredient['key']
): {
  type: string;
  payload: TIngredient['key'];
} => ({
  type: REMOVE_INGREDIENT,
  payload: key,
});

export const moveCard = (
  dragIngredient: TIngredient,
  hoverIndex: number
): {
  type: string;
  payload: { dragIngredient: TIngredient; hoverIndex: number };
} => ({
  type: MOVE_CARD,
  payload: { dragIngredient, hoverIndex },
});

export const setOrderCost = (): { type: string } => ({
  type: ORDER_COST,
});

export const placeOrder =
  (identifiers: string[]) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({
        type: IS_LOADING_PLACE_ORDER,
        payload: true,
      });
      const data = await fetchWithRefresh<TOrderResponse>(`${serverUrl}orders`, {
        method: 'POST',
        body: JSON.stringify(identifiers),
        headers: {
          authorization: localStorage.getItem('accessToken') ?? '',
          'Content-Type': 'application/json',
        },
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatch({
        type: GET_ORDER_NUMBER,
        payload: data.order.number,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';

      dispatch({
        type: ORDER_NUMBER_ERROR,
        payload: message,
      });
    } finally {
      dispatch({
        type: IS_LOADING_PLACE_ORDER,
        payload: false,
      });
    }
  };
