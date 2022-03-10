export interface incomingTodos {
    _id: string,
    content: string,
    done: boolean
}

export interface Payload {
    content: string,
    done: boolean
}

export interface UpdatePayload {
    content?: string
    done?: boolean
}

// Be mindful about the last slash.
const url = 'http://localhost:6061/'

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

export const patchTodos = async (payload: UpdatePayload, id: string): Promise<incomingTodos> => {
    const result = await fetch(`${url}posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    return result.json()
}

export const deleteTodo = async (payload: string) => {
    const result = await fetch(`${url}posts/${payload}`, {
        method: "DELETE"
    })
    return result.json()
}