import { composeWithDevTools } from '@redux-devtools/extension';
import { createStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import { constructorReducer } from './constructor/reducer';
import { ingredientsReducer } from './ingredients/reducer';

import type { Store, UnknownAction } from '@reduxjs/toolkit';
const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
});

export const configureStore = (
  initialState?: Partial<object>
): Store<unknown, UnknownAction, unknown> => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
};

export type RootState = ReturnType<typeof rootReducer>;
