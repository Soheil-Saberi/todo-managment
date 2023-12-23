'use client'

import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import ErrorTab from '@/app/_component/error-tab'
import LoadingTab from '@/app/_component/loading-tab'
import { SelectOptions } from '@/app/_component/todo-item'
import {
  UpdateTodoBodyRequest,
  useGetTodoQuery,
  useUpdateTodoMutation,
} from '@/lib/redux/services/todos'

export default function TodoDetails({ params }: { params: { id: string } }) {
  const router = useRouter()

  const { data, isError, isLoading, isFetching, isSuccess, refetch } =
    useGetTodoQuery(Number(params.id))

  const [updateTodo, { isLoading: isUpdateTodoLoading }] =
    useUpdateTodoMutation()

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateTodoBodyRequest>()

  useEffect(() => {
    if (data) {
      setValue('title', data.title)
      setValue('description', data.description)
      setValue('status', data.status)
    }
  }, [data, setValue])

  const onSubmit: SubmitHandler<UpdateTodoBodyRequest> = (data) => {
    updateTodo({
      id: Number(params.id),
      body: data,
    })
      .unwrap()
      .then(() => {
        toast.success('Todo updated successfully')
        router.push('/')
        reset()
      })
      .catch((error) => toast.error(error.data || 'Error'))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        columns={12}
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
        py={4}
      >
        <Grid
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={6}
          item
          lg={6}
          md={10}
          sm={12}
          sx={{ width: 1, px: { sm: 2, xs: 2 } }}
        >
          <Typography sx={{ fontWeight: 'bold' }} variant="h4">
            Edit Todo
          </Typography>
          {isLoading || isFetching ? (
            <LoadingTab />
          ) : isError ? (
            <ErrorTab retryHandler={refetch} />
          ) : (
            isSuccess &&
            data && (
              <Card sx={{ width: 1, padding: 2 }}>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                    sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
                  >
                    <TextField
                      error={!!errors.title}
                      helperText={errors.title?.message}
                      placeholder="Title"
                      variant="outlined"
                      fullWidth
                      {...register('title', {
                        required: 'This field required',
                      })}
                    />
                    <Controller
                      control={control}
                      name="status"
                      rules={{ required: 'This field required' }}
                      render={({ field: { onChange } }) => (
                        <TextField
                          fullWidth
                          select
                          value={data.status}
                          error={!!errors.status}
                          helperText={errors.status?.message}
                          label="Status"
                          onChange={onChange}
                        >
                          {SelectOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Box>
                  <TextField
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    multiline
                    minRows={2}
                    maxRows={2}
                    placeholder="Description"
                    variant="outlined"
                    fullWidth
                    {...register('description', {
                      required: 'This field required',
                    })}
                  />
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                    sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' } }}
                  >
                    <Link href="/">
                      <Button>Back to Home</Button>
                    </Link>
                    <LoadingButton
                      loading={isUpdateTodoLoading}
                      disabled={!isDirty}
                      type="submit"
                      variant="contained"
                      sx={{
                        alignSelf: 'flex-end',
                        width: { xs: 1, sm: 'auto' },
                      }}
                    >
                      Save
                    </LoadingButton>
                  </Box>
                </Box>
              </Card>
            )
          )}
        </Grid>
      </Grid>
    </form>
  )
}
