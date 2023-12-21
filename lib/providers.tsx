'use client'

import { Box } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

import NextAppDirEmotionCacheProvider from '@/theme/emotion-cache'
import { lightTheme } from '@/theme/theme'

import { reduxStore } from './redux/store'

export const Providers = (props: React.PropsWithChildren) => {
  const theme = lightTheme
  return (
    <Provider store={reduxStore}>
      <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{
              minHeight: '100vh',
              backgroundColor: theme.palette.background.default,
            }}
          >
            {props.children}
          </Box>
          <Toaster position="top-center" />
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </Provider>
  )
}
