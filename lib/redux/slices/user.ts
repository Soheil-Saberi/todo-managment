import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '@/lib/type'

const initialState: Partial<User> & { theme: 'light' | 'dark' } = {
  id: undefined,
  name: '',
  email: '',
  theme: 'light',
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    resetUser: (state) => {
      state.id = undefined
      state.name = ''
      state.email = ''
      state.theme = 'light'
    },
  },
})

export const UserReducer = UserSlice.reducer

export const UserActions = UserSlice.actions

export default UserSlice
