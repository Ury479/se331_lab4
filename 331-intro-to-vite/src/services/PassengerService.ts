import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://api.instantwebtools.net/v1',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getPassengers(page: number = 0, size: number = 10) {
        return apiClient.get(`/passenger?page=${page}&size=${size}`)
    },
    getPassenger(id: string) {
        return apiClient.get(`/passenger/${id}`)
    },
    getAirline(id: number) {
        return apiClient.get(`/airlines/${id}`)
    }
}
