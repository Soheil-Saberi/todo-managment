'use client'

import { ThemeProvider } from '@emotion/react'
import { Box, CssBaseline } from '@mui/material'
import { hasCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

import { useSelector } from '@/lib/redux/store'
import { darkTheme, lightTheme } from '@/theme/theme'

export default function Template({ children }: { children: ReactNode }) {
  const router = useRouter()
  const user = useSelector((state) => state.user)

  const theme = user.theme === 'light' ? lightTheme : darkTheme

  const checkToken = hasCookie('accessToken') && user.id

  useEffect(() => {
    if (!checkToken) router.replace('/login')
  }, [checkToken, router])

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
