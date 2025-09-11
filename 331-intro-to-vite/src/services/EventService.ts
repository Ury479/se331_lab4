// src/services/EventService.ts
// Axios client and Event API wrappers

import axios, { AxiosInstance } from 'axios'

/** Event type should match your Spring Boot entity */
export interface Event {
    id?: number
    category?: string
    title: string
    description: string
    location: string
    date: string
    time?: string
    petAllowed?: boolean
    organizer?: string
}

/** Create a single axios client for the whole app */
const apiClient: AxiosInstance = axios.create({
    // IMPORTANT: read backend base URL from Vite env (.env.development)
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 15000
})

export default {
    /** GET /events?_limit=&_page=  */
    getEvents(params?: { _limit?: number; _page?: number }) {
        return apiClient.get<Event[]>('/events', { params })
    },

    /** GET /events/{id} */
    getEvent(id: number) {
        return apiClient.get<Event>('/events/' + id)
    },

    /** POST /events   <-- added as required */
    saveEvent(event: Event) {
        // send JSON body to backend
        return apiClient.post<Event>('/events', event)
    }
}
