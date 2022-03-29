import { createSlice } from "@reduxjs/toolkit";

interface todosInitialState {
    // New element.
    value: number[]
}

const initialState: todosInitialState = {
    value: [
        1000,
        5433000,
        21000000,
        27000000,
        11000000,
        2363000,
        10000000,
        2244000,
        435000,
        493000,
        1100000,
    ]
}

export const albumSalesSlice = createSlice({
    name: 'albumSalesReducer',
    initialState,
    reducers: {
        addSales: () => { },
    }
})

export const { addSales } = albumSalesSlice.actions
// export const { addTodo, updateTodo, completeTodo, deleteTodo } = todosSlice.actions

export default albumSalesSlice.reducer