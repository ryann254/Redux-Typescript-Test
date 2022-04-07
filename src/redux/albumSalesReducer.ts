import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface todosInitialState {
    value: number[],
    artistDetails: Record<string, string>
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
    artistDetails: {}
}

export const albumSalesSlice = createSlice({
    name: 'albumSalesReducer',
    initialState,
    reducers: {
        addArtistDetails: (state, action: PayloadAction<Record<string, string>>) => {
            state.artistDetails = action.payload
        },
    }
})

export const { addArtistDetails } = albumSalesSlice.actions
// export const { addTodo, updateTodo, completeTodo, deleteTodo } = todosSlice.actions

export default albumSalesSlice.reducer