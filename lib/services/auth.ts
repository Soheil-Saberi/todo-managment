import { setCookie } from 'cookies-next'

import { User } from '../type'
import { todoApi } from '.'

type LoginRequest = {
  email: string
  password: string
}

type LoginResponse = {
  accessToken: string
  user: User
}

type RegisterRequest = LoginRequest & {
  name: string
}

const authApi = todoApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (values) => ({
        url: '/login',
        method: 'POST',
        body: JSON.stringify(values),
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const res = await queryFulfilled
        if (res.data) setCookie('accessToken', res.data.accessToken)
      },
    }),
    register: build.mutation<LoginResponse, RegisterRequest>({
      query: (values) => ({
        url: '/register',
        method: 'POST',
        body: JSON.stringify(values),
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const res = await queryFulfilled
        if (res.data) setCookie('accessToken', res.data.accessToken)
      },
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi
