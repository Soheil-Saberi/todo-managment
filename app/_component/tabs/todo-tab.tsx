import { Box, Pagination } from '@mui/material'
import { ChangeEvent, useState } from 'react'

import { useGetTodosQuery } from '@/lib/redux/services/todos'

import EmptyTab from '../empty-tab'
import ErrorTab from '../error-tab'
import LoadingTab from '../loading-tab'
import TodoItem from '../todo-item'

export type TodoTabProps = {
  userId: number
  search?: string
}

const TodoTab = ({ userId, search }: TodoTabProps) => {
  const [page, setPage] = useState<number>(1)

  const handleChangePage = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const { data, isSuccess, isError, isLoading, isFetching, refetch } =
    useGetTodosQuery({
      page,
      userId: userId!,
      status: 'todo',
      search,
    })

  if (isLoading || isFetching) return <LoadingTab />

  if (isError) return <ErrorTab retryHandler={refetch} />

  return isSuccess && !!data.items.length ? (
    <Box
      height={1}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box display="flex" flexDirection="column" gap={2}>
        {data.items.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </Box>
      <Pagination
        sx={{ marginTop: 2, alignSelf: 'center' }}
        count={Math.ceil(data.total / 4)}
        page={page}
        onChange={handleChangePage}
      />
    </Box>
  ) : (
    <EmptyTab />
  )
}

export default TodoTab
