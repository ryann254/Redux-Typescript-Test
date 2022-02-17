import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addTodo, completeTodo, deleteTodo, updateTodo } from '../redux/todosReducer';

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

function Todo({ value, handleDelete, handleUpdate, handleComplete }: { value: TodoInt, handleDelete: Function, handleUpdate: Function, handleComplete: Function }) {

    return (
        <ul className='mt-3'>
            <li>
                <span className='me-2'>{value.content}</span>
                {value.done ? null : <button type='button' className='btn btn-outline-primary me-2' onClick={(e) => handleComplete(e, value)}>Done</button>}
                <button type='button' className='btn btn-outline-warning me-2' onClick={(e) => handleUpdate(e, value)}>Update</button>
                <button type='button' className='btn btn-danger rounded-circle' onClick={(e) => handleDelete(e, value.id)}>x</button>
            </li>
        </ul>
    )
}

export function Todos(props: ITodosProps) {
    // const [createTodo, setCreateTodo] = useState<TodoInt[]>([])
    const [todo, setTodo] = useState<TodoInt>({ id: 0, content: '', done: false })
    const [todoId, setTodoId] = useState(1);
    const [update, setUpdate] = useState<UpdateInt>({ isUpdate: false, id: 0 });
    const storedTodos = useAppSelector((state) => state.todos.value)
    const dispatch = useAppDispatch()

    const handleSubmit = (evt: React.FormEvent, value: TodoInt, update: UpdateInt) => {
        evt.preventDefault()
        if (update.isUpdate) {
            // Correct the todos id before submitting it.
            value.id = update.id
            dispatch(updateTodo(value))
            // Clean up.
            setUpdate({ isUpdate: false, id: 0 })
            setTodo({ id: 0, content: '', done: false })
        } else {
            dispatch(addTodo(value))
            setTodoId(todoId + 1)
            setTodo({ id: 0, content: '', done: false })
        }
    }

    const handleDelete = (evt: React.MouseEvent, value: number) => {
        evt.preventDefault()
        dispatch(deleteTodo(value))
    }

    const handleUpdate = (evt: React.MouseEvent, value: TodoInt) => {
        evt.preventDefault()
        // Add the value to the input.
        setUpdate({ isUpdate: true, id: value.id })
        setTodo(value)
        // Then update it in the todos.
    }

    const handleComplete = (evt: React.MouseEvent, value: TodoInt) => {
        evt.preventDefault()
        console.log('here');
        let completedTodo = {
            ...value,
            done: true
        }
        dispatch(completeTodo(completedTodo))
    }
    return (
        <div className='col-6 mt-5 mx-auto'>
            <form onSubmit={(e) => handleSubmit(e, todo, update)}>
                <input type="text" value={todo.content} onChange={(e) => setTodo({ id: todoId, content: e.target.value, done: false })} />
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
            {storedTodos.length ? storedTodos.map((todo, index) => (
                <Todo value={todo} key={index} handleDelete={handleDelete} handleUpdate={handleUpdate} handleComplete={handleComplete} />
            )) : null}
        </div>
    );
}
