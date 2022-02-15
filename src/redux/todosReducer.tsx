import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoInt } from "../components/todos";
import type { RootState } from "./store";

interface todosInitialState {
    value: TodoInt[]
}

const initialState: todosInitialState = {
    value: []
}

export const todosSlice = createSlice({
    name: 'todosReducer',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<TodoInt>) => {
            state.value.push(action.payload)
        }
    }
})

export const { addTodo } = todosSlice.actions

export default todosSlice.reducer