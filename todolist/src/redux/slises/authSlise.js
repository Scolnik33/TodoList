import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios'

export const userRegister = createAsyncThunk('auth/userRegister', async ({ username, password }) => {
    const { data } = await axios.post('/register', { username, password })

    if (data.token) {
        window.localStorage.setItem('token', data.token)
    }

    if (data.username) {
        window.localStorage.setItem('name', data.username)
    }

    return data
})

export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
    const { data } = await axios.post('/login', { username, password })

    if (data.token) {
        window.localStorage.setItem('token', data.token)
    }

    if (data.username) {
        window.localStorage.setItem('name', data.username)
    }

    return data
})

export const getMe = createAsyncThunk('auth/getMe', async () => {
    const { data } = await axios.get('/getMe')

    return data
})

const initialState = {
    name: '',
    items: [],
    token: '',
    lodaing: 'pending',
    active: false,
    message: ''
}

export const authSlise = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        exit: (state) => {
            state.items = []
            state.username = ''
            state.token = ''
            state.lodaing = 'pending'
            state.active = false
            state.message = ''
        }
    },
    extraReducers: {
        [userRegister.pending]: (state) => {
            state.items = []
            state.loading = 'pending'
        },
        [userRegister.fulfilled]: (state, action) => {
            state.items = action.payload
            state.token = action.payload.token
            state.name = action.payload.username
            state.active = true
            state.loading = 'success'
            state.message = action.payload.message
        },
        [userRegister.rejected]: (state) => {
            state.items = []
            state.loading = 'error'
        },
        [getMe.pending]: (state) => {
            state.items = []
            state.loading = 'pending'
        },
        [getMe.fulfilled]: (state, action) => {
            state.items = action.payload
            state.token = action.payload.token
            state.name = action.payload.username
            state.active = true
            state.loading = 'success'
            state.message = action.payload.message
        },
        [getMe.rejected]: (state) => {
            state.items = []
            state.loading = 'error'
        },
        [login.pending]: (state) => {
            state.items = []
            state.loading = 'pending'
        },
        [login.fulfilled]: (state, action) => {
            state.items = action.payload
            state.token = action.payload.token
            state.name = action.payload.username
            state.active = true
            state.loading = 'success'
            state.message = action.payload.message
        },
        [login.rejected]: (state) => {
            state.items = []
            state.loading = 'error'
        },
    }
})

export const { exit } = authSlise.actions

export const checkIsAuth = (state) => Boolean(state.auth.token)
export const loading = (state) => state.auth.loading
export const active = (state) => state.auth.active
export const currentMessage = (state) => state.auth.message

export default authSlise.reducer