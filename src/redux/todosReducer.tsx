import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoInt } from "../components/todos";

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
        },
        updateTodo: (state, action: PayloadAction<TodoInt>) => {
            state.value = state.value.filter((item) => item.id !== action.payload.id)
            // Try adding updated items to the top or bottom.
            state.value.unshift(action.payload)
        },
        completeTodo: (state, action: PayloadAction<TodoInt>) => {
            state.value = state.value.filter((item) => item.id !== action.payload.id)
            state.value.push(action.payload)
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter(todo => todo.id !== action.payload)
        }
    }
})

export const { addTodo, updateTodo, completeTodo, deleteTodo } = todosSlice.actions

export default todosSlice.reducer