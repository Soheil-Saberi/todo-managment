import { configureStore } from '@reduxjs/toolkit'
import {
  type TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { middlewares } from './middlewares'
import { reducers } from './reducers'
import { todoApi } from './services'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [todoApi.reducerPath],
}
const persistedReducer = persistReducer(persistConfig, reducers)

export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middlewares),
})

export const persistor = persistStore(reduxStore)

type ApplicationState = ReturnType<typeof reduxStore.getState>

type ApplicationDispatch = typeof reduxStore.dispatch

export const useSelector: TypedUseSelectorHook<ApplicationState> =
  useReduxSelector

export const useDispatch: () => ApplicationDispatch = useReduxDispatch
