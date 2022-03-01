export interface incomingTodos {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export interface Payload {
    userId: number,
    title: string,
    body: string
}

// Be mindful about the last slash.
const url = 'https://jsonplaceholder.typicode.com/'

export const getTodos = (): Promise<incomingTodos[]> => {
    return fetch(`${url}todos`)
        .then(res => res.json())
        .then(res => res as incomingTodos[])
}

export const postTodos = (payload: Payload): Promise<incomingTodos> => {
    return fetch(`${url}posts`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then((res) => res.json())
        .then(res => res as incomingTodos)
}