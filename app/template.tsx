'use client'

import { ThemeProvider } from '@emotion/react'
import { Box, CssBaseline } from '@mui/material'
import { ReactNode } from 'react'

import { useSelector } from '@/lib/redux/store'
import { darkTheme, lightTheme } from '@/theme/theme'

export default function Template({ children }: { children: ReactNode }) {
  const userTheme = useSelector((state) => state.user.theme)
  const theme = userTheme === 'light' ? lightTheme : darkTheme
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  )
}
