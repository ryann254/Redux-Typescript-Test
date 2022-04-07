import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface todosInitialState {
    value: number[],
    artistDetails: Record<string, string>,
    totalMonthlyListeners: number,
    totalIncome: number,
    pricePerStream: number
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
    ],
    artistDetails: {},
    totalMonthlyListeners: 0,
    totalIncome: 0,
    pricePerStream: 0.005
}

export const albumSalesSlice = createSlice({
    name: 'albumSalesReducer',
    initialState,
    reducers: {
        addArtistDetails: (state, action: PayloadAction<Record<string, string>>) => {
            state.artistDetails = action.payload
        },
        addMonthlyListenersAndIncome: (state, action: PayloadAction<number>) => {
            state.totalMonthlyListeners = action.payload
            state.totalIncome = (action.payload * state.pricePerStream)
        },
    }
})

export const { addArtistDetails, addMonthlyListenersAndIncome } = albumSalesSlice.actions
// export const { addTodo, updateTodo, completeTodo, deleteTodo } = todosSlice.actions

export default albumSalesSlice.reducer