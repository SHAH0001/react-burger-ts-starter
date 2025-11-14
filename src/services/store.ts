import { composeWithDevTools } from '@redux-devtools/extension';
import { createStore, combineReducers } from '@reduxjs/toolkit';

import { ingredientsReducer } from './ingredients/reducer';

import type { Store, UnknownAction } from '@reduxjs/toolkit';

const rootReducer = combineReducers({ ingredients: ingredientsReducer });

export const configureStore = (
  initialState?: Partial<object>
): Store<unknown, UnknownAction, unknown> => {
  return createStore(rootReducer, initialState, composeWithDevTools());
};
