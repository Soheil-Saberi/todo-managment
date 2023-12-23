import { Box, Button, Typography } from '@mui/material'

type ErrorTabProps = {
  retryHandler: () => void
}

const ErrorTab = ({ retryHandler }: ErrorTabProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={{ minHeight: 450 }}
    >
      <Typography>Error, try again</Typography>
      <Button onClick={retryHandler} variant="outlined">
        Retry
      </Button>
    </Box>
  )
}

export default ErrorTab
