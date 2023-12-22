import { LoadingButton } from '@mui/lab'
import { Box, Modal, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useAddTodoMutation } from '@/lib/redux/services/todos'

import { TodoTabProps } from './tabs/todo-tab'

type TodoModalProps = {
  open: boolean
  onClose: () => void
}

export type AddTodoInputs = {
  title: string
  description: string
}

const BoxStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
}

const TodoModal = ({
  open,
  onClose,
  userId,
}: TodoModalProps & TodoTabProps) => {
  const [addTodo, { isLoading }] = useAddTodoMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTodoInputs>()

  const onSubmit: SubmitHandler<AddTodoInputs> = (data) => {
    addTodo({
      ...data,
      userId,
    })
      .unwrap()
      .then(() => {
        toast.success('Todo added successfully')
        reset()
        onClose()
      })
      .catch((error) => toast.error(error.data || 'Error'))
  }

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          borderRadius={1}
          sx={BoxStyle}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={4}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Add Todo
          </Typography>
          <Box
            sx={{ width: 1 }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <TextField
              error={!!errors.title}
              helperText={errors.title?.message}
              placeholder="Title"
              variant="outlined"
              fullWidth
              {...register('title', { required: 'This field required' })}
            />
            <TextField
              error={!!errors.description}
              helperText={errors.description?.message}
              multiline
              minRows={2}
              maxRows={2}
              placeholder="Description"
              variant="outlined"
              fullWidth
              {...register('description', { required: 'This field required' })}
            />
          </Box>
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            fullWidth
          >
            Add
          </LoadingButton>
        </Box>
      </form>
    </Modal>
  )
}

export default TodoModal
