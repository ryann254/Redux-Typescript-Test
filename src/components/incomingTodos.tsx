import React, { useEffect, useState } from 'react'
import { getTodos, incomingTodos, postTodos } from '../network/network'


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

    return (
        <>
            <div className="createPost">
                <button className='btn btn-outline-success' onClick={postPayload}>Post</button>
            </div>
            <div>{networkTodos.length ? networkTodos.map((todo, index) => (
                <Todo key={index} todo={todo} />
            )) : null}
            </div>
        </>
    )
}