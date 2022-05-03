export interface incomingResponses {
    response: Array<incomingTodo>
}

export interface incomingResponse {
    response: incomingTodo
}

export interface incomingTodo {
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

export interface UUIDResponse {
    errors: any[],
    items?: Record<string, any>[],
    page?: Record<string, any>
}

export interface monthlyListenersResponse {
    errors: any[],
    items?: Record<string, any>[],
    page?: Record<string, any>,
    related?: Record<string, any>
}

// Be mindful about the last slash.
const url = 'https://grocery-list-backend-001.herokuapp.com/'
const dashboardURL = 'https://sandbox.api.soundcharts.com/api/v2/artist/'

export const getArtistUUID = async (name: string): Promise<UUIDResponse> => {
    const result = await fetch(`${dashboardURL}search/${name}?offset=0&limit=20`, {
        method: 'GET',
        headers: {
            'x-app-id': 'soundcharts',
            'x-api-key': 'soundcharts',
        }
    })
    return result.json()
}

export const getOctoberMonthlyListeners = async (uuid: string): Promise<monthlyListenersResponse> => {
    const year = '2020'
    const month = '10'
    const result = await fetch(`${dashboardURL}${uuid}/streaming/spotify/listeners/${year}/${month}`, {
        method: 'GET',
        headers: {
            'x-app-id': 'soundcharts',
            'x-api-key': 'soundcharts',
        }
    })
    return result.json()
}

export const getTodos = async (): Promise<incomingResponses> => {
    const result = await fetch(`${url}items`)
    return result.json()
}

export const postTodos = async (payload: Payload): Promise<incomingResponse> => {
    const result = await fetch(`${url}items`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json'
        }
    })
    return result.json()
}

export const patchTodos = async (payload: UpdatePayload, id: string): Promise<incomingResponse> => {
    const result = await fetch(`${url}items/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json'
        }
    })
    return result.json()
}

export const deleteTodo = async (payload: string) => {
    const result = await fetch(`${url}items/${payload}`, {
        method: "DELETE"
    })
    return result.json()
}