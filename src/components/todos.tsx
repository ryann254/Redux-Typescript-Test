import React, { useState } from 'react';

export interface ITodosProps {
}

export interface TodoInt {
    id: number,
    content: string,
    done: boolean
}

interface UpdateInt {
    isUpdate: boolean,
    id: number
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
    const [todo, setTodo] = useState<TodoInt>({ id: 0, content: '', done: false })
    const [todoId, setTodoId] = useState(1);
    const [update, setUpdate] = useState<UpdateInt>({ isUpdate: false, id: 0 });

    const handleSubmit = (evt: React.FormEvent, value: TodoInt, update: UpdateInt) => {
        evt.preventDefault()
        if (update.isUpdate) {
            const updatedTodo = createTodo.find(todo => todo.id === update.id)

            if (updatedTodo) {
                updatedTodo.content = value.content
            }
            setUpdate({ isUpdate: false, id: 0 })
        } else {
            // Increment the todoId so that we don't have two similar ids.
            setTodoId(todoId + 1)
            if (todo?.content.length) {
                setCreateTodo([...createTodo, value])
            }
        }
        setTodo({ id: 0, content: '', done: false })
    }

    const handleDelete = (evt: React.MouseEvent, value: number) => {
        evt.preventDefault()
        const newTodos = createTodo.filter(todo => todo.id !== value)
        setCreateTodo(newTodos)
    }

    const handleUpdate = (evt: React.MouseEvent, value: TodoInt) => {
        evt.preventDefault()
        // Add the value to the input.
        setUpdate({ isUpdate: true, id: value.id })
        setTodo(value)
        // Then update it in the todos.
    }
    return (
        <div className='col-6 mt-5 mx-auto'>
            <form onSubmit={(e) => handleSubmit(e, todo, update)}>
                <input type="text" value={todo.content} onChange={(e) => setTodo({ id: todoId, content: e.target.value, done: false })} />
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
            {createTodo.length ? createTodo.map((todo, index) => (
                <Todo value={todo} key={index} handleDelete={handleDelete} handleUpdate={handleUpdate} />
            )) : null}
        </div>
    );
}
