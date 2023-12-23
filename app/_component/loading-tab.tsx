import { Box, CircularProgress } from '@mui/material'

const LoadingTab = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: 450 }}
    >
      <CircularProgress />
    </Box>
  )
}

export default LoadingTab
