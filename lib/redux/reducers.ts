import { combineReducers } from '@reduxjs/toolkit'

import { todoApi } from './services'
import { UserReducer } from './slices/user'

export const reducers = combineReducers({
  user: UserReducer,
  [todoApi.reducerPath]: todoApi.reducer,
})
