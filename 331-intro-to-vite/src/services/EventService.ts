import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/Ury479/se331_lab3_20250702',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getEvents(perPage: number, page: number) {
        return apiClient.get(`/events?_limit=${perPage}&_page=${page}`)
    },
    getEvent(id: number) {
        return apiClient.get(`/events/${id}`)
    }
}
