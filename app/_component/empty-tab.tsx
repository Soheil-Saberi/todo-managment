import { Box, Typography } from '@mui/material'

const EmptyTab = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: 450 }}
    >
      <Typography variant="h5">No Data!</Typography>
    </Box>
  )
}

export default EmptyTab
