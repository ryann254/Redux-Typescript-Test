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
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter(todo => todo.id !== action.payload)
        }
    }
})

export const { addTodo, deleteTodo } = todosSlice.actions

export default todosSlice.reducer