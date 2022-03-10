import { incomingTodo, incomingResponses } from './../network/network';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { TodoInt } from "../components/todos";

interface todosInitialState {
    value: incomingTodo[]
}

const initialState: todosInitialState = {
    value: []
}

export const todosSlice = createSlice({
    name: 'todosReducer',
    initialState,
    reducers: {
        addNetworkTodos: (state, action: PayloadAction<incomingTodo[]>) => {
            state.value = action.payload
        },
        createNetworkTodo: (state, action: PayloadAction<incomingTodo>) => {
            state.value.unshift(action.payload)
        },
        updateNetworkTodo: (state, action: PayloadAction<incomingTodo>) => {
            const filteredArray = state.value.filter((item) => item._id !== action.payload._id)
            filteredArray.unshift(action.payload)
            state.value = filteredArray
        },
        deleteNetworkTodo: (state, action: PayloadAction<string>) => {
            state.value = state.value.filter((item) => item._id !== action.payload)
        },
        // sortByOddNumbers: (state) => {
        //     state.value = state.value.filter((item) => item._id % 2 > 0)
        // },
        // sortByEvenNumbers: (state) => {
        //     state.value = state.value.filter((item) => item.id % 2 === 0)
        // },
        sortAlphabetically: (state) => {
            state.value = state.value.sort(function (a, b) {
                if (a.content < b.content) {
                    return -1
                }

                if (a.content > b.content) {
                    return 1
                }
                return 0
            })
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

export const { addNetworkTodos, createNetworkTodo, updateNetworkTodo, deleteNetworkTodo, sortAlphabetically } = todosSlice.actions
// export const { addTodo, updateTodo, completeTodo, deleteTodo } = todosSlice.actions

export default todosSlice.reducer