import { albumSalesSlice } from './albumSalesReducer';
import { todosSlice } from './todosReducer';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        todos: todosSlice.reducer,
        albumSales: albumSalesSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch