'use client'

import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import NextAppDirEmotionCacheProvider from '@/theme/emotion-cache'

import { persistor, reduxStore } from './redux/store'

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
          {props.children}
          <Toaster position="top-center" />
        </NextAppDirEmotionCacheProvider>
      </PersistGate>
    </Provider>
  )
}
