import { Card, Grid } from '@mui/material'
import { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Grid
      container
      columns={12}
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid item xs={4}>
        <Card sx={{ width: 1 }}>{children}</Card>
      </Grid>
    </Grid>
  )
}
