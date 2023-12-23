'use client'

import { DarkMode, LightMode } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useRegisterMutation } from '@/lib/redux/services/auth'
import { UserActions } from '@/lib/redux/slices/user'
import { useDispatch, useSelector } from '@/lib/redux/store'

type RegisterInputs = {
  name: string
  email: string
  password: string
}

export default function Register() {
  const router = useRouter()

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [registerUser, { isLoading }] = useRegisterMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>()

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    registerUser(data)
      .unwrap()
      .then(() => {
        toast.success('User registered successfully')
        router.push('/')
      })
      .catch((error) => toast.error(error.data || 'Error'))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography sx={{ fontWeight: 'bold' }} variant="h5">
            Register
          </Typography>
          <IconButton onClick={() => dispatch(UserActions.toggleTheme())}>
            {user.theme === 'light' ? (
              <LightMode />
            ) : (
              <DarkMode color="secondary" />
            )}
          </IconButton>
        </Box>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            error={!!errors.name}
            helperText={errors.name?.message}
            label="Name"
            variant="outlined"
            fullWidth
            {...register('name', { required: 'This field required' })}
          />
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
          <LoadingButton type="submit" loading={isLoading} variant="contained">
            Register
          </LoadingButton>
          <Link href="/login" legacyBehavior>
            <Button variant="text">Login</Button>
          </Link>
        </Box>
      </CardContent>
    </form>
  )
}
