'use client'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import NextAppDirEmotionCacheProvider from '@/theme/emotion-cache'
import { lightTheme } from '@/theme/theme'

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  )
}
