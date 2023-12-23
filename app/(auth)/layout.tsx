import { Card, Grid } from '@mui/material'
import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Grid
      container
      columns={12}
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid item lg={4} md={6} sm={8} xs={10}>
        <Card sx={{ width: 1 }}>{children}</Card>
      </Grid>
    </Grid>
  )
}
