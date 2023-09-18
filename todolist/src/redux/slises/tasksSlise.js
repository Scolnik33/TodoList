import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios'

export const createTask = createAsyncThunk('tasks/createTask', async ({ category, task }) => {
    const { data } = await axios.post('/createTask', { category, task })

    return data
})

export const getAllTasks = createAsyncThunk('tasks/getAllTasks', async () => {
    const { data } = await axios.get('/allTasks')

    return data
})

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id ,category, task }) => {
    const { data } = await axios.patch(`/oneTask/${id}`, { category, task })

    return data
})

export const removeTask = createAsyncThunk('tasks/removeTask', async (_id) => {
    const { data } = await axios.delete(`/oneTask/${_id}`)

    return data
})

export const listTasks = createAsyncThunk('tasks/listTasks', async (id) => {
    const { data } = await axios.get(`/listTasks/${id}`)

    return data
})

export const removeFromList = createAsyncThunk('list/removeFromList', async ({ id, _id }) => {
    const { data } = await axios.patch(`/deleteFromList/${id}`, { _id })

    return data
})

const initialState = {
    items: [],
    listItems: [],
    loading: 'pending'
}

export const tasksSlise = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        
    }, 
    extraReducers: {
        [getAllTasks.pending]: (state) => {
            state.items = []
            state.loading = 'pending'
        },
        [getAllTasks.fulfilled]: (state, action) => {
            state.items = action.payload
            state.loading = 'success'
        },
        [getAllTasks.rejected]: (state) => {
            state.items = []
            state.loading = 'error'
        },
        [createTask.pending]: (state) => {
            state.items = []
            state.loading = 'pending'
        },
        [createTask.fulfilled]: (state, action) => {
            state.items = action.payload
            state.loading = 'success'
        },
        [createTask.rejected]: (state) => {
            state.items = []
            state.loading = 'error'
        },
        [updateTask.pending]: (state) => {
            state.items = []
            state.loading = 'pending'
        },
        [updateTask.fulfilled]: (state, action) => {
            state.items = action.payload
            state.loading = 'success'
        },
        [updateTask.rejected]: (state) => {
            state.items = []
            state.loading = 'error'
        },
        [removeTask.pending]: (state, action) => {
            state.items = state.items.filter((item) => item._id != action.meta.arg)
            state.loading = 'pending'
        },
        [removeTask.fulfilled]: (state) => {
            state.loading = 'success'
        },
        [removeTask.rejected]: (state) => {
            state.items = []
            state.loading = 'error'
        },
        [listTasks.pending]: (state) => {
            state.listItems = []
            state.loading = 'pending'
        },
        [listTasks.fulfilled]: (state, action) => {
            state.listItems = action.payload
            state.loading = 'success'
        },
        [listTasks.rejected]: (state) => {
            state.listItems = []
            state.loading = 'error'
        },
        [removeFromList.pending]: (state) => {
            state.listItems = []
            state.loading = 'pending'
        },
        [removeFromList.fulfilled]: (state, action) => {
            state.listItems = action.payload
            state.loading = 'success'
        },
        [removeFromList.rejected]: (state) => {
            state.listItems = []
            state.loading = 'error'
        },
    }
})

export const allTasks = (state) => state.tasks.items
export const listItems = (state) => state.tasks.listItems
export const stateLoading = (state) => state.tasks.loading

export default tasksSlise.reducer