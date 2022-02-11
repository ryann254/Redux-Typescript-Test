import React, { useState } from 'react';

export interface ITodosProps {
}

function Todo({ value }: { value: string }) {
    return (
        <ul>
            <li>
                {value}
            </li>
        </ul>
    )
}

export function Todos(props: ITodosProps) {
    const [createTodo, setCreateTodo] = useState<string[]>([])
    const [todo, setTodo] = useState('')

    const handleSubmit = (evt: React.FormEvent, value: string) => {
        evt.preventDefault()
        setTodo('')
        if (todo.length) {
            setCreateTodo([...createTodo, value])
        }
    }
    return (
        <div className='col-6 mt-5 mx-auto'>
            <form onSubmit={(e) => handleSubmit(e, todo)}>
                <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
            {createTodo.length ? createTodo.map((todo, index) => (
                <Todo value={todo} key={index} />
            )) : null}
        </div>
    );
}
