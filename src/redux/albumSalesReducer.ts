import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface todosInitialState {
    listeners: number[],
    cityNames: string[],
    artistDetails: Record<string, string>,
    totalMonthlyListeners: number,
    totalIncome: number,
    pricePerStream: number
}

const initialState: todosInitialState = {
    listeners: [],
    cityNames: [],
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
        addCityNames: (state, action: PayloadAction<string[]>) => {
            state.cityNames = action.payload
        },
        addListenersByCity: (state, action: PayloadAction<number[]>) => {
            state.listeners = action.payload
        }
    }
})

export const { addArtistDetails, addMonthlyListenersAndIncome, addCityNames, addListenersByCity } = albumSalesSlice.actions
// export const { addTodo, updateTodo, completeTodo, deleteTodo } = todosSlice.actions

export default albumSalesSlice.reducer