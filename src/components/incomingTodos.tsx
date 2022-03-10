import React, { useEffect } from 'react'
import { getTodos, incomingTodo, patchTodos, postTodos, deleteTodo } from '../network/network'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addNetworkTodos, createNetworkTodo, deleteNetworkTodo, sortAlphabetically, updateNetworkTodo } from '../redux/todosReducer'


function Todo({ todo, updatePayload, deletePayload }: { todo: incomingTodo, updatePayload: Function, deletePayload: Function }) {
    return (
        <ul className='mt-3'>
            <li>
                <span className='me-2'>{todo.content}</span>
                <button className='btn me-3 btn-warning' onClick={() => updatePayload(todo._id)}>Update Todo</button>
                <button className='btn me-3 btn-danger' onClick={() => deletePayload(todo._id)}>Delete Todo</button>
                {todo.done ? null : <button type='button' className='btn btn-outline-primary me-2'>Done</button>}
            </li>
        </ul>
    )
}

export function IncomingTodos() {
    // const [networkTodos, setNetworkTodos] = useState<incomingTodos[]>([])
    const storedTodos = useAppSelector((state) => state.todos.value)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!storedTodos.length) {
            const result = getTodos()
            result.then(res => dispatch(addNetworkTodos(res.response)))
        }
    }, [storedTodos, dispatch])

    const postPayload = (): void => {
        const payload = {
            content: 'Demon slayer is the best',
            done: false
        }
        const result = postTodos(payload)
        result.then(res => dispatch(createNetworkTodo(res.response)))
    }

    const updatePayload = (id: string): void => {
        const result = patchTodos({ content: 'Jujutsu Kaisen' }, id)
        result.then(res => dispatch(updateNetworkTodo(res.response)))
    }

    const deletePayload = (id: string): void => {
        deleteTodo(id)
        // Normally you'd check for the status code then update redux.
        dispatch(deleteNetworkTodo(id))
        // result.then(res => {dispatch(deleteNetworkTodo(res.userId))})
    }

    const sortTodos = (type: string) => {
        if (type === 'alphabet') {
            dispatch(sortAlphabetically())
        } else {
            const result = getTodos()
            result.then(res => dispatch(addNetworkTodos(res.response)))
        }
    }

    return (
        <>
            <div className="createPost">
                <button className='btn me-3 btn-outline-success' onClick={postPayload}>Post Payload</button>
                <div className='mt-3'>
                    <button className='btn me-3 btn-success' onClick={() => sortTodos('alphabet')}>Sort: Alphabetically</button>
                    <button className='btn me-3 btn-danger' onClick={() => sortTodos('')}>Reset</button>
                </div>
            </div>
            <div>{storedTodos.length ? storedTodos.map((todo, index) => (
                <Todo key={index} todo={todo} updatePayload={updatePayload} deletePayload={deletePayload} />
            )) : null}
            </div>
        </>
    )
}