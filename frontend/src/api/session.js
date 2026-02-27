// const BASE_URL = "http://localhost:3000/session"
const BASE_URL = import.meta.env.VITE_API_URL
export async function getSessions(filters={}){
    const params = new URLSearchParams(filters)
    const response = await fetch(`${BASE_URL}/session?${params.toString()}`)
    return response.json()
}

export async function createSession(session){
    const response = await fetch(`${BASE_URL}/session`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(session)
    })

    if(!response.ok){
        throw new Error(`Failed to create session: ${response.statusText}`)
    }

    return response.json()
}