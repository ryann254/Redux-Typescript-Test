import React, { useEffect } from 'react'
import { getTodos, incomingTodos, patchTodos, postTodos, deleteTodo } from '../network/network'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addNetworkTodos, createNetworkTodo, deleteNetworkTodo, sortAlphabetically, sortByEvenNumbers, sortByOddNumbers, updateNetworkTodo } from '../redux/todosReducer'


function Todo({ todo }: { todo: incomingTodos }) {
    return (
        <ul className='mt-3'>
            <li>
                <span className='me-2'>{todo.title}</span>
                {todo.completed ? null : <button type='button' className='btn btn-outline-primary me-2'>Done</button>}
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
            result.then(res => dispatch(addNetworkTodos(res)))
        }
    }, [storedTodos, dispatch])

    const postPayload = (): void => {
        const payload = {
            title: 'Demon Slayer',
            body: 'Demon slayer is the best',
            userId: 1
        }
        const result = postTodos(payload)
        result.then(res => dispatch(createNetworkTodo(res)))
    }

    const updatePayload = (): void => {
        const result = patchTodos({ title: 'Jujutsu Kaisen' })
        result.then(res => dispatch(updateNetworkTodo(res)))
    }

    const deletePayload = (): void => {
        deleteTodo(1)
        // Normally you'd check for the status code then update redux.
        dispatch(deleteNetworkTodo(1))
        // result.then(res => {dispatch(deleteNetworkTodo(res.userId))})
    }

    const sortTodos = (type: string) => {
        if (type === 'odd') {
            dispatch(sortByOddNumbers())
        } else if (type === 'even') {
            dispatch(sortByEvenNumbers())
        } else if (type === 'alphabet') {
            dispatch(sortAlphabetically())
        } else {
            const result = getTodos()
            result.then(res => dispatch(addNetworkTodos(res)))
        }
    }

    return (
        <>
            <div className="createPost">
                <button className='btn me-3 btn-outline-success' onClick={postPayload}>Post Payload</button>
                <button className='btn me-3 btn-warning' onClick={updatePayload}>Update Payload</button>
                <button className='btn me-3 btn-danger' onClick={deletePayload}>Delete Payload</button>
                <div className='mt-3'>
                    <button className='btn me-3 btn-primary' onClick={() => sortTodos('odd')}>Sort: Remove odd numbers</button>
                    <button className='btn me-3 btn-primary' onClick={() => sortTodos('even')}>Sort: Remove even numbers</button>
                    <button className='btn me-3 btn-success' onClick={() => sortTodos('alphabet')}>Sort: Alphabetically</button>
                    <button className='btn me-3 btn-danger' onClick={() => sortTodos('')}>Reset</button>
                </div>
            </div>
            <div>{storedTodos.length ? storedTodos.map((todo, index) => (
                <Todo key={index} todo={todo} />
            )) : null}
            </div>
        </>
    )
}