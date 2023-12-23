import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { deleteCookie, getCookie } from 'cookies-next'

import { UserActions } from '../slices/user'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = getCookie('accessToken')

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }

    headers.set('Accept', 'application/json')
    headers.set('Content-Type', 'application/json')
    return headers
  },
})

const authenticatedBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    deleteCookie('accessToken')
    api.dispatch(UserActions.resetUser())
  }
  return result
}

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: authenticatedBaseQuery,
  tagTypes: ['todos'],
  endpoints: () => ({}),
})
