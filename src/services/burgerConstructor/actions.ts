import type { TIngredient } from '@/utils/types';

export const ATTACH_BUN = 'ATTACH_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

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
