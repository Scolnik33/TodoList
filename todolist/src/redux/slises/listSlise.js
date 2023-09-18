import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios'

export const createList = createAsyncThunk('list/createList', async ({ category }) => {
    const { data } = await axios.post('/createList', { category })

    return data
})

export const allLists = createAsyncThunk('list/allLists', async () => {
    const { data } = await axios.get('/allLists')

    return data
})

export const removeList = createAsyncThunk('list/removeList', async (id) => {
    const { data } = await axios.delete(`/deleteList/${id}`)

    return data
})

export const removeFromList = createAsyncThunk('list/removeFromList', async ({ id, _id }) => {
    const { data } = await axios.patch(`/deleteFromList/${id}`, { _id })

    return data
})

const initialState = {
    items: [],
    loading: 'pending'
}

export const listSlise = createSlice({
    name: 'list',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [createList.pending]: (state) => {
            state.items = []
            state.loading = 'pending'
        },
        [createList.fulfilled]: (state, action) => {
            state.items = action.payload
            state.loading = 'success'
        },
        [createList.rejected]: (state) => {
            state.items = []
            state.loading = 'rejected'
        },
        [allLists.pending]: (state) => {
            state.items = []
            state.loading = 'pending'
        },
        [allLists.fulfilled]: (state, action) => {
            state.items = action.payload
            state.loading = 'success'
        },
        [allLists.rejected]: (state) => {
            state.items = []
            state.loading = 'rejected'
        },
        [removeList.pending]: (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.meta.arg)
            state.loading = 'success'
        },
        [removeList.rejected]: (state) => {
            state.items = []
            state.loading = 'rejected'
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
            state.loading = 'rejected'
        },
    }
})

export const listItems = (state) => state.list.items
export const loadingList = (state) => state.list.loading

export default listSlise.reducer