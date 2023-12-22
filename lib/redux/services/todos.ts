import { Todo, TodoStatus } from '@/lib/type'

import { todoApi } from '.'

type AddTodoRequest = Pick<Todo, 'title' | 'description' | 'userId'>

type GetTodosRequest = {
  page: number
  status: TodoStatus
  userId: number
  search?: string
}

export type UpdateTodoBodyRequest = Pick<
  Todo,
  'title' | 'description' | 'status'
>

type UpdateTodoRequest = {
  id: number
  body: UpdateTodoBodyRequest
}

type UpdateTodoStatusRequest = {
  id: number
  status: TodoStatus
}

const todosApi = todoApi.injectEndpoints({
  endpoints: (build) => ({
    addTodo: build.mutation<Todo, AddTodoRequest>({
      query: (values) => ({
        url: '/todos',
        method: 'POST',
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          userId: values.userId,
          status: 'todo',
        }),
      }),
      invalidatesTags: ['todos'],
    }),
    getTodos: build.query<{ items: Todo[]; total: number }, GetTodosRequest>({
      query: (values) => ({
        url: `/todos?userId=${values.userId}&status=${values.status}&_page=${
          values.page
        }&_limit=4${values.search && `&q=${values.search}`}`,
      }),
      transformResponse: (response, meta, _) => {
        const total = Number(meta?.response?.headers.get('X-Total-Count'))
        return {
          items: response as Todo[],
          total,
        }
      },
      providesTags: ['todos'],
    }),
    getTodo: build.query<Todo, number>({
      query: (id) => ({
        url: `/todos/${id}`,
      }),
      providesTags: ['todos'],
    }),
    updateTodo: build.mutation<Todo, UpdateTodoRequest>({
      query: (values) => ({
        url: `/todos/${values.id}`,
        method: 'PATCH',
        body: JSON.stringify(values.body),
      }),
      invalidatesTags: ['todos'],
    }),
    updateTodoStatus: build.mutation<Todo, UpdateTodoStatusRequest>({
      query: (values) => ({
        url: `/todos/${values.id}`,
        method: 'PATCH',
        body: JSON.stringify({ status: values.status }),
      }),
      invalidatesTags: ['todos'],
    }),
    deleteTodo: build.mutation<Todo, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['todos'],
    }),
  }),
})

export const {
  useAddTodoMutation,
  useGetTodoQuery,
  useGetTodosQuery,
  useUpdateTodoMutation,
  useUpdateTodoStatusMutation,
  useDeleteTodoMutation,
} = todosApi
