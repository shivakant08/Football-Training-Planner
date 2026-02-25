const BASE_URL = "http://localhost:3000/session"
export async function getSessions(filters={}){
    const params = new URLSearchParams(filters)
    const response = await fetch(`${BASE_URL}?${params.toString()}`)
    return response.json()
}