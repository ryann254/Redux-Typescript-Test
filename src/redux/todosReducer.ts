import { incomingTodos } from './../network/network';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { TodoInt } from "../components/todos";

interface todosInitialState {
    value: incomingTodos[]
}

const initialState: todosInitialState = {
    value: []
}

export const todosSlice = createSlice({
    name: 'todosReducer',
    initialState,
    reducers: {
        addNetworkTodos: (state, action: PayloadAction<incomingTodos[]>) => {
            state.value = action.payload
        },
        createNetworkTodo: (state, action: PayloadAction<incomingTodos>) => {
            state.value.unshift(action.payload)
        },
        updateNetworkTodo: (state, action: PayloadAction<incomingTodos>) => {
            const filteredArray = state.value.filter((item) => item.id !== action.payload.id)
            filteredArray.unshift(action.payload)
            state.value = filteredArray
        }
        // addTodo: (state, action: PayloadAction<TodoInt>) => {
        //     state.value.push(action.payload)
        // },
        // updateTodo: (state, action: PayloadAction<TodoInt>) => {
        //     state.value = state.value.filter((item) => item.id !== action.payload.id)
        //     // Try adding updated items to the top or bottom.
        //     state.value.unshift(action.payload)
        // },
        // completeTodo: (state, action: PayloadAction<TodoInt>) => {
        //     state.value = state.value.filter((item) => item.id !== action.payload.id)
        //     state.value.push(action.payload)
        // },
        // deleteTodo: (state, action: PayloadAction<number>) => {
        //     state.value = state.value.filter(todo => todo.id !== action.payload)
        // }
    }
})

export const { addNetworkTodos, createNetworkTodo, updateNetworkTodo } = todosSlice.actions
// export const { addTodo, updateTodo, completeTodo, deleteTodo } = todosSlice.actions

export default todosSlice.reducer