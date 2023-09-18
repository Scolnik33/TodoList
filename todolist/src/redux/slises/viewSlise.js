import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios'

export const createView = createAsyncThunk('view/createView', async ({ category, task }) => {
    const { data } = await axios.post('/createView', { category, task })

    return data
})

export const allViews = createAsyncThunk('view/allViews', async () => {
    const { data } = await axios.get('/allViews')

    return data
})

export const selectedView = createAsyncThunk('view/selectedView', async (id) => {
    const { data } = await axios.get(`/selectedView/${id}`)

    return data
})

export const deleteSelectedView = createAsyncThunk('view/removeSelectedView', async ({ id, _id }) => {
    const { data } = await axios.patch(`/removeSelectedView/${id}`, { _id })

    return data
})

export const removeView = createAsyncThunk('view/deleteView', async (_id) => {
    const { data } = await axios.delete(`/deleteView/${_id}`)

    return data
})

export const addOneView = createAsyncThunk('view/addOneView', async ({ id, _id }) => {
    const { data } = await axios.post(`/addOneView/${id}`, { _id })

    return data
})

const initialState = {
    items: [],
    viewItems: [],
    loading: 'pending',
    loadingViewItems: 'pending'
}

export const viewSlise = createSlice({
    name: 'view',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [createView.pending]: (state) => {
            state.items = []
            state.loading = 'pending'
        },
        [createView.fulfilled]: (state, action) => {
            state.items = action.payload
            state.loading = 'success'
        },
        [createView.rejected]: (state) => {
            state.items = []
            state.loading = 'error'
        },
        [allViews.pending]: (state) => {
            state.items = []
            state.loading = 'pending'
        },
        [allViews.fulfilled]: (state, action) => {
            state.items = action.payload
            state.loading = 'success'
        },
        [allViews.rejected]: (state) => {
            state.items = []
            state.loading = 'error'
        },
        [selectedView.pending]: (state) => {
            state.viewItems = []
            state.loadingViewItems = 'pending'
        },
        [selectedView.fulfilled]: (state, action) => {
            state.viewItems = action.payload
            state.loadingViewItems = 'success'
        },
        [selectedView.rejected]: (state) => {
            state.viewItems = []
            state.loadingViewItems = 'error'
        },
        [deleteSelectedView.pending]: (state) => {
            state.viewItems = []
            state.loadingViewItems = 'pending'
        },
        [deleteSelectedView.fulfilled]: (state, action) => {
            state.viewItems = action.payload
            state.loadingViewItems = 'success'
        },
        [deleteSelectedView.rejected]: (state) => {
            state.viewItems = []
            state.loadingViewItems = 'error'
        },
        [removeView.pending]: (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.meta.arg)
            state.loading = 'success'
        },
        [removeView.rejected]: (state) => {
            state.items = []
            state.loading = 'error'
        },
        [addOneView.pending]: (state) => {
            state.viewItems = []
            state.loading = 'pending'
        },
        [addOneView.fulfilled]: (state, action) => {
            state.viewItems = action.payload
            state.loading = 'success'
        },
        [addOneView.rejected]: (state) => {
            state.viewItems = []
            state.loading = 'error'
        },
    }
})

export const { addViewItem } = viewSlise.actions

export const fetchItems = (state) => state.views.items
export const viewItems = (state) => state.views.viewItems
export const loadingState = (state) => state.views.loading
export const loadingViewItemsState = (state) => state.views.loadingViewItems

export default viewSlise.reducer