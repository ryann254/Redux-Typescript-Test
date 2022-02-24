import React, { useEffect, useState } from 'react'
import { getTodos, incomingTodos } from '../network/network'


function Todo({ key, value }: { key: number, value: incomingTodos }) {
    useEffect(() => {
        division(2, 4);
     }, [])
     
     const division = (a: number, b:number) => {
        return a * b
    }
    return (
        <ul className='mt-3'>
            <li>
                <span className='me-2'>{value.title}</span>
                {value.completed ? null : <button type='button' className='btn btn-outline-primary me-2'>Done</button>}
            </li>
        </ul>
    )
}

export function incomingTodos() {
    const [networkTodos, setNetworkTodos] = useState<incomingTodos[]>([])
    useEffect(() => {
        if (!networkTodos.length) {
            getTodos().then(res => setNetworkTodos(res))
        }
    }, [networkTodos])
    return (
        <div>{networkTodos.length ? networkTodos.map((todo, index) => (
            <Todo key={index} todo={todo} />
        )) : null}</div>
    )
}