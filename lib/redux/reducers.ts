import { combineReducers } from '@reduxjs/toolkit'

import { todoApi } from '../services'

export const reducers = combineReducers({
  [todoApi.reducerPath]: todoApi.reducer,
})
