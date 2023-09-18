import { configureStore } from '@reduxjs/toolkit'
import authSlise from './slises/authSlise'
import tasksSlise from './slises/tasksSlise'
import viewSlise from './slises/viewSlise'
import listSlise from './slises/listSlise'

export const store = configureStore({
  reducer: {
    auth: authSlise,
    tasks: tasksSlise,
    views: viewSlise,
    list: listSlise
  },
})