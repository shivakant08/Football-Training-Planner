const BASE_URL = "http://localhost:3000/session"
export async function getSessions(filters={}){
    const params = new URLSearchParams(filters)
    const response = await fetch(`${BASE_URL}?${params.toString()}`)
    return response.json()
}

export async function createSession(session){
    const response = await fetch(BASE_URL, {
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