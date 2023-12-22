'use client'

import { Add, DarkMode, LightMode, Logout } from '@mui/icons-material'
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { deleteCookie } from 'cookies-next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState } from 'react'

import useDebounce from '@/hooks/useDebounce'
import { UserActions } from '@/lib/redux/slices/user'
import { useDispatch, useSelector } from '@/lib/redux/store'

import LoadingTab from './_component/loading-tab'
import TodoModal from './_component/todo-modal'

const DoingTab = dynamic(() => import('./_component/tabs/doing-tab'), {
  loading: () => <LoadingTab />,
})
const DoneTab = dynamic(() => import('./_component/tabs/done-tab'), {
  loading: () => <LoadingTab />,
})
const TodoTab = dynamic(() => import('./_component/tabs/todo-tab'), {
  loading: () => <LoadingTab />,
})

export default function Home() {
  const router = useRouter()

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [selectedTab, setSelectedTab] = useState<0 | 1 | 2>(0)
  const [isShowTodoModal, setIsShowTodoModal] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')

  const search = useDebounce<string>(searchValue, 400)

  const handleChangeTab = (_: SyntheticEvent, newValue: 0 | 1 | 2) =>
    setSelectedTab(newValue)

  return (
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
        xs={6}
        sx={{ width: 1 }}
      >
        <Box
          sx={{ width: 1 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography sx={{ fontWeight: 'bold' }}>Hi, {user.name}</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton onClick={() => dispatch(UserActions.toggleTheme())}>
              {user.theme === 'light' ? (
                <LightMode />
              ) : (
                <DarkMode color="secondary" />
              )}
            </IconButton>
            <IconButton
              onClick={() => {
                deleteCookie('accessToken')
                dispatch(UserActions.resetUser())
                router.replace('/login')
              }}
            >
              <Logout />
            </IconButton>
          </Box>
        </Box>
        <Typography sx={{ fontWeight: 'bold' }} variant="h4">
          Todo Management
        </Typography>
        <Box
          sx={{ width: 1 }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: 1 }}
          >
            <TextField
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              size="small"
              placeholder="Search ..."
            />
            <Button
              onClick={() => setIsShowTodoModal(true)}
              variant="contained"
              sx={{ alignSelf: 'flex-end' }}
            >
              Add Todo <Add />
            </Button>
          </Box>
          <Box sx={{ borderColor: 'divider', width: 1 }}>
            <Tabs value={selectedTab} onChange={handleChangeTab} centered>
              <Tab label="Todo" id="todo-tab" />
              <Tab label="Doing" id="doing-tab" />
              <Tab label="Done" id="done-tab" />
            </Tabs>
            <Box role="tabpanel">
              {selectedTab === 0 ? (
                <TodoTab userId={user.id!} search={search} />
              ) : selectedTab === 1 ? (
                <DoingTab userId={user.id!} search={search} />
              ) : (
                <DoneTab userId={user.id!} search={search} />
              )}
            </Box>
          </Box>
        </Box>
      </Grid>
      <TodoModal
        open={isShowTodoModal}
        onClose={() => setIsShowTodoModal(false)}
        userId={user.id!}
      />
    </Grid>
  )
}
