import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'

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

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery,
  tagTypes: ['todos'],
  endpoints: () => ({}),
})
