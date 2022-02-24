export interface incomingTodos {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export const getTodos = (): Promise<incomingTodos[]> => {
    return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json())
        .then(res => res as incomingTodos[])
}