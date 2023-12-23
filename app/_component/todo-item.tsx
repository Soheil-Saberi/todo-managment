import { Delete, Edit } from '@mui/icons-material'
import {
  Box,
  Card,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { ChangeEvent } from 'react'
import toast from 'react-hot-toast'

import {
  useDeleteTodoMutation,
  useUpdateTodoStatusMutation,
} from '@/lib/redux/services/todos'
import { Todo, TodoStatus } from '@/lib/type'

type TodoItemProps = {
  todo: Todo
}

export const SelectOptions = ['todo', 'doing', 'done']

const TodoItem = ({ todo }: TodoItemProps) => {
  const [changeStatus] = useUpdateTodoStatusMutation()

  const [deleteTodo] = useDeleteTodoMutation()

  const handleChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
    if (todo.status !== event.target.value)
      changeStatus({
        id: todo.id,
        status: event.target.value as TodoStatus,
      })
        .then(() => toast.success('Status updated'))
        .catch((error) => toast.error(error.data || 'Error'))
  }

  const handleDelete = () => {
    deleteTodo(todo.id)
      .unwrap()
      .then(() => toast.success('Todo deleted'))
      .catch((error) => toast.error(error.data || 'Error'))
  }

  return (
    <Card id={todo.id.toString()} sx={{ width: 1 }}>
      <Box
        p={2}
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'initial', sm: 'center' }}
        gap={{ xs: 2, sm: 0 }}
        justifyContent="space-between"
      >
        <Box flex="1" gap={{ xs: 0, sm: 2 }}>
          <Typography sx={{ fontWeight: 'bold' }}>{todo.title}</Typography>
          <Typography>{todo.description}</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <TextField
            sx={{ width: { xs: 1, sm: 200, md: 150 } }}
            size="small"
            select
            defaultValue={todo.status}
            label="Status"
            onChange={handleChangeStatus}
          >
            {SelectOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Box display="flex" alignItems="center" gap={2}>
            <Link href={`/todo/${todo.id}`}>
              <IconButton>
                <Edit color="primary" />
              </IconButton>
            </Link>
            <IconButton onClick={handleDelete}>
              <Delete color="error" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default TodoItem
