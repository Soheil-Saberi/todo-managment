'use client'

import { LoadingButton } from '@mui/lab'
import { Box, Button, CardContent, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useLoginMutation } from '@/lib/redux/services/auth'

type LoginInputs = {
  email: string
  password: string
}

export default function Login() {
  const router = useRouter()

  const [loginUser, { isLoading }] = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>()

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    loginUser(data)
      .unwrap()
      .then(() => {
        toast.success('Login successful')
        router.push('/')
      })
      .catch((error) => toast.error(error.data || 'Error'))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Typography sx={{ fontWeight: 'bold' }} variant="h5">
          Login
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            label="Email"
            variant="outlined"
            fullWidth
            {...register('email', { required: 'This field required' })}
          />
          <TextField
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            label="Password"
            variant="outlined"
            fullWidth
            {...register('password', { required: 'This field required' })}
          />
        </Box>
        <Box display="flex" flexDirection="column" gap={2}>
          <LoadingButton loading={isLoading} type="submit" variant="contained">
            Login
          </LoadingButton>
          <Link href="/register" legacyBehavior>
            <Button variant="text">Register</Button>
          </Link>
        </Box>
      </CardContent>
    </form>
  )
}
