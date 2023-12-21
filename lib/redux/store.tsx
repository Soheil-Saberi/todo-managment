import { configureStore } from '@reduxjs/toolkit'
import {
  type TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux'

import { middlewares } from './middlewares'
import { reducers } from './reducers'

export const reduxStore = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
})

type ApplicationState = ReturnType<typeof reduxStore.getState>

type ApplicationDispatch = typeof reduxStore.dispatch

export const useSelector: TypedUseSelectorHook<ApplicationState> =
  useReduxSelector

export const useDispatch: () => ApplicationDispatch = useReduxDispatch
