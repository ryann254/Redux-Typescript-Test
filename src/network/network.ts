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

export const getTodos = async (): Promise<incomingTodos[]> => {
    const result = await fetch(`${url}todos`)
    return result.json()
}

export const postTodos = async (payload: Payload): Promise<incomingTodos> => {
    const result = await fetch(`${url}posts`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    return result.json()
}