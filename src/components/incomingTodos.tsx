import React, { useEffect, useState } from 'react'
import { getTodos, incomingTodos, patchTodos, postTodos, deleteTodo } from '../network/network'


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
    const [networkTodos, setNetworkTodos] = useState<incomingTodos[]>([])
    useEffect(() => {
        if (!networkTodos.length) {
            const result = getTodos()
            result.then(res => setNetworkTodos(res))
        }
    }, [networkTodos])

    const postPayload = () => {
        const payload = {
            title: 'Demon Slayer',
            body: 'Demon slayer is the best',
            userId: 1
        }
        const result = postTodos(payload)
        result.then(res => console.log(res))
    }

    const updatePayload = () => {
        const result = patchTodos({ title: 'Jujutsu Kaisen' })
        result.then(res => console.log(res))
    }

    const deletePayload = () => {
        const result = deleteTodo(1)
        result.then(res => console.log(res))
    }

    return (
        <>
            <div className="createPost">
                <button className='btn me-3 btn-outline-success' onClick={postPayload}>Post Payload</button>
                <button className='btn me-3 btn-warning' onClick={updatePayload}>Update Payload</button>
                <button className='btn me-3 btn-danger' onClick={deletePayload}>Delete Payload</button>
            </div>
            <div>{networkTodos.length ? networkTodos.map((todo, index) => (
                <Todo key={index} todo={todo} />
            )) : null}
            </div>
        </>
    )
}