import React, { useState } from 'react';

export interface ITodosProps {
}

interface TodoInt {
    id: number,
    content: string,
    done: boolean
}

function Todo({ value, handleDelete, handleUpdate }: { value: TodoInt, handleDelete: Function, handleUpdate: Function }) {

    return (
        <ul className='mt-3'>
            <li>
                <span className='me-2'>{value.content}</span>
                <button type='button' className='btn btn-outline-warning me-2' onClick={(e) => handleUpdate(e, value)}>Update</button>
                <button type='button' className='btn btn-danger rounded-circle' onClick={(e) => handleDelete(e, value.id)}>x</button>
            </li>
        </ul>
    )
}

export function Todos(props: ITodosProps) {
    const [createTodo, setCreateTodo] = useState<TodoInt[]>([])
    const [todo, setTodo] = useState<TodoInt>({ id: 1, content: '', done: false })
    const [todoId, setTodoId] = useState(1);

    const handleSubmit = (evt: React.FormEvent, value: TodoInt) => {
        evt.preventDefault()
        // Increment the todoId so that we don't have two similar ids.
        setTodoId(todoId + 1)
        setTodo({ id: 0, content: '', done: false })
        if (todo?.content.length) {
            setCreateTodo([...createTodo, value])
        }
    }

    const handleDelete = (evt: React.MouseEvent, value: number) => {
        evt.preventDefault()
        const newTodos = createTodo.filter(todo => todo.id !== value)
        setCreateTodo(newTodos)
    }

    const handleUpdate = (evt: React.MouseEvent, value: TodoInt) => {
        evt.preventDefault()
        // Add the value to the input.
        setTodo(value)
        // Then update it in the todos.
    }
    return (
        <div className='col-6 mt-5 mx-auto'>
            <form onSubmit={(e) => handleSubmit(e, todo)}>
                <input type="text" value={todo?.content} onChange={(e) => setTodo({ id: todoId, content: e.target.value, done: false })} />
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
            {createTodo.length ? createTodo.map((todo, index) => (
                <Todo value={todo} key={index} handleDelete={handleDelete} handleUpdate={handleUpdate} />
            )) : null}
        </div>
    );
}
