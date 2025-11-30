import {
  ATTACH_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  MOVE_CARD,
  ORDER_COST,
  GET_ORDER_NUMBER,
  ORDER_NUMBER_ERROR,
} from './actions';

import type { TIngredient } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  burgerConstructor: TIngredient[];
  bun: null | TIngredient;
  orderCost: number;
  orderNumber: number;
  orderNumberError: string | null;
} = {
  burgerConstructor: [],
  bun: null,
  orderCost: 0,
  orderNumber: 0,
  orderNumberError: null,
};

export const constructorReducer = (
  state = initialState,
  action: PayloadAction<string>
) => {
  switch (action.type) {
    case ATTACH_BUN:
      return { ...state, bun: action.payload };
    case ADD_INGREDIENT:
      return {
        ...state,
        burgerConstructor: [...state.burgerConstructor, action.payload],
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        burgerConstructor: state.burgerConstructor.filter(
          (item) => item.key !== action.payload
        ),
      };
    case MOVE_CARD: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const ingredientKey = action.payload.dragIngredient as TIngredient;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const hoverIndex = action.payload.hoverIndex as number;
      const dragIngredientIndex = state.burgerConstructor.findIndex(
        (item) => item.key === ingredientKey.key
      );
      const burgerConstructorLocal = [...state.burgerConstructor];
      burgerConstructorLocal.splice(dragIngredientIndex, 1);
      burgerConstructorLocal.splice(
        hoverIndex,
        0,
        state.burgerConstructor[dragIngredientIndex]
      );
      return { ...state, burgerConstructor: burgerConstructorLocal };
    }
    case ORDER_COST: {
      let localOrderCost = 0;

      if (state.bun) {
        localOrderCost = state.bun.price + state.bun.price;
      }
      state.burgerConstructor.forEach((item) => {
        localOrderCost += item.price;
      });
      return { ...state, orderCost: localOrderCost };
    }
    case GET_ORDER_NUMBER: {
      return { ...state, orderNumber: action.payload };
    }
    case ORDER_NUMBER_ERROR:
      return { ...state, orderNumberError: action.payload };
    default:
      return state;
  }
};
